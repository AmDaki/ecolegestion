import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './style';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Login2Screen() {
  const navigation = useNavigation();
  const [identifiant, setIdentifiant] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    const userData = {
      identifiant,
      password,
    };
  
    try {
      const res = await axios.post('http://192.168.1.69:5000/login-user', userData);
      console.log(res.data); // Vérifiez la réponse de l'API
      if (res.data.status === 'ok') {
        Alert.alert('Connexion Réussie !!');
        await AsyncStorage.setItem('token', res.data.data);
        await AsyncStorage.setItem('isLoggedIn', JSON.stringify(true));
  
        if (res.data.userType) {
          await AsyncStorage.setItem('userType', res.data.userType);
          
          // Utilisation d'instructions if au lieu de switch
          if (res.data.userType === "Admin") {
            navigation.navigate('Dashboard');
          } else if (res.data.userType === "Professeur") {
            navigation.navigate('Professeur');
          } else if (res.data.userType === "Eleve") {
            navigation.navigate('Eleve');
          } else if (res.data.userType === "Parent") {
            navigation.navigate('Parent');
          } else if (res.data.userType === "Surveillant") {
            navigation.navigate('Surveillant');
          } else {
            console.error("userType inconnu");
          }
        } else {
          console.error("userType is undefined or null");
        }
      } else {
        Alert.alert('Erreur de connexion', res.data.data || 'Une erreur est survenue.');
      }
    } catch (error) {
      console.error("Error during login:", error);
      Alert.alert('Erreur de connexion', 'Impossible de se connecter. Vérifiez vos informations.');
    }
  };
  

  const getData = async () => {
    const data = await AsyncStorage.getItem('isLoggedIn');
    console.log(data, 'at app.jsx');
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps={'always'}>
      <View style={{ backgroundColor: 'white' }}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require('../assets/signUp.png')}
          />
        </View>
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
              onChange={e => setIdentifiant(e.nativeEvent.text)}
            />
          </View>
          <View style={styles.action}>
            <FontAwesome name="lock" color="#420475" style={styles.smallIcon} />
            <TextInput
              placeholder="Mot de passe"
              secureTextEntry
              style={styles.textInput}
              onChange={e => setPassword(e.nativeEvent.text)}
            />
          </View>
          <View
            style={{
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
              marginTop: 8,
              marginRight: 10,
            }}>
            <Text style={{ color: '#000', fontWeight: '700' }}>
              Mot de Passe Oublié?
            </Text>
          </View>
        </View>
        <View style={styles.button}>
          <TouchableOpacity style={styles.inBut} onPress={handleSubmit}>
            <View>
              <Text style={styles.textSign}>Connexion</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

export default Login2Screen;