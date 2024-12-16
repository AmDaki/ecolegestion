import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';

const API_URL = 'http://192.168.100.53:5000';

const MyNotesScreen = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch(`${API_URL}/get-assigned-files`);
        const result = await response.json();

        if (result.success) {
          setFiles(result.files);
        } else {
          Alert.alert('Erreur', 'Impossible de récupérer les fichiers.');
        }
      } catch (error) {
        console.error('Erreur lors du chargement des fichiers :', error);
      }
    };

    fetchFiles();
  }, []);

  const handleOpenFile = async (file) => {
    try {
      const response = await fetch(`${API_URL}/download-file/${file._id}`);
      const result = await response.json();

      if (result.success) {
        const fileUri = `${RNFS.DocumentDirectoryPath}/${file.name}`;
        await RNFS.writeFile(fileUri, result.content, 'base64');
        await FileViewer.open(fileUri);
      } else {
        Alert.alert('Erreur', 'Impossible de télécharger le fichier.');
      }
    } catch (error) {
      console.error('Erreur lors de l\'ouverture du fichier :', error);
      Alert.alert('Erreur', 'Une erreur est survenue.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mes Notes</Text>
      <FlatList
        data={files}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.fileItem} onPress={() => handleOpenFile(item)}>
            <Text style={styles.fileName}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
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
  fileItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  fileName: {
    fontSize: 16,
  },
});

export default MyNotesScreen;
