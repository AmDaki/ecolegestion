import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
const API_URL = 'http://192.168.100.53:5000';

const NotesScreen = ({ route }) => {
  const { classe } = route.params;

  const handleInsertNotes = async () => {
    try {
      const file = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.allFiles],
      });
      console.log('Fichier sélectionné :', file);

      // Envoyer le fichier au backend
      const formData = new FormData();
      formData.append('file', {
        uri: file.uri,
        name: file.name,
        type: file.type,
      });
      formData.append('classe', classe);

      const response = await fetch(`${API_URL}/upload-notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      const result = await response.json();
      if (result.success) {
        Alert.alert('Succès', 'Les notes ont été ajoutées avec succès.');
      } else {
        Alert.alert('Erreur', 'Erreur lors de l\'insertion des notes.');
      }
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        console.log('Sélection du fichier annulée');
      } else {
        console.error('Erreur lors de la sélection du fichier :', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Classe : {classe}</Text>
      <TouchableOpacity style={styles.button} onPress={handleInsertNotes}>
        <Text style={styles.buttonText}>Insérer les Notes</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 20,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#3498DB',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default NotesScreen;
