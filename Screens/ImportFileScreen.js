import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';

const API_URL = 'http://192.168.100.53:5000';

const ImportFileScreen = ({ navigation }) => {
  const handleImportFile = async () => {
    try {
      // Sélectionner un fichier Excel
      const file = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.xlsx],
      });

      // Lire le contenu du fichier en base64
      const base64Data = await RNFS.readFile(file.uri, 'base64');

      // Envoyer le fichier au backend (MongoDB)
      const response = await fetch(`${API_URL}/upload-file`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: file.name,
          type: file.type,
          content: base64Data,
        }),
      });

      const result = await response.json();

      if (result.success) {
        Alert.alert('Succès', 'Fichier importé et enregistré avec succès.');
        navigation.navigate('NotesListScreen');
      } else {
        Alert.alert('Erreur', 'Impossible de sauvegarder le fichier.');
      }
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        Alert.alert('Info', 'Sélection annulée.');
      } else {
        console.error('Erreur lors de l\'importation du fichier :', error);
        Alert.alert('Erreur', 'Une erreur est survenue.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Importer un fichier Excel</Text>
      <TouchableOpacity style={styles.button} onPress={handleImportFile}>
        <Text style={styles.buttonText}>Choisir un fichier</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ImportFileScreen;
