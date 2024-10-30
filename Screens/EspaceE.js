import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const TeacherAssignmentScreen = () => {
  const [teachers, setTeachers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [selectedClass, setSelectedClass] = useState('');

  useEffect(() => {
    // Remplacez par des appels API pour obtenir les vraies données
    const fetchTeachersAndClasses = async () => {
      try {
        const teachersResponse = await axios.get('http://localhost:5000/get-all-teachers');
        const classesResponse = await axios.get('http://localhost:5000/get-all-classes');
        setTeachers(teachersResponse.data.teachers);
        setClasses(classesResponse.data.classes);
      } catch (error) {
        console.error('Error fetching teachers and classes:', error);
      }
    };

    fetchTeachersAndClasses();
  }, []);

  const handleAssignClass = async () => {
    if (!selectedTeacher || !selectedClass) {
      Alert.alert('Erreur', 'Veuillez sélectionner un enseignant et une classe.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/assign-class-to-teacher', {
        teacherId: selectedTeacher,
        classId: selectedClass,
      });

      if (response.data.status === 'ok') {
        Alert.alert('Succès', 'Classe attribuée avec succès !');
      } else {
        Alert.alert('Erreur', 'Une erreur est survenue lors de l\'attribution.');
      }
    } catch (error) {
      console.error('Error assigning class:', error);
      Alert.alert('Erreur', 'Impossible d\'attribuer la classe.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Espace Enseignant</Text>
        <FontAwesome name="chalkboard-teacher" size={50} color="#fff" />
      </View>

      <View style={styles.statsCard}>
        <Text style={styles.statsText}>Enseignants inscrits : {teachers.length}</Text>
        <Text style={styles.statsText}>Classes disponibles : {classes.length}</Text>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Sélectionnez un Enseignant :</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedTeacher}
            onValueChange={(itemValue) => setSelectedTeacher(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="-- Choisissez un enseignant --" value="" />
            {teachers.map(teacher => (
              <Picker.Item key={teacher.id} label={teacher.name} value={teacher.id} />
            ))}
          </Picker>
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Sélectionnez une Classe :</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedClass}
            onValueChange={(itemValue) => setSelectedClass(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="-- Choisissez une classe --" value="" />
            {classes.map(cls => (
              <Picker.Item key={cls.id} label={cls.name} value={cls.id} />
            ))}
          </Picker>
        </View>
      </View>

      <TouchableOpacity style={styles.assignButton} onPress={handleAssignClass}>
        <Text style={styles.assignButtonText}>Attribuer la Classe</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

// Styles
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 4,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  statsCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '100%',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 4,
  },
  statsText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
    marginVertical: 5,
  },
  formGroup: {
    width: '100%',
    marginVertical: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 5,
    color: '#6200ee',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 4,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  assignButton: {
    backgroundColor: '#6200ee',
    borderRadius: 8,
    padding: 16,
    marginTop: 20,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 4,
  },
  assignButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default TeacherAssignmentScreen;
