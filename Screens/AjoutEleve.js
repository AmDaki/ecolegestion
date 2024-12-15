import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { API_URL } from '@env';
import MultiSelect from 'react-native-multiple-select';
import { Picker } from '@react-native-picker/picker';

const AssignClassScreen = () => {
  const [selectedLevel, setSelectedLevel] = useState(null); // Pas de sélection par défaut
  const [availableClasses, setAvailableClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null); // Pas de sélection par défaut
  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]); // Contiendra les identifiants des élèves
  const [loadingClasses, setLoadingClasses] = useState(false);
  const [loadingStudents, setLoadingStudents] = useState(false);

  // Liste des niveaux disponibles
  const levels = ['6eme', '5eme', '4eme', '3eme', '2nde', '1ère', 'Terminale'];

  // Charger les classes et élèves en fonction du niveau sélectionné
  useEffect(() => {
    if (selectedLevel) {
      setLoadingClasses(true);
      axios
      .get(`${API_URL}/get-classes-by-niveau?niveau=${selectedLevel}`)
      .then((response) => {
        setLoadingClasses(false);
    
        if (response.data.status === 'ok' && Array.isArray(response.data.classes)) {
          setAvailableClasses(response.data.classes);
        } else {
          setAvailableClasses([]);
          Alert.alert('Info', 'Aucune classe disponible pour ce niveau.');
        }
      })
      .catch((error) => {
        setLoadingClasses(false);
    
        // Affiche un message d'erreur détaillé si disponible
        const errorMessage = error.response?.data?.message || 'Impossible de charger les classes.';
        Alert.alert('Erreur', errorMessage);
      });
    
      axios
        .get(`${API_URL}/get-eleves-by-niveau?niveau=${selectedLevel}`)
        .then((response) => {
          setLoadingStudents(false);
          if (response.data.status === 'ok' && Array.isArray(response.data.eleves)) {
            setStudents(response.data.eleves);
          } else {
            setStudents([]);
          }
        })
        .catch(() => {
          setLoadingStudents(false);
          Alert.alert('Erreur', 'Impossible de charger les élèves.');
        });
    } else {
      setAvailableClasses([]);
      setStudents([]);
    }
  }, [selectedLevel]);

  const handleAssign = () => {
    if (!selectedLevel || !selectedClass || selectedStudents.length === 0) {
        Alert.alert('Erreur', 'Veuillez sélectionner un niveau, une classe et des élèves.');
        return;
    }

    const assignmentData = {
        classeNom: selectedClass,
        identifiants: selectedStudents, // Tableau des identifiants des élèves sélectionnés
    };

    axios
        .put(`${API_URL}/assign-classe`, assignmentData)
        .then((response) => {
            Alert.alert('Succès', 'Classes attribuées avec succès!');
        })
        .catch((error) => {
            Alert.alert('Erreur', 'Impossible d\'attribuer les classes.');
        });
};

  return (
    <ScrollView contentContainerStyle={styles.container}>
       <View style={styles.header}>
       <Text style={styles.headerText}>Attribuer une Classe aux Élèves</Text>
       </View>

      {/* Sélection du Niveau */}
      <Text style={styles.label}>Sélectionner un Niveau :</Text>
      <Picker
        selectedValue={selectedLevel}
        onValueChange={(value) => {
          setSelectedLevel(value);
          setSelectedClass(null); // Réinitialiser la classe
          setSelectedStudents([]); // Réinitialiser les élèves
        }}
        style={styles.picker}
      >
        <Picker.Item label="-- Sélectionner un niveau --" value={null} />
        {levels.map((level) => (
          <Picker.Item key={level} label={level} value={level} />
        ))}
      </Picker>

      {/* Sélection de la Classe */}
      {selectedLevel && (
        <>
          <Text style={styles.label}>Sélectionner une Classe :</Text>
          {loadingClasses ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <Picker
              selectedValue={selectedClass} // L'état ici est lié à nomClasse
              onValueChange={(value) => {
                setSelectedClass(value); // Mise à jour avec le nom de la classe
              }}
              style={styles.picker}
            >
              <Picker.Item label="-- Sélectionner une classe --" value={null} />
              {availableClasses.length > 0 ? (
                availableClasses.map((cls) => (
                  <Picker.Item key={cls.nomClasse} label={cls.nomClasse || 'Classe inconnue'} value={cls.nomClasse || null} />
                ))
              ) : (
                <Picker.Item label="Aucune classe disponible" value={null} />
              )}
            </Picker>
          )}
        </>
      )}

      {/* Sélection des Élèves */}
      {selectedLevel && (
        <>
          <Text style={styles.label}>Sélectionner des Élèves :</Text>
          {loadingStudents ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <MultiSelect
              items={students.map((student) => ({
                id: student.identifiant, // Utiliser identifiant pour les élèves
                name: `${student.prenom} ${student.nom}`,
              }))}
              uniqueKey="id"
              onSelectedItemsChange={setSelectedStudents} // Mettre à jour les identifiants des élèves sélectionnés
              selectedItems={selectedStudents}
              selectText="Sélectionner des élèves"
              searchInputPlaceholderText="Rechercher des élèves"
              tagRemoveIconColor="#d5d5d5"
              tagBorderColor="#d5d5d5"
              tagTextColor="#d5d5d5"
              selectedItemTextColor="#CCC"
              selectedItemIconColor="#CCC"
              itemTextColor="#000"
              displayKey="name"
              searchInputStyle={{ color: '#CCC' }}
              submitButtonColor="#48D1CC"
              submitButtonText="Valider"
            />
          )}
        </>
      )}

      {/* Bouton d'attribution */}
      {selectedLevel && selectedClass && selectedStudents.length > 0 && (
        <TouchableOpacity style={styles.assignButton} onPress={handleAssign}>
          <Text style={styles.buttonText}>Attribuer</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: '#555',
  },
  picker: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDD',
    paddingHorizontal: 10,
    color: '#333',
    marginBottom: 20,
  },
  assignButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
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
  buttonText: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default AssignClassScreen;
