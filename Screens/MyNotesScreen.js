import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, Linking } from 'react-native';

const API_URL = 'http://192.168.100.53:5000';

const MyNotesScreen = ({ route }) => {
  console.log('Route params:', route.params); // Debug
  const { nomClasse } = route.params || {}; 
  console.log('Nom de la classe reçu :', nomClasse); // Debu
  const [files, setFiles] = useState([]);
  


  useEffect(() => {
    const fetchFiles = async () => {
      if (!nomClasse) {
        Alert.alert('Erreur', 'Aucun nom de classe fourni.');
        return;
      }
    
      try {
        const response = await fetch(`${API_URL}/mes-notes/${nomClasse}`);
        const result = await response.json();
    
        console.log('Résultat de l\'API:', result);  // Ajoutez cette ligne pour voir la réponse complète
    
        if (result.success) {
          setFiles(result.files);
        } else {
          Alert.alert('Erreur', result.message || 'Impossible de récupérer les fichiers.');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des fichiers :', error);
        Alert.alert('Erreur', 'Une erreur est survenue lors de la récupération des fichiers.');
      }
    };
    

    fetchFiles();
  }, [nomClasse]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mes Notes pour la classe : {nomClasse}</Text>
      {files.length === 0 ? (
        <Text style={styles.noFiles}>Aucun fichier disponible pour cette classe.</Text>
      ) : (
        <FlatList
          data={files}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.fileItem}
              onPress={() => Linking.openURL(`${API_URL}/${item.chemin.replace(/\\/g, '/')}`)}
            >
              <Text style={styles.fileName}>{item.nomFichier}</Text>
            </TouchableOpacity>
          )}
        />
      )}
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
    fontWeight: 'bold',
    color: '#333',
  },
  fileItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  fileName: {
    fontSize: 16,
    color: '#007BFF',
  },
  noFiles: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default MyNotesScreen;
