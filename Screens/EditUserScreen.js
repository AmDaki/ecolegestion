import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, Button, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native'; // Importer le hook pour accéder aux paramètres de navigation
import axios from 'axios';
import { API_URL } from '@env';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const EditUserScreen = () => {
    const navigation = useNavigation();
  const route = useRoute(); // Utiliser le hook pour récupérer les paramètres de navigation
  const { user } = route.params; // Extraire l'utilisateur sélectionné
  const [userData, setUserData] = useState(user); // Initialiser l'état avec les données de l'utilisateur

  const handleSave = async () => {
    try {
      const res = await axios.put(`${API_URL}/update-user`, userData);  // Changer de POST à PUT
      if (res.data.status === 'Ok') {
        // Confirmer la réussite et retourner à l'écran précédent
        Alert.alert('Succès', 'Informations de l\'utilisateur mises à jour.');
        navigation.goBack();
      } else {
        Alert.alert('Erreur', 'Impossible de mettre à jour les informations.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erreur', 'Erreur lors de la mise à jour.');
    }
  };
  
  const handleChange = (field, value) => {
    setUserData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  return (
    <View style={styles.container}>
        <Text style={styles.label}>Identifiant</Text>
      <TextInput
        style={styles.input}
        value={userData.identifiant}
        onChangeText={(text) => handleChange('identifiant', text)}
      />
      <Text style={styles.label}>Nom</Text>
      <TextInput
        style={styles.input}
        value={userData.nom}
        onChangeText={(text) => handleChange('nom', text)}
      />

      <Text style={styles.label}>Prénom</Text>
      <TextInput
        style={styles.input}
        value={userData.prenom}
        onChangeText={(text) => handleChange('prenom', text)}
      />

      <Text style={styles.label}>Téléphone</Text>
      <TextInput
        style={styles.input}
        value={userData.telephone}
        onChangeText={(text) => handleChange('telephone', text)}
      />
      <Text style={styles.label}>Mot de Passe</Text>
      <TextInput
        style={styles.input}
        value={userData.password}
        onChangeText={(text) => handleChange('password', text)}
      />

      <Text style={styles.label}>Type d'utilisateur</Text>
      <TextInput
        style={styles.input}
        value={userData.userType}
        editable={false} // Ne pas permettre la modification du type d'utilisateur
      />

      <Button title="Enregistrer" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  label: {
    fontSize: 16,
    marginVertical: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default EditUserScreen;
