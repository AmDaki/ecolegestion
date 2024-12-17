import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { black } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

const API_URL = 'http://192.168.100.53:5000';

const SelectClassScreen = ({ navigation }) => {
  const [classes, setClasses] = useState([]);
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sélectionnez une classe</Text>
      <FlatList
        data={classes}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.classItem}
            onPress={() => navigation.navigate('UploadNotes', { nomClasse: item })}
          >
            <Text style={styles.className}>{item}</Text>
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
    color: 'black',
  },
  classItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    color: 'black',
  },
  className: {
    fontSize: 16,
    color: 'black',
  },
});

export default SelectClassScreen;
