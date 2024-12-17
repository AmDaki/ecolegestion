import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, FlatList } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://192.168.100.53:5000';

const AssignNotes = ({ navigation }) => {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [professeurId, setProfesseurId] = useState('');

  useEffect(() => {
    const fetchProfesseurId = async () => {
      const identifiant = await AsyncStorage.getItem('professeurIdentifiant');
      if (identifiant) {
        setProfesseurId(identifiant);
        fetchClasses(identifiant);
      } else {
        console.error('Identifiant du professeur non trouvé.');
      }
    };
    fetchProfesseurId();
  }, []);

  const fetchClasses = async (profId) => {
    try {
      const response = await fetch(`${API_URL}/professeur-classes/${profId}`);
      const data = await response.json();
      setClasses(data.classes || []);
    } catch (error) {
      console.error('Erreur lors de la récupération des classes :', error);
    }
  };

  const handleFileSelection = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({});
      if (res.type === 'success') {
        setSelectedFile(res);
      }
    } catch (error) {
      console.error('Erreur lors de la sélection du fichier :', error);
    }
  };

  const handleAssignNotes = async () => {
    if (!selectedClass || !selectedFile) {
      Alert.alert('Erreur', 'Veuillez sélectionner une classe et un fichier.');
      return;
    }
    
    // Form data pour l'upload du fichier
    const formData = new FormData();
    formData.append('file', {
      uri: selectedFile.uri,
      name: selectedFile.name,
      type: selectedFile.mimeType,
    });

    try {
      const response = await fetch(`${API_URL}/assign-notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        Alert.alert('Succès', 'Les notes ont été attribuées avec succès.');
      } else {
        Alert.alert('Erreur', 'Une erreur est survenue lors de l\'attribution des notes.');
      }
    } catch (error) {
      console.error('Erreur lors de l\'attribution des notes :', error);
      Alert.alert('Erreur', 'Une erreur est survenue.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Attribuer des notes</Text>

      {/* Sélection de la classe */}
      <Text style={styles.label}>Sélectionnez une classe</Text>
      <FlatList
        data={classes}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.classItem}
            onPress={() => setSelectedClass(item)}
          >
            <Text style={styles.className}>{item}</Text>
          </TouchableOpacity>
        )}
      />

      {selectedClass && <Text>Classe sélectionnée : {selectedClass}</Text>}

      {/* Sélectionner un fichier Excel */}
      <TouchableOpacity style={styles.button} onPress={handleFileSelection}>
        <Text style={styles.buttonText}>Choisir un fichier Excel</Text>
      </TouchableOpacity>

      {selectedFile && <Text>Fichier sélectionné : {selectedFile.name}</Text>}

      {/* Bouton pour attribuer les notes */}
      <TouchableOpacity style={styles.button} onPress={handleAssignNotes}>
        <Text style={styles.buttonText}>Attribuer les notes</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  title: {
    fontSize: 20,
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  classItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  className: {
    fontSize: 16,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 4,
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default AssignNotes;
