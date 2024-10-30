import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert,ScrollView } from 'react-native';

import axios from 'axios';

const CreateClassScreen = () => {
  const [className, setClassName] = useState('');
  const [classGrade, setClassGrade] = useState('');
  const [classCapacity, setClassCapacity] = useState('');

  const handleCreateClass = () => {
    if (!className || !classGrade || !classCapacity) {
      Alert.alert('Erreur', 'Tous les champs doivent être remplis.');
      return;
    }

    const classData = {
      name: className,
      grade: classGrade,
      capacity: classCapacity,
    };

    axios.post('http://your-server-url/create-class', classData)
      .then(response => {
        Alert.alert('Succès', 'Classe créée avec succès!');
        setClassName('');
        setClassGrade('');
        setClassCapacity('');
      })
      .catch(error => {
        console.error(error);
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#420475',
    textAlign: 'center',
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    color: '#333',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    fontSize: 16,
    borderColor: '#ddd',
    borderWidth: 1,
    color: '#000',
  },
  createButton: {
    backgroundColor: '#420475',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 30,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CreateClassScreen;
