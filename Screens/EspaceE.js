import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import { API_URL } from '@env'; // Import API_URL depuis le fichier .env

const TeacherAssignmentScreen = () => {
  const [professeurs, setProfesseurs] = useState([]);
  const [classes, setClasses] = useState([]);
  const [selectedProfesseur, setSelectedProfesseur] = useState('');
  const [selectedClass, setSelectedClass] = useState('');

  useEffect(() => {
    const fetchProfesseursAndClasses = async () => {
      try {
        const professeursResponse = await axios.get(`${API_URL}/get-all-professeurs`);
        const classesResponse = await axios.get(`${API_URL}/get-all-classes`);

        console.log("Professeurs:", professeursResponse.data.professeurs); // Afficher les professeurs reçus
        console.log("Classes:", classesResponse.data.classes); // Afficher les classes reçues

        // Vérification si les données sont valides avant de les enregistrer
        if (professeursResponse.data.professeurs && professeursResponse.data.professeurs.length > 0) {
          setProfesseurs(professeursResponse.data.professeurs);
          setSelectedProfesseur(professeursResponse.data.professeurs[0].identifiant); // Sélectionner le premier professeur par défaut
        }

        if (classesResponse.data.classes && classesResponse.data.classes.length > 0) {
          setClasses(classesResponse.data.classes);
          setSelectedClass(classesResponse.data.classes[0].nomClasse); // Sélectionner la première classe par défaut
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des professeurs et des classes:', error);
      }
    };

    fetchProfesseursAndClasses();
  }, []);

  const handleAssignClass = async () => {
    if (!selectedProfesseur || !selectedClass) {
      Alert.alert('Erreur', 'Veuillez sélectionner un professeur et une classe.');
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/assign-class-to-professeur`, {
        professeurIdentifiant: selectedProfesseur, // Utiliser professeurIdentifiant au lieu de professeurId
        nomClasse: selectedClass, // Utiliser nomClasse au lieu de classId
      });
      

      if (response.data.status === 'ok') {
        Alert.alert('Succès', 'Classe attribuée avec succès !');
      } else {
        Alert.alert('Erreur', 'Une erreur est survenue lors de l\'attribution.');
      }
    } catch (error) {
      console.error('Erreur lors de l\'attribution de la classe:', error);
      Alert.alert('Erreur', 'Impossible d\'attribuer la classe.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Espace Professeur</Text>
      </View>
      
      <View style={styles.statsCard}>
        <Text style={styles.statsText}>Professeurs disponibles : {professeurs ? professeurs.length : 0}</Text>
        <Text style={styles.statsText}>Classes disponibles : {classes ? classes.length : 0}</Text>
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
            {professeurs && professeurs.length > 0 ? (
              professeurs.map(professeur => (
                <Picker.Item 
    key={professeur.identifiant} 
    label={professeur.label}  // Utilise le champ 'label' pour afficher nom + prénom
    value={professeur.identifiant} 
/>

              ))
            ) : (
              <Picker.Item label="Aucun professeur disponible" value="" />
            )}
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
            {classes && classes.length > 0 ? (
              classes.map(cls => (
                <Picker.Item key={cls.nomClasse} label={cls.nomClasse} value={cls.nomClasse} />
              ))
            ) : (
              <Picker.Item label="Aucune classe disponible" value="" />
            )}
          </Picker>
        </View>
      </View>

      <TouchableOpacity style={styles.assignButton} onPress={handleAssignClass}>
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
});

export default TeacherAssignmentScreen;
