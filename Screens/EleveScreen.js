import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, Animated, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EleveAccueilScreen = () => {
  const navigation = useNavigation();
  const [fadeAnim] = useState(new Animated.Value(0)); // Animation pour effet de fondu
  const [userData, setUserData] = useState({});

  useEffect(() => {
    getData();
    // Animation pour effet de fondu
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  async function getData() {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await axios.post('http://192.168.1.69:5000/userdata', { token });
      setUserData(res.data.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <Text style={styles.header}>Bienvenue, {userData.nom}</Text>

        <TouchableOpacity onPress={() => navigation.navigate("Profil")}>
          <View style={styles.profileCard}>
            <Image source={require('../assets/iconschool.png')} style={styles.image} />
            <View style={styles.cardDetails}>
              <Text style={styles.userType}>{userData.userType}</Text>
              <Text style={styles.userName}>{userData.nom} {userData.prenom}</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Cards Section */}
        <View style={styles.cardsContainer}>
          {renderCard("Mes Classes", "Voir les classes auxquelles vous êtes inscrit.", "school", 'ClassesScreen')}
          {renderCard("Mes Notes", "Consultez vos notes de chaque matière.", "file-document-outline", 'NotesScreen')}
          {renderCard("Emploi du Temps", "Consultez votre emploi du temps de la semaine.", "calendar", 'EmploiDuTempsScreen')}
          {renderCard("Messages", "Envoyez et recevez des messages.", "email", 'MessagesScreen')}
        </View>
      </Animated.View>
    </ScrollView>
  );

  function renderCard(title, description, icon, navigateTo) {
    return (
      <Card style={styles.card} key={title}>
        <Card.Content>
          <Title style={styles.cardTitle}>{title}</Title>
          <Paragraph>{description}</Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button
            mode="contained"
            icon={icon}
            onPress={() => navigation.navigate(navigateTo)}
            style={styles.actionButton}
          >
            {title}
          </Button>
        </Card.Actions>
      </Card>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  content: {
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 16,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  cardDetails: {
    flex: 1,
  },
  userType: {
    fontSize: 14,
    color: '#888',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  cardsContainer: {
    marginTop: 16,
  },
  card: {
    marginBottom: 16,
    borderRadius: 8,
    elevation: 3, // Ombre pour donner de la profondeur
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  actionButton: {
    marginTop: 8,
    borderRadius: 20,
  },
});

export default EleveAccueilScreen;