import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { API_URL } from '@env';

const ManageAbsencesScreen = () => {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [loadingClasses, setLoadingClasses] = useState(false);
  const [loadingStudents, setLoadingStudents] = useState(false);

  useEffect(() => {
    // Charger les classes du professeur
    setLoadingClasses(true);
    axios
      .get(`${API_URL}/get-classes-for-professor`)
      .then((response) => {
        setLoadingClasses(false);
        setClasses(response.data);
      })
      .catch((error) => {
        setLoadingClasses(false);
        Alert.alert('Erreur', 'Impossible de charger les classes.');
        console.error('Erreur:', error);
      });
  }, []);

  const loadStudents = (classId) => {
    setLoadingStudents(true);
    axios
      .get(`${API_URL}/get-students-by-class?classId=${classId}`)
      .then((response) => {
        setLoadingStudents(false);
        setStudents(response.data);
        // Initialiser les absences
        const initialAttendance = {};
        response.data.forEach((student) => {
          initialAttendance[student.id] = true; // Par défaut, tous les élèves sont présents
        });
        setAttendance(initialAttendance);
      })
      .catch((error) => {
        setLoadingStudents(false);
        Alert.alert('Erreur', 'Impossible de charger les élèves.');
        console.error('Erreur:', error);
      });
  };

  const toggleAttendance = (studentId) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: !prev[studentId],
    }));
  };

  const saveAttendance = () => {
    if (!selectedClass) {
      Alert.alert('Erreur', 'Veuillez sélectionner une classe.');
      return;
    }

    const absenceData = {
      classId: selectedClass,
      attendance,
    };

    axios
      .post(`${API_URL}/save-attendance`, absenceData)
      .then(() => {
        Alert.alert('Succès', 'Les absences ont été enregistrées.');
      })
      .catch((error) => {
        Alert.alert('Erreur', 'Impossible d\'enregistrer les absences.');
        console.error('Erreur:', error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestion des Absences</Text>

      {/* Sélection de la classe */}
      <Text style={styles.label}>Sélectionner une classe :</Text>
      {loadingClasses ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Picker
          selectedValue={selectedClass}
          onValueChange={(value) => {
            setSelectedClass(value);
            loadStudents(value);
          }}
          style={styles.picker}
        >
          <Picker.Item label="Sélectionner une classe" value="" />
          {classes.map((cls) => (
            <Picker.Item key={cls.id} label={cls.nomClasse} value={cls.id} />
          ))}
        </Picker>
      )}

      {/* Liste des élèves */}
      {loadingStudents ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={students}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.studentItem}>
              <Text style={styles.studentName}>
                {item.prenom} {item.nom}
              </Text>
              <TouchableOpacity
                style={[
                  styles.attendanceButton,
                  attendance[item.id] ? styles.present : styles.absent,
                ]}
                onPress={() => toggleAttendance(item.id)}
              >
                <Text style={styles.attendanceText}>
                  {attendance[item.id] ? 'Présent' : 'Absent'}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      {/* Bouton d'enregistrement */}
      {selectedClass && students.length > 0 && (
        <TouchableOpacity style={styles.saveButton} onPress={saveAttendance}>
          <Text style={styles.saveButtonText}>Enregistrer</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  picker: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDD',
    marginBottom: 20,
  },
  studentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#FFF',
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  studentName: {
    fontSize: 16,
  },
  attendanceButton: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
  },
  present: {
    backgroundColor: '#4CAF50',
  },
  absent: {
    backgroundColor: '#F44336',
  },
  attendanceText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default ManageAbsencesScreen;
