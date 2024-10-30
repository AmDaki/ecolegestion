import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import CheckBox from '@react-native-community/checkbox';
import axios from 'axios';

const AssignAbsencesScreen = () => {
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [absentStudents, setAbsentStudents] = useState([]);

  useEffect(() => {
    // Fetch classes
    axios.get('http://your-server-url/get-classes')
      .then(response => {
        setClasses(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  // Fetch students of the selected class
  const fetchStudents = (classId) => {
    axios.get(`http://your-server-url/get-students/${classId}`)
      .then(response => {
        setStudents(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleClassSelection = (classId) => {
    setSelectedClass(classId);
    fetchStudents(classId);
  };

  const handleStudentSelection = (studentId) => {
    if (absentStudents.includes(studentId)) {
      setAbsentStudents(absentStudents.filter(id => id !== studentId));
    } else {
      setAbsentStudents([...absentStudents, studentId]);
    }
  };

  const handleSubmitAbsences = () => {
    if (!selectedClass) {
      Alert.alert('Erreur', 'Veuillez sélectionner une classe.');
      return;
    }

    axios.post('http://your-server-url/submit-absences', {
      classId: selectedClass,
      absences: absentStudents
    })
    .then(() => {
      Alert.alert('Succès', 'Les absences ont été enregistrées avec succès.');
      setAbsentStudents([]); // Reset after submission
    })
    .catch(error => {
      console.error(error);
      Alert.alert('Erreur', 'Une erreur est survenue lors de la soumission des absences.');
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gérer les Absences</Text>

      <Text style={styles.label}>Sélectionner une classe :</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedClass}
          onValueChange={(itemValue) => handleClassSelection(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Choisir une classe" value={null} />
          {classes.map((classItem) => (
            <Picker.Item key={classItem.id} label={classItem.name} value={classItem.id} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Sélectionner les absents :</Text>
      <FlatList
        data={students}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.studentItem}>
            <Text>{item.name}</Text>
            <CheckBox
              value={absentStudents.includes(item.id)}
              onValueChange={() => handleStudentSelection(item.id)}
            />
          </View>
        )}
        style={styles.studentList}
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmitAbsences}>
        <Text style={styles.submitButtonText}>Soumettre les absences</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#420475',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 18,
    color: '#333',
    marginBottom: 8,
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 3,
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  studentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  studentList: {
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#420475',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default AssignAbsencesScreen;
