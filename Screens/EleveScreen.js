import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  StyleSheet,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_URL } from '@env';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const EleveAccueilScreen = () => {
  const navigation = useNavigation();
  const [fadeAnim] = useState(new Animated.Value(0)); // Animation pour effet de fondu
  const [userData, setUserData] = useState({});
  const [emploisTemps, setEmploisTemps] = useState([]);

  useEffect(() => {
    getData();
    fetchEmploiTemps();
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  // Récupérer les données utilisateur
  const getData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');  // Récupérer le token depuis AsyncStorage
      const res = await axios.post(`${API_URL}/userdata`, { token });
      setUserData(res.data.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des données utilisateur:', error);
    }
  };

  // Récupérer l'emploi du temps
  const fetchEmploiTemps = async () => {
    try {
      const token = await AsyncStorage.getItem('token');  // Récupérer le token depuis AsyncStorage
      const res = await axios.post(`${API_URL}/save-emploitempss`, { token });
      setEmploisTemps(res.data.emploiDuTemps);
    } catch (error) {
      console.error('Erreur lors de la récupération des emplois du temps:', error);
    }
  };

  const renderEmploiItem = ({ item }) => (
    <View style={styles.taskContainer}>
      <Text style={styles.taskName}>{item.matiere}</Text>
      <Text style={styles.taskDetails}>
        {item.heureDebut} - {item.heureFin}
      </Text>
      <Text style={styles.taskStatus}>{item.salle}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Bienvenue, {userData.nom} {userData.prenom}!</Text>
        <FontAwesome name="user-circle" size={50} color="#fff" />
      </View>

      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        {/* Section "Mon Profil" */}
        <TouchableOpacity onPress={() => navigation.navigate('Profil')}>
          <View style={styles.profileCard}>
            <Image source={require('../assets/student.jpg')} style={styles.image} />
            <View style={styles.cardDetails}>
              <Text style={styles.userType}>Rôle: {userData.userType}</Text>
              <Text style={styles.userName}>{userData.nom} {userData.prenom}</Text>
              <Text style={styles.userName}>Classe: {userData.classe}</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Emploi du Temps */}
        <View style={styles.upcomingTaskContainer}>
          <Text style={styles.sectionTitle}> Emploi du Temps</Text>
          <FlatList
            data={emploisTemps}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={renderEmploiItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>

        {/* Navigation Cards */}
        <View style={styles.cardsContainer}>
          {renderCard('Mes Notes', 'Consultez vos notes de chaque matière.', 'file-document-outline', 'NotesScreen')}
          {renderCard('Messages', 'Envoyez et recevez des messages.', 'email', 'MessagesScreen')}
        </View>
      </Animated.View>
    </View>
  );

  function renderCard(title, description, icon, navigateTo) {
    return (
      <View style={styles.card} key={title}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardDescription}>{description}</Text>
        <TouchableOpacity
          style={styles.cardButton}
          onPress={() => navigation.navigate(navigateTo)}
        >
          <FontAwesome name={icon} size={20} color="#fff" />
          <Text style={styles.cardButtonText}>Accéder</Text>
        </TouchableOpacity>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5E9',
    padding: 16,
  },
  header: {
    backgroundColor: '#3E4A89',
    padding: 20,
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
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
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
  upcomingTaskContainer: {
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  taskContainer: {
    backgroundColor: '#fff',
    padding: 16,
    marginRight: 10,
    borderRadius: 8,
    elevation: 3,
  },
  taskName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  taskDetails: {
    fontSize: 14,
    color: '#555',
  },
  taskStatus: {
    fontSize: 12,
    color: '#888',
  },
  cardsContainer: {
    marginTop: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardDescription: {
    fontSize: 14,
    color: '#555',
    marginVertical: 8,
  },
  cardButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3E4A89',
    padding: 10,
    borderRadius: 8,
    marginTop: 8,
  },
  cardButtonText: {
    color: '#fff',
    marginLeft: 8,
    fontWeight: 'bold',
  },
});

export default EleveAccueilScreen;
