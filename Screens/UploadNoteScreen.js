import React, { useState } from 'react';
import { View, Text, Button, Alert, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import DocumentPicker from 'react-native-document-picker';

const API_URL = 'http://192.168.100.53:5000';

const UploadNotesScreen = ({ route, navigation }) => {
  const { nomClasse } = route.params; // Classe sélectionnée
  const [file, setFile] = useState(null);

  const handlePickFile = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.xlsx, DocumentPicker.types.xls],
      });
      setFile(result);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled the picker');
      } else {
        Alert.alert('Erreur', 'Impossible de choisir un fichier.');
      }
    }
  };

  const handleUploadFile = async () => {
    if (!file) {
      Alert.alert('Erreur', 'Veuillez sélectionner un fichier.');
      return;
    }
  
    const formData = new FormData();
    formData.append('file', {
      uri: file[0].uri, // Accès correct au premier fichier sélectionné
      type: file[0].type || 'application/octet-stream', // Type MIME par défaut si manquant
      name: file[0].name,
    });
    formData.append('nomClasse', nomClasse);
  
    try {
      const response = await fetch(`${API_URL}/upload-notes`, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data', // Laissez React Native gérer le boundary
        },
      });
  
      const result = await response.json();
  
      if (result.success) {
        Alert.alert('Succès', 'Fichier téléchargé avec succès.');
        navigation.goBack();
      } else {
        Alert.alert('Erreur', result.message || 'Impossible de télécharger le fichier.');
      }
    } catch (error) {
      console.error('Erreur lors du téléchargement :', error);
      Alert.alert('Erreur', 'Une erreur est survenue lors de l\'upload.');
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Télécharger les notes pour la classe : {nomClasse}</Text>
      <Button title="Choisir un fichier" onPress={handlePickFile} />
      {file && <Text style={styles.fileName}>{file.name}</Text>}
      <TouchableOpacity style={styles.uploadButton} onPress={handleUploadFile}>
        <Text style={styles.uploadText}>Télécharger le fichier</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 18,
    marginBottom: 16,
    color: 'black',
  },
  fileName: {
    fontSize: 16,
    marginVertical: 8,
  },
  uploadButton: {
    marginTop: 20,
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 5,
  },
  uploadText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#fff',
  },
});

export default UploadNotesScreen;
