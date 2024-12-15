import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

const API_URL = 'http://192.168.100.53:5000';

const ManageAbsenceScreen = () => {
  const [professeurId, setProfesseurId] = useState('');
  const [classes, setClasses] = useState([]);
  const [selectedClasse, setSelectedClasse] = useState('');
  const [eleves, setEleves] = useState([]);
  const [absences, setAbsences] = useState({});

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

  const fetchEleves = async (classe) => {
    try {
      const response = await fetch(`${API_URL}/classe/${classe}`);
      const data = await response.json();

      if (data.success) {
        setEleves(data.eleves || []);
      } else {
        Alert.alert('Erreur', data.message || 'Aucun élève trouvé.');
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des élèves :', error);
      Alert.alert('Erreur', 'Impossible de récupérer les élèves.');
    }
  };

  const handleClasseChange = (classe) => {
    setSelectedClasse(classe);
    setEleves([]);
    if (classe) fetchEleves(classe);
  };

  const handleMarkAbsence = (eleveId) => {
    setAbsences((prev) => ({
      ...prev,
      [eleveId]: !prev[eleveId],
    }));
  };

  const handleSaveAbsences = async () => {
    const absents = eleves
      .filter((eleve) => absences[eleve.identifiant])
      .map((eleve) => ({ nom: eleve.nom, prenom: eleve.prenom }));

    try {
      const response = await fetch(`${API_URL}/api/absences`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          professeurId,
          classe: selectedClasse,
          absents,
        }),
      });
      const result = await response.json();
      if (result.success) {
        Alert.alert('Succès', 'Absences enregistrées avec succès.');
      } else {
        Alert.alert('Erreur', result.message || 'Enregistrement échoué.');
      }
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement :', error);
      Alert.alert('Erreur', 'Une erreur est survenue lors de l\'enregistrement.');
    }
  };

  const renderEleve = ({ item }) => (
    <TouchableOpacity
      style={[styles.eleveContainer, absences[item.identifiant] && styles.eleveAbsent]}
      onPress={() => handleMarkAbsence(item.identifiant)}
    >
      <Text style={[styles.eleveText, absences[item.identifiant] && styles.eleveAbsentText]}>
        {item.nom} {item.prenom}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestion des Absences</Text>

      <Picker
        selectedValue={selectedClasse}
        onValueChange={handleClasseChange}
        style={styles.picker}
      >
        <Picker.Item label="Sélectionnez une classe" value="" />
        {classes.map((classe, index) => (
          <Picker.Item key={index} label={classe} value={classe} />
        ))}
      </Picker>

      <FlatList
        data={eleves}
        renderItem={renderEleve}
        keyExtractor={(item) => item.identifiant.toString()}
        style={styles.list}
      />

      {selectedClasse && (
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveAbsences}>
          <Text style={styles.saveButtonText}>Enregistrer les absences</Text>
        </TouchableOpacity>
      )}
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
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'black',
  },
  picker: {
    backgroundColor: '#FFF',
    marginBottom: 16,
    borderRadius: 8,
    elevation: 2,
  },
  list: {
    flex: 1,
  },
  eleveContainer: {
    backgroundColor: '#FFF',
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  eleveAbsent: {
    backgroundColor: '#FDEDEC',
  },
  eleveText: {
    fontSize: 16,
    color: '#333',
  },
  eleveAbsentText: {
    color: '#E74C3C',
    textDecorationLine: 'line-through',
  },
  saveButton: {
    backgroundColor: '#3498DB',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default ManageAbsenceScreen;
