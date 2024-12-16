import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';

const API_URL = 'http://192.168.100.53:5000';

const FileUploadScreen = ({ route, navigation }) => {
  const { classe } = route.params;
  const [file, setFile] = useState(null);

  const handleFileSelection = async () => {
    try {
      const result = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.allFiles],
      });
      setFile(result);
      console.log('Fichier sélectionné:', result);
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        console.log('Sélection du fichier annulée');
      } else {
        console.error('Erreur lors de la sélection du fichier :', error);
      }
    }
  };

  const handleFileUpload = async () => {
    if (!file) {
      Alert.alert('Erreur', 'Aucun fichier sélectionné.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', {
        uri: file.uri,
        name: file.name,
        type: file.type,
      });
      formData.append('classe', classe._id);

      const response = await fetch(`${API_URL}/upload-notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      const result = await response.json();
      if (result.success) {
        Alert.alert('Succès', 'Les notes ont été attribuées.');
        navigation.navigate('AssignNotesScreen', { classe });
      } else {
        Alert.alert('Erreur', 'Erreur lors de l\'upload des notes.');
      }
    } catch (error) {
      console.error('Erreur lors du téléchargement du fichier :', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Classe : {classe.name}</Text>
      <TouchableOpacity style={styles.button} onPress={handleFileSelection}>
        <Text style={styles.buttonText}>Sélectionner un fichier</Text>
      </TouchableOpacity>
      {file && (
        <Text style={styles.fileName}>{file.name}</Text>
      )}
      <TouchableOpacity style={styles.button} onPress={handleFileUpload}>
        <Text style={styles.buttonText}>Attribuer les Notes</Text>
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
    marginTop: 16,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  fileName: {
    fontSize: 16,
    marginTop: 16,
  },
});

export default FileUploadScreen;
