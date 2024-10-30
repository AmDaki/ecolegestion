import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import CheckBox from '@react-native-community/checkbox';
import axios from 'axios';

const AssignStudentsToClassScreen = () => {
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [assignedStudents, setAssignedStudents] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch classes and students from API (or database)
  useEffect(() => {
    // Fetch classes
    axios.get('http://your-server-url/get-classes')
      .then(response => {
        setClasses(response.data);
      })
      .catch(error => {
        console.error(error);
      });

    // Fetch students
    axios.get('http://your-server-url/get-students')
      .then(response => {
        setStudents(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  // Fetch students assigned to the selected class
  const fetchAssignedStudents = (classId) => {
    axios.get(`http://your-server-url/get-assigned-students/${classId}`)
      .then(response => {
        setAssignedStudents(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  // Handle class selection
  const handleClassSelection = (classId) => {
    setSelectedClass(classId);
    fetchAssignedStudents(classId);
  };

  // Handle selection of students
  const handleStudentSelection = (studentId) => {
    if (selectedStudents.includes(studentId)) {
      setSelectedStudents(selectedStudents.filter(id => id !== studentId));
    } else {
      setSelectedStudents([...selectedStudents, studentId]);
    }
  };

  // Handle class assignment
  const handleAssignStudents = () => {
    if (!selectedClass) {
      Alert.alert('Erreur', 'Veuillez sélectionner une classe.');
      return;
    }

    axios.post('http://your-server-url/assign-students', {
      classId: selectedClass,
      students: selectedStudents
    })
    .then(() => {
      Alert.alert('Succès', 'Les élèves ont été attribués à la classe avec succès.');
      setSelectedStudents([]); // Reset student selection after assignment
      fetchAssignedStudents(selectedClass); // Update assigned students list
    })
    .catch(error => {
      console.error(error);
      Alert.alert('Erreur', 'Une erreur est survenue lors de l\'attribution.');
    });
  };

  // Handle student search
  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle unassign student
  const handleUnassignStudent = (studentId) => {
    axios.post('http://your-server-url/unassign-student', { classId: selectedClass, studentId })
    .then(() => {
      Alert.alert('Succès', 'L\'élève a été retiré de la classe.');
      fetchAssignedStudents(selectedClass);
    })
    .catch(error => {
      console.error(error);
      Alert.alert('Erreur', 'Une erreur est survenue lors du retrait.');
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Attribuer des élèves à une classe</Text>
      
      {/* Picker for class selection */}
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

      {/* Display assigned students */}
      <Text style={styles.label}>Élèves déjà attribués :</Text>
      <FlatList
        data={assignedStudents}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.studentItem}>
            <Text>{item.name}</Text>
            <TouchableOpacity onPress={() => handleUnassignStudent(item.id)}>
              <Text style={styles.unassignButton}>Retirer</Text>
            </TouchableOpacity>
          </View>
        )}
        style={styles.assignedList}
      />

      {/* Search bar for students */}
      <Text style={styles.label}>Rechercher des élèves :</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Nom de l'élève"
        onChangeText={setSearchTerm}
      />

      {/* List of students */}
      <Text style={styles.label}>Sélectionner des élèves :</Text>
      <FlatList
        data={filteredStudents}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.studentItem}>
            <Text>{item.name}</Text>
            <CheckBox
              value={selectedStudents.includes(item.id)}
              onValueChange={() => handleStudentSelection(item.id)}
            />
          </View>
        )}
        style={styles.studentList}
      />

      {/* Button to assign students */}
      <TouchableOpacity style={styles.assignButton} onPress={handleAssignStudents}>
        <Text style={styles.assignButtonText}>Attribuer à la classe</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles for the screen
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
  assignedList: {
    marginBottom: 20,
  },
  searchInput: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 8,
  },
  unassignButton: {
    color: '#d9534f',
    fontWeight: 'bold',
  },
  assignButton: {
    backgroundColor: '#420475',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  assignButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default AssignStudentsToClassScreen;
