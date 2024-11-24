import { NetworkInfo } from 'react-native-network-info';
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, StyleSheet, ScrollView, Dimensions } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { Card } from 'react-native-paper';
import { API_URL } from '@env';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import ProfileScreen from './ProfileView';
import ScheduleScreen from'./EmploiTemps'

// Déclaration des données pour le graphique
const chartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43],
    },
  ],
};

const pieData = [
  { x: 'Garçons', y: 60 },
  { x: 'Filles', y: 40 },
];

const screenWidth = Dimensions.get("window").width;

const AdminProfileScreen = () => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const res = await axios.post(`${API_URL}/userdata`, { token });
        setUserData(res.data.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const MenuButton = ({ icon, text, onPress, style }) => (
    <TouchableOpacity style={[styles.menuButton, style]} onPress={onPress}>
      <MaterialCommunityIcons name={icon} size={60} color="black" />
      <Text style={styles.menuText}>{text}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
    <ScrollView contentContainerStyle={{flexGrow: 1}} keyboardShouldPersistTaps={'always'} style={styles.contain}>
      <TouchableOpacity onPress={() => navigation.navigate("Profil")}>
        <View style={styles.profileCard}>
          <Image source={require('../assets/admin.jpg')} style={styles.image} />
          <View style={styles.cardDetails}>
            <Text style={styles.userType}>{userData.userType} Ecole</Text>
            <Text style={styles.userName}>{userData.nom} {userData.prenom}</Text>
          </View>
        </View>
      </TouchableOpacity>
      <View>
        <ScrollView style={{ padding: 10, backgroundColor: '#E8F5E9' }}>
          <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 10, color: 'black' }}>Statistiques Clés</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
            <Card style={{ flex: 1, marginRight: 5 }}>
              <Card.Title title="Taux d'Absence" style={{color: 'black'}} />
              <Card.Content>
                <Text style={{ fontSize: 24, color: 'black' }}>10%</Text>
              </Card.Content>
            </Card>
            <Card style={{ flex: 1, marginLeft: 5 }}>
              <Card.Title title="Moyenne Générale" />
              <Card.Content>
                <Text style={{ fontSize: 24, color: 'black' }}>14.5</Text>
              </Card.Content>
            </Card>
          </View>
        </ScrollView>
      </View>
      <View style={{
        height: 700, 
        width: 400,
        borderTopLeftRadius: 7 ,
        borderTopRightRadius:10 , 
        marginVertical:-50,
      }}>
        <View style={styles.menuContainer}>
          <MenuButton
            icon="clipboard-text-clock"
            text="Gestion des Emplois du temps"
            onPress={() => navigation.navigate("Emploi du Temps")}
            style={{ marginRight: 10 }}
          />
          <MenuButton
            icon="account-group"
            text="Gestion des Utilisateurs"
            onPress={() => navigation.navigate("Gestion des Utilisateurs")}
          />
          <MenuButton
            icon="account-tie"
            text="Attribution des classes aux Professeurs"
            onPress={() => navigation.navigate("Espace Professeur")}
            style={{ marginRight: 10 }}
          />
          <MenuButton
            icon="account-tie"
            text="Attribution des classes aux Eleves"
            onPress={() => navigation.navigate("esl")}
          />
          <MenuButton
            icon="account-tie"
            text="Creer des Classes"
            onPress={() => navigation.navigate("esc")}
          />
          <MenuButton
            icon="message-processing"
            text="Communication avec Parent"
            onPress={() => {}}
          />
        </View>
      </View>
      
    </ScrollView>
    <View style={styles.tabNavContainer}>
        <TabNav />
      </View>
    </View>
  );
};

const Tab = createMaterialBottomTabNavigator();

const TabNav = () => {
  return (
    
      <Tab.Navigator
        activeColor="black"
        shifting={true}
        barStyle={{ backgroundColor: 'green' }}
      >
       
    <Tab.Screen 
          name="ProfileScreen" 
          component={ProfileScreen} 
          options={{
            tabBarLabel: 'Accueil',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="account" color={color} size={26} />
            ),
          }}
        />

        <Tab.Screen 
          name="Schedule" 
          component={ScheduleScreen} 
          options={{
            tabBarLabel: 'Emploi du Temps',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="calendar" color={color} size={26} />
            ),
          }}
        />
        
      </Tab.Navigator>
    
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#E8F5E9',
  },
  contain: {
    backgroundColor: '#E8F5E9',
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
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 20,
  },
  cardDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  userType: {
    fontSize: 16,
    color: '#777',
  },
  menuContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 50,
  },
  menuButton: {
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    padding: 20,
    width: '48%',
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  menuText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabNavContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: '#0163d2',
  },
});

export default AdminProfileScreen;
