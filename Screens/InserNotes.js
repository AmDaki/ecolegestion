import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import FileViewer from 'react-native-file-viewer';

const NotesScreen = ({ route, navigation }) => {
  const { file } = route.params;

  const handleOpenFile = async () => {
    try {
      // Ouvrir le fichier avec les applications compatibles
      await FileViewer.open(file.localUri);
    } catch (error) {
      console.error('Erreur lors de l\'ouverture du fichier :', error);
      Alert.alert('Erreur', 'Impossible d\'ouvrir le fichier.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fichier importé :</Text>
      <Text style={styles.fileInfo}>Nom : {file.name}</Text>
      <Text style={styles.fileInfo}>Type : {file.type || 'Inconnu'}</Text>

      <TouchableOpacity style={styles.button} onPress={handleOpenFile}>
        <Text style={styles.buttonText}>Ouvrir le fichier</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Retour</Text>
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
  fileInfo: {
    marginTop: 8,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  backButton: {
    backgroundColor: '#95a5a6',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default NotesScreen;
