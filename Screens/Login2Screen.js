import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './style';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@env'; 

console.log({ API_URL });

function Login2Screen() {
  const navigation = useNavigation();
  const [identifiant, setIdentifiant] = useState('');
  const [password, setPassword] = useState('');
  
  
const handleSubmit = async () => {
  if (!API_URL) {
    console.error("API_URL is not defined");
    Alert.alert("Configuration Error", "API URL is not defined.");
    return;
  }

  const userData = {
    identifiant,
    password,
  };
 
  try {
    const res = await axios.post(`${API_URL}/login-user`, userData); 
    console.log(res.data); 
    if (res.data.status === 'ok') {
      Alert.alert('Connexion Réussie !!');
      await AsyncStorage.setItem('token', res.data.data);
      await AsyncStorage.setItem('isLoggedIn', JSON.stringify(true));

      if (res.data.userType) {
        await AsyncStorage.setItem('userType', res.data.userType);
        
        if (res.data.userType === "Admin") {
          navigation.navigate('Dashboard');
        } else if (res.data.userType === "Professeur") {
          navigation.navigate('Professeur');
        } else if (res.data.userType === "Eleve") {
          navigation.navigate('el');
        } else if (res.data.userType === "Parent") {
          navigation.navigate('Dashboard Parent');
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
    <View style={styles.mainContainer}>
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
              onChangeText={text => setIdentifiant(text)}
            />
          </View>
          <View style={styles.action}>
            <FontAwesome name="lock" color="#420475" style={styles.smallIcon} />
            <TextInput
              placeholder="Mot de passe"
              secureTextEntry
              style={styles.textInput}
              onChangeText={text => setPassword(text)}
            />
          </View>
          <View
            style={{
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
              marginTop: 8,
              marginRight: 10,
            }}>
          
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
    </View>
  );
}

export default Login2Screen;
