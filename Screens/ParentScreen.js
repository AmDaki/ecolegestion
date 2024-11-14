import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const ParentHomeScreen = () => {
  const navigation = useNavigation();
  const [studentData, setStudentData] = useState({});
  const [userData, setUserData] = useState({});
  
  useEffect(() => {
    fetchUserData();
    fetchStudentData();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.post('http://192.168.1.69:5000/userdata', { token });
      setUserData(response.data.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const fetchStudentData = async () => {
    try {
      const response = await axios.get('http://192.168.1.69:5000/get-student-data');
      setStudentData(response.data);
    } catch (error) {
      console.error('Error fetching student data:', error);
    }
  };

  const handleSignOut = async () => {
    await AsyncStorage.clear();
    navigation.navigate('Login');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Bienvenue !!!</Text>
        <FontAwesome name="user-circle" size={50} color="#fff" />
      </View>

      <View style={styles.profileCard}>
        <Image source={require('../assets/parent1.jpg')} style={styles.profileImage} />
        <View style={styles.cardDetails}>
          <Text style={styles.userType}>Parent</Text>
          <Text style={styles.userName}>{userData.nom} {userData.prenom}</Text>
        </View>
      </View>

      {/* Card: Assiduité */}
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.cardTitle}>Suivi</Title>
          <Paragraph>Voir les absences et présences de l’élève.</Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button
            mode="contained"
            icon="clipboard-check"
            onPress={() => navigation.navigate('AttendanceScreen')}
            style={styles.actionButton}
          >
            Voir l'assiduité
          </Button>
        </Card.Actions>
      </Card>

      {/* Card: Notes */}
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.cardTitle}>Notes</Title>
          <Paragraph>Consultez les notes de l'élève.</Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button
            mode="contained"
            icon="file-document-outline"
            onPress={() => navigation.navigate('GradesScreen')}
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
          <Paragraph>Consultez l'emploi du temps de l'élève.</Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button
            mode="contained"
            icon="calendar"
            onPress={() => navigation.navigate('TimetableScreen')}
            style={styles.actionButton}
          >
            Emploi du Temps
          </Button>
        </Card.Actions>
      </Card>

      {/* Card: Messages */}
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.cardTitle}>Messages</Title>
          <Paragraph>Envoyez et recevez des messages avec les enseignants.</Paragraph>
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

      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
        <Text style={styles.signOutButtonText}>Déconnexion</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#E8F5E9',
  },
  header: {
    backgroundColor: '#3E4A89',
    padding: 20,
    width: '100%',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  cardDetails: {
    flex: 1,
  },
  userType: {
    fontSize: 16,
    color: '#333',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3E4A89',
  },
  card: {
    marginVertical: 10,
    borderRadius: 15,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 20,
    color: '#3E4A89',
  },
  actionButton: {
    backgroundColor: '#3E4A89',
  },
  signOutButton: {
    marginTop: 30,
    backgroundColor: '#E53935',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  signOutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ParentHomeScreen;
