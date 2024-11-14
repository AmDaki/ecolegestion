import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import axios from 'axios';
import { API_URL } from '@env'; // Import API_URL depuis le fichier .env

const CreateClassScreen = () => {
  const [className, setClassName] = useState('');
  const [classGrade, setClassGrade] = useState('');
  const [classCapacity, setClassCapacity] = useState('');

  const handleCreateClass = () => {
    // Validation des champs
    if (!className || !classGrade || isNaN(classCapacity) || classCapacity <= 0) {
      Alert.alert('Erreur', 'Tous les champs doivent être remplis et la capacité doit être un nombre positif.');
      return;
    }

    // Création de l'objet de données pour la classe
    const classData = {
      nomClasse: className,       // Changement de 'name' à 'nomClasse'
      niveau: classGrade,         // Changement de 'grade' à 'niveau'
      capacite: parseInt(classCapacity),    // Conversion de 'capacity' en nombre
    };

    // Envoi de la requête POST à l'API
    axios.post(`${API_URL}/registerClasse`, classData)
    .then(response => {
      console.log('Réponse de l\'API:', response); // Affiche la réponse complète de l'API
      Alert.alert('Succès', 'Classe créée avec succès!');
      setClassName('');
      setClassGrade('');
      setClassCapacity('');
    })
    .catch(error => {
      // Gestion des erreurs détaillées
      if (error.response) {
        // Si la réponse d'erreur est reçue du serveur
        console.error('Erreur réponse:', error.response.data);
      } else {
        // Si l'erreur provient d'une autre source (ex: réseau)
        console.error('Erreur:', error.message);
      }
      Alert.alert('Erreur', 'Impossible de créer la classe.');
    });
  
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Créer une Nouvelle Classe</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nom de la classe :</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 6ème A"
          value={className}
          onChangeText={setClassName}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Niveau :</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 6ème"
          value={classGrade}
          onChangeText={setClassGrade}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Capacité :</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 30"
          keyboardType="numeric"
          value={classCapacity}
          onChangeText={setClassCapacity}
        />
      </View>

      <TouchableOpacity style={styles.createButton} onPress={handleCreateClass}>
        <Text style={styles.buttonText}>Créer la Classe</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.createButton} >
        <Text style={styles.buttonText}>Liste des Classes créées</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#F3F8FE',
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#2A9D8F',
    textAlign: 'center',
    marginBottom: 30,
    textTransform: 'uppercase',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#264653',
    fontWeight: '600',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#FFF',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    fontSize: 16,
    borderColor: '#E1E8ED',
    borderWidth: 1,
    color: '#2A9D8F',
    shadowColor: '#264653',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.5,
    elevation: 3,
  },
  createButton: {
    backgroundColor: '#E76F51',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 30,
    shadowColor: '#E76F51',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '700',
    textTransform: 'uppercase',
  },
});

export default CreateClassScreen;
