import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const ManageAbsencesScreen = () => {
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [absentStudents, setAbsentStudents] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const classesResponse = await axios.get('http://localhost:5000/get-all-classes');
        setClasses(classesResponse.data.classes);
      } catch (error) {
        console.error('Error fetching classes:', error);
      }
    };

    fetchClasses();
  }, []);

  const handleClassSelect = async (classId) => {
    setSelectedClass(classId);
    setAbsentStudents([]);

    if (classId) {
      try {
        const studentsResponse = await axios.get(`http://localhost:5000/get-students/${classId}`);
        setStudents(studentsResponse.data.students);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    }
  };

  const toggleAbsent = (studentId) => {
    setAbsentStudents((prevAbsent) =>
      prevAbsent.includes(studentId)
        ? prevAbsent.filter((id) => id !== studentId)
        : [...prevAbsent, studentId]
    );
  };

  const handleSaveAbsences = async () => {
    if (!selectedClass) {
      Alert.alert('Erreur', 'Veuillez sélectionner une classe.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/save-absences', {
        classId: selectedClass,
        absentStudents,
      });

      if (response.data.status === 'ok') {
        Alert.alert('Succès', 'Absences enregistrées avec succès !');
      } else {
        Alert.alert('Erreur', 'Une erreur est survenue lors de l\'enregistrement.');
      }
    } catch (error) {
      console.error('Error saving absences:', error);
      Alert.alert('Erreur', 'Impossible d\'enregistrer les absences.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Gestion des Absences</Text>
        <FontAwesome name="user-times" size={50} color="#fff" />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Sélectionnez une Classe :</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedClass}
            onValueChange={(itemValue) => handleClassSelect(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="-- Choisissez une classe --" value="" />
            {classes.map((cls) => (
              <Picker.Item key={cls.id} label={cls.name} value={cls.id} />
            ))}
          </Picker>
        </View>
      </View>

      {students.length > 0 && (
        <View style={styles.studentsList}>
          <Text style={styles.label}>Liste des élèves :</Text>
          {students.map((student) => (
            <TouchableOpacity
              key={student.id}
              style={[
                styles.studentItem,
                absentStudents.includes(student.id) && styles.absent,
              ]}
              onPress={() => toggleAbsent(student.id)}
            >
              <Text style={styles.studentName}>{student.name}</Text>
              <FontAwesome
                name={absentStudents.includes(student.id) ? 'check-square' : 'square-o'}
                size={24}
                color={absentStudents.includes(student.id) ? '#d9534f' : '#333'}
              />
            </TouchableOpacity>
          ))}
        </View>
      )}

      <TouchableOpacity style={styles.saveButton} onPress={handleSaveAbsences}>
        <Text style={styles.saveButtonText}>Enregistrer les Absences</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f0f5',
  },
  header: {
    backgroundColor: '#6200ee',
    padding: 20,
    width: '100%',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  formGroup: {
    width: '100%',
    marginVertical: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: '500',
    color: '#6200ee',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  studentsList: {
    width: '100%',
    marginTop: 20,
  },
  studentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  studentName: {
    fontSize: 18,
    color: '#333',
  },
  absent: {
    backgroundColor: '#f8d7da',
  },
  saveButton: {
    backgroundColor: '#6200ee',
    borderRadius: 8,
    padding: 16,
    marginTop: 20,
    width: '80%',
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default ManageAbsencesScreen;
