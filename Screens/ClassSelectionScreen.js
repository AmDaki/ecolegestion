import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import DocumentPicker from 'react-native-document-picker';

const API_URL = 'http://192.168.100.53:5000';

const ClassSelectionScreen = ({ navigation }) => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch(`${API_URL}/professor-classes`);
        const result = await response.json();

        if (result.success) {
          setClasses(result.classes);
        } else {
          Alert.alert('Erreur', 'Impossible de récupérer les classes.');
        }
      } catch (error) {
        console.error('Erreur lors du chargement des classes :', error);
      }
    };

    fetchClasses();
  }, []);

  const handleSelectClass = (classe) => {
    navigation.navigate('FileUploadScreen', { classe });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Classes où j'enseigne</Text>
      <FlatList
        data={classes}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.classItem} onPress={() => handleSelectClass(item)}>
            <Text style={styles.className}>{item.name}</Text>
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
  classItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  className: {
    fontSize: 16,
  },
});

export default ClassSelectionScreen;
