import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import axios from 'axios';
import { API_URL } from '@env';
import { Picker } from '@react-native-picker/picker';

const AssignClassScreen = () => {
  const [selectedLevel, setSelectedLevel] = useState('');
  const [availableClasses, setAvailableClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [availableStudents, setAvailableStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);

  const levels = ['6ème', '5ème', '4ème', '3ème', '2nde', '1ère', 'Terminale'];

  useEffect(() => {
    if (selectedLevel) {
      axios.get(`${API_URL}/get-all-classes?niveau=${selectedLevel}`)
        .then(response => setAvailableClasses(response.data || []))
        .catch(error => console.error('Erreur chargement des classes:', error));
    }
  }, [selectedLevel]);

  useEffect(() => {
    if (selectedLevel) {
      axios.get(`${API_URL}/get-eleves-by-niveau?NiveauClasse=${selectedLevel}`)
        .then(response => setAvailableStudents(response.data.eleves || []))
        .catch(error => console.error('Erreur chargement des élèves:', error));
    }
  }, [selectedLevel]);

  const handleAssignClass = () => {
    if (!selectedLevel || !selectedClass || selectedStudents.length === 0) {
      Alert.alert('Erreur', 'Veuillez sélectionner un niveau, une classe, et au moins un élève.');
      return;
    }

    const assignmentData = {
      level: selectedLevel,
      classId: selectedClass,
      studentIds: selectedStudents,
    };

    axios.post(`${API_URL}/assign-class-to-eleves`, assignmentData)
      .then(() => Alert.alert('Succès', 'Classe attribuée avec succès!'))
      .catch(error => Alert.alert('Erreur', 'Impossible d\'attribuer la classe.'));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Attribuer Classe aux Élèves</Text>

      <Text style={styles.label}>Niveau :</Text>
      <Picker
        selectedValue={selectedLevel}
        onValueChange={setSelectedLevel}
        style={styles.picker}>
        <Picker.Item label="Sélectionner le niveau" value="" />
        {levels.map(level => (
          <Picker.Item key={level} label={level} value={level} />
        ))}
      </Picker>

      {selectedLevel && (
        <>
          <Text style={styles.label}>Classe :</Text>
          <Picker
            selectedValue={selectedClass}
            onValueChange={setSelectedClass}
            style={styles.picker}>

            <Picker.Item label="Sélectionner une classe" value="" />
            {selectedClass.length > 0 ? (
              selectedClass.map(cls => (
                <Picker.Item key={cls.nomClasse} label={cls.nomClasse} value={cls.nomClasse} />
              ))
            ) : (
              <Picker.Item label="Aucune classe disponible" value="" />
            )}
          </Picker>
        </>
      )}

      {selectedLevel && (
        <>
          <Text style={styles.label}>Élèves :</Text>
          <View style={styles.studentsList}>
            {availableStudents.length > 0 ? (
              availableStudents.map((student) => (
                <TouchableOpacity
                  key={student._id}
                  style={[
                    styles.studentItem,
                    selectedStudents.includes(student._id) && styles.selectedStudent
                  ]}
                  onPress={() => {
                    if (selectedStudents.includes(student._id)) {
                      setSelectedStudents(selectedStudents.filter(id => id !== student._id));
                    } else {
                      setSelectedStudents([...selectedStudents, student._id]);
                    }
                  }}>
                  <Text style={styles.studentText}>{`${student.nom} ${student.prenom}`}</Text>
                </TouchableOpacity>
              ))
            ) : (
              <Text style={styles.noStudentsText}>Aucun élève trouvé.</Text>
            )}
          </View>
        </>
      )}

      <TouchableOpacity style={styles.assignButton} onPress={handleAssignClass}>
        <Text style={styles.buttonText}>Attribuer la Classe</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#FAFAFA',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  picker: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderColor: '#DDD',
    borderWidth: 1,
    paddingHorizontal: 10,
    color: '#555',
    marginBottom: 20,
  },
  studentsList: {
    marginBottom: 20,
  },
  studentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFEFEF',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  selectedStudent: {
    backgroundColor: '#C3E0F7',
  },
  studentText: {
    fontSize: 16,
    color: '#333',
  },
  noStudentsText: {
    fontSize: 16,
    color: '#AAA',
    textAlign: 'center',
    marginTop: 10,
  },
  assignButton: {
    backgroundColor: '#1E90FF',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default AssignClassScreen;
