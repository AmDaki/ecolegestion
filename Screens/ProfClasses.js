import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://192.168.100.53:5000';

const ClassesScreen = ({ navigation }) => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const identifiant = await AsyncStorage.getItem('professeurIdentifiant');
        if (identifiant) {
          const response = await fetch(`${API_URL}/professeur-classess/${identifiant}`);
          const data = await response.json();
          if (data.success) {
            setClasses(data.classes);
          } else {
            console.error('Erreur API:', data.message);
          }
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des classes :', error);
      }
    };

    fetchClasses();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mes Classes</Text>
      {classes.length === 0 ? (
        <Text style={styles.emptyMessage}>Aucune classe trouvée.</Text>
      ) : (
        <FlatList
          data={classes}
          keyExtractor={(item, index) => index.toString()} // Utilisez l'index si les classes sont des chaînes
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.classItem}
              onPress={() => navigation.navigate('Notes', { classeName: item })}
            >
              <Text style={styles.classText}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#F5F5F5' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  emptyMessage: { fontSize: 16, color: '#555', textAlign: 'center', marginTop: 20 },
  classItem: { padding: 16, backgroundColor: '#FFF', marginBottom: 8, borderRadius: 8 },
  classText: { fontSize: 16, color: '#333' },
});

export default ClassesScreen;
