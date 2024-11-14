import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, Animated,Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { NetworkInfo } from 'react-native-network-info';
import { useEffect } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { API_URL } from '@env'; // Import API_URL depuis le fichier .env
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


const API_PORT = '5000';

const ProfesseurScreen = () => {
  const navigation = useNavigation();
  const [fadeAnim] = useState(new Animated.Value(0)); // Animation for fade-in effect
  const [userData, setUserData] = useState({});
  const [allUserData, setAllUserData] = useState([]);
  

  useEffect(() => {
    fetchUserData();
    getData();
    getAllData();
  }, []);

  async function getAllData() {
    try {
      const res = await axios.post(`${API_URL}/get-all-user`);
     
      setAllUserData(res.data.data);
    } catch (error) {
      
    }
  }

  async function getData() {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await axios.post(`${API_URL}/userdata`, { token });
      setUserData(res.data.data);
    } catch (error) {
      console.error;
    }
  }
  
  
  const fetchUserData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.post('http://192.168.1.69:5000/userdata', { token });
      setUserData(response.data.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
 

  

  // Animation for fade-in effect when component mounts
  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <ScrollView style={styles.container}>
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <Text style={styles.header}>Tableau de Bord Professeur</Text>

        {/* Avatar with Welcome Message */}
        <View style={styles.avatarContainer}>
          {/* <Avatar.Image size={100} source={require('../assets/professor-avatar.png')} /> */}
          <Text style={styles.welcomeText}>Bienvenue, Professeur!</Text>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate("Profil")}>
        <View style={styles.profileCard}>
          <Image source={require('../prof1.jpg')} style={styles.image} />
          <View style={styles.cardDetails}>
            <Text style={styles.userType}>{userData.userType} </Text>
            <Text style={styles.userName}>{userData.nom} {userData.prenom}</Text>
          </View>
        </View>
      </TouchableOpacity>

        {/* Card: Mes Classes */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>Mes Classes</Title>
            <Paragraph>Voir et gérer les classes que vous enseignez.</Paragraph>
          </Card.Content>
          <Card.Actions>
            <Button
              mode="contained"
              icon="school"
              onPress={() => navigation.navigate('ClassesScreen')}
              style={styles.actionButton}
            >
              Voir mes classes
            </Button>
          </Card.Actions>
        </Card>

        {/* Card: Prendre la présence */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>Prendre la Présence</Title>
            <Paragraph>Marquez les absents et les présents dans vos classes.</Paragraph>
          </Card.Content>
          <Card.Actions>
            <Button
              mode="contained"
              icon="check-circle"
              onPress={() => navigation.navigate('esk')}
              style={styles.actionButton}
            >
              Prendre la présence
            </Button>
          </Card.Actions>
        </Card>

        {/* Card: Notes */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>Gérer les Notes</Title>
            <Paragraph>Consulter ou ajouter les notes des élèves.</Paragraph>
          </Card.Content>
          <Card.Actions>
            <Button
              mode="contained"
              icon="file-document-outline"
              onPress={() => navigation.navigate('NotesScreen')}
              style={styles.actionButton}
            >
              Voir les notes
            </Button>
          </Card.Actions>
        </Card>

        {/* Card: Emploi du Temps */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>Emploi du Temps</Title>
            <Paragraph>Consultez votre emploi du temps de la semaine.</Paragraph>
          </Card.Content>
          <Card.Actions>
            <Button
              mode="contained"
              icon="calendar"
              onPress={() => navigation.navigate('EmploiDuTempsScreen')}
              style={styles.actionButton}
            >
              Emploi du temps
            </Button>
          </Card.Actions>
        </Card>

        {/* Card: Messages */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>Messages</Title>
            <Paragraph>Envoyez et recevez des messages.</Paragraph>
          </Card.Content>
          <Card.Actions>
            <Button
              mode="contained"
              icon="email"
              onPress={() => navigation.navigate('MessagesScreen')}
              style={styles.actionButton}
            >
              Messages
            </Button>
          </Card.Actions>
        </Card>
      </Animated.View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5E9',
  },
  content: {
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3E4A89',
    textAlign: 'center',
    marginVertical: 20,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  welcomeText: {
    fontSize: 18,
    color: '#333',
    marginTop: 10,
  },
  card: {
    marginVertical: 10,
    borderRadius: 15,
    elevation: 4,
    backgroundColor: '#fff',
  },
  cardTitle: {
    fontSize: 20,
    color: '#3E4A89',
  },
  actionButton: {
    backgroundColor: '#6200ee',
    marginTop: 10,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginVertical: 20,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  userType: {
    fontSize: 16,
    color: 'black',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 20,
  },
});

export default ProfesseurScreen;
