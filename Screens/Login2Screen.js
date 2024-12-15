import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './style';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@env';

function Login2Screen() {
  const navigation = useNavigation();
  const [identifiant, setIdentifiant] = useState('');
  const [password, setPassword] = useState('');

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async () => {
    if (!API_URL) {
      console.error('API_URL is not defined');
      Alert.alert('Configuration Error', 'API URL is not defined.');
      return;
    }
  
    const userData = {
      identifiant,
      password,
    };
  
    try {
      // Requête de connexion à l'API
      const res = await axios.post(`${API_URL}/login-user`, userData);
      console.log('Réponse du serveur :', res.data);
  
      if (res.data.status === 'ok') {
        Alert.alert('Connexion Réussie !!');
  
        // Stockage du token et autres informations utilisateur
        await AsyncStorage.setItem('token', res.data.data);
  
        if (res.data.userType) {
          await AsyncStorage.setItem('userType', res.data.userType);
  
          // Si c'est un professeur, on récupère l'identifiant et le stocke
          if (res.data.userType === 'Professeur' && res.data.identifiant) {
            await AsyncStorage.setItem('professeurIdentifiant', res.data.identifiant);
            console.log('Identifiant du professeur:', res.data.identifiant);
          }
  
          // Rediriger selon le type d'utilisateur
          switch (res.data.userType) {
            case 'Professeur':
              navigation.navigate('Professeur');
              break;
            case 'Admin':
              navigation.navigate('Dashboard');
              break;
            case 'Eleve':
              navigation.navigate('el');
              break;
            case 'Parent':
              navigation.navigate('Dashboard Parent');
              break;
            case 'Surveillant':
              navigation.navigate('Surveillant');
              break;
            default:
              console.error('userType inconnu');
          }
        } else {
          console.error('userType is undefined or null');
          Alert.alert('Erreur', 'Type d\'utilisateur inconnu.');
        }
      } else {
        Alert.alert('Erreur de connexion', res.data.data || 'Une erreur est survenue.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      Alert.alert('Erreur de connexion', 'Impossible de se connecter. Vérifiez vos informations.');
    }
  };
  

  // Fonction pour récupérer les données de connexion
  const getData = async () => {
    const data = await AsyncStorage.getItem('isLoggedIn');
    console.log('Statut de connexion :', data);
  
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.mainContainer}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps={'always'}
      >
        <View style={{ backgroundColor: 'white' }}>
          {/* Logo */}
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              source={require('../assets/signUp.png')}
            />
          </View>

          {/* Formulaire de connexion */}
          <View style={styles.loginContainer}>
            <Text style={styles.text_header}>Connectez Vous !!!</Text>
            <View style={styles.action}>
              <FontAwesome
                name="user"
                color="#420475"
                style={styles.smallIcon}
              />
              <TextInput
                placeholder="ID ou Téléphone"
                style={styles.textInput}
                onChangeText={(text) => setIdentifiant(text)}
              />
            </View>
            <View style={styles.action}>
              <FontAwesome
                name="lock"
                color="#420475"
                style={styles.smallIcon}
              />
              <TextInput
                placeholder="Mot de passe"
                secureTextEntry
                style={styles.textInput}
                onChangeText={(text) => setPassword(text)}
              />
            </View>
          </View>

          {/* Bouton de connexion */}
          <View style={styles.button}>
            <TouchableOpacity style={styles.inBut} onPress={handleSubmit}>
              <View>
                <Text style={styles.textSign}>Connexion</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default Login2Screen;
