
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import { API_URL } from '@env'; // Import API_URL depuis le fichier .env

const TeacherAssignmentScreen = () => {
  const [professeurs, setProfesseurs] = useState([]);
  const [classes, setClasses] = useState([]);
  const [selectedProfesseur, setSelectedProfesseur] = useState('');
  const [selectedClasses, setSelectedClasses] = useState([]); // Sélection multiple
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [professeursResponse, classesResponse] = await Promise.all([
          axios.get(`${API_URL}/get-all-professeurs`),
          axios.get(`${API_URL}/get-all-classes`),
        ]);

        setProfesseurs(professeursResponse.data.professeurs || []);
        setClasses(classesResponse.data.classes || []);
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
        Alert.alert('Erreur', 'Impossible de charger les données. Veuillez réessayer.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAssignClasses = async () => {
    console.log('Professeur:', selectedProfesseur);
    console.log('Classes sélectionnées:', selectedClasses);
  
    if (!selectedProfesseur || selectedClasses.length === 0) {
      Alert.alert('Erreur', 'Veuillez sélectionner un professeur et au moins une classe.');
      return;
    }
  
    try {
      const response = await axios.put(`${API_URL}/assign-class-to-professeur`, {
        professeurIdentifiant: selectedProfesseur,
        nomClasses: selectedClasses,
      });
  
      console.log('Réponse de l\'API:', response.data);
  
      if (response.data.status === 'ok') {
        Alert.alert('Succès', 'Classes attribuées avec succès !');
        setSelectedClasses([]);
      } else {
        Alert.alert('Erreur', `Une erreur est survenue: ${response.data.error || 'Erreur inconnue.'}`);
      }
    } catch (error) {
      console.error('Erreur lors de l\'attribution des classes :', error);
      Alert.alert('Erreur', `Impossible d\'attribuer les classes: ${error.message}`);
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
                label={professeur.label} // Affiche nom + prénom
                value={professeur.identifiant}
              />
            ))}
          </Picker>
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Sélectionnez les Classes :</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={null}
            onValueChange={(itemValue) => {
              if (!selectedClasses.includes(itemValue) && itemValue !== null) {
                setSelectedClasses([...selectedClasses, itemValue]);
              }
            }}
            style={styles.picker}
          >
            <Picker.Item label="-- Choisissez une classe --" value={null} />
            {classes.map(classe => (
              <Picker.Item key={classe.nomClasse} label={classe.nomClasse} value={classe.nomClasse} />
            ))}
          </Picker>
        </View>
        {/* Affichage des classes sélectionnées */}
        <View style={styles.selectedClassesContainer}>
          {selectedClasses.map((classe, index) => (
            <View key={index} style={styles.selectedClassItem}>
              <Text style={styles.selectedClassText}>{classe}</Text>
              <TouchableOpacity onPress={() => setSelectedClasses(selectedClasses.filter(c => c !== classe))}>
                <Text style={styles.removeClassText}>✖</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>

      <TouchableOpacity
        style={[
          styles.assignButton,
          (!selectedProfesseur || selectedClasses.length === 0) && { backgroundColor: '#ccc' },
        ]}
        onPress={handleAssignClasses}
        disabled={!selectedProfesseur || selectedClasses.length === 0}
      >
        <Text style={styles.assignButtonText}>Attribuer les Classes</Text>
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
    backgroundColor: 'darkgreen',
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
    backgroundColor: 'darkgreen',
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
  selectedClassesContainer: {
    marginTop: 10,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
  },
  selectedClassItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
  selectedClassText: {
    fontSize: 16,
  },
  removeClassText: {
    color: '#FF0000',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TeacherAssignmentScreen;
