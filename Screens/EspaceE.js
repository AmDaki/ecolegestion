import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import { API_URL } from '@env'; // Import API_URL depuis le fichier .env

const TeacherAssignmentScreen = () => {
  const [professeurs, setProfesseurs] = useState([]);
  const [classes, setClasses] = useState([]);
  const [selectedProfesseur, setSelectedProfesseur] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Affiche le chargement
        const [professeursResponse, classesResponse] = await Promise.all([
          axios.get(`${API_URL}/get-all-professeurs`),
          axios.get(`${API_URL}/get-all-classes`),
        ]);

        setProfesseurs(professeursResponse.data.professeurs || []);
        setClasses(classesResponse.data.classes || []);

        // Pré-sélection automatique si des données sont disponibles
        if (professeursResponse.data.professeurs?.length > 0) {
          setSelectedProfesseur(professeursResponse.data.professeurs[0].identifiant);
        }
        if (classesResponse.data.classes?.length > 0) {
          setSelectedClass(classesResponse.data.classes[0].nomClasse);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
        Alert.alert('Erreur', 'Impossible de charger les données. Veuillez réessayer.');
      } finally {
        setLoading(false); // Arrête le chargement
      }
    };

    fetchData();
  }, []);

  const handleAssignClass = async () => {
    if (!selectedProfesseur || !selectedClass) {
      Alert.alert('Erreur', 'Veuillez sélectionner un professeur et une classe.');
      return;
    }

    try {
      const response = await axios.put(`${API_URL}/assign-class-to-professeur`, {
        professeurIdentifiant: selectedProfesseur,
        nomClasse: selectedClass,
      });

      if (response.data.status === 'ok') {
        Alert.alert('Succès', 'Classe attribuée avec succès !');
        setSelectedProfesseur('');
        setSelectedClass('');
      } else if (response.data.error === 'DuplicateAssignment') {
        Alert.alert('Erreur', 'Ce professeur est déjà assigné à cette classe.');
      } else {
        Alert.alert('Erreur', `Une erreur est survenue: ${response.data.error || 'Erreur inconnue.'}`);
      }
    } catch (error) {
      console.error('Erreur lors de l\'attribution de la classe :', error);
      Alert.alert('Erreur', `Impossible d\'attribuer la classe: ${error.message}`);
    }
};

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6200ee" />
        <Text>Chargement des données...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Espace Professeur</Text>
      </View>

      <View style={styles.statsCard}>
        <Text style={styles.statsText}>Professeurs disponibles : {professeurs.length}</Text>
        <Text style={styles.statsText}>Classes disponibles : {classes.length}</Text>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Sélectionnez un Professeur :</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedProfesseur}
            onValueChange={(itemValue) => setSelectedProfesseur(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="-- Choisissez un professeur --" value="" />
            {professeurs.map(professeur => (
              <Picker.Item
                key={professeur.identifiant}
                label={professeur.label} // Afficher nom + prénom
                value={professeur.identifiant}
              />
            ))}
          </Picker>
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Sélectionnez une Classe :</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedClass}
            onValueChange={(itemValue) => setSelectedClass(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="-- Choisissez une classe --" value="" />
            {classes.map(classe => (
              <Picker.Item key={classe.nomClasse} label={classe.nomClasse} value={classe.nomClasse} />
            ))}
          </Picker>
        </View>
      </View>

      <TouchableOpacity
        style={[
          styles.assignButton,
          (!selectedProfesseur || !selectedClass) && { backgroundColor: '#ccc' },
        ]}
        onPress={handleAssignClass}
        disabled={!selectedProfesseur || !selectedClass}
      >
        <Text style={styles.assignButtonText}>Attribuer la Classe</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f0f5',
  },
  header: {
    backgroundColor: '#6200ee',
    padding: 20,
    width: '100%',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 4,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  statsCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '100%',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 4,
  },
  statsText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
    marginVertical: 5,
  },
  formGroup: {
    width: '100%',
    marginVertical: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 5,
    color: '#6200ee',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 4,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  assignButton: {
    backgroundColor: '#6200ee',
    borderRadius: 8,
    padding: 16,
    marginTop: 20,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 4,
  },
  assignButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TeacherAssignmentScreen;
