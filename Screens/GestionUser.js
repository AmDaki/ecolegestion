

import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  Alert,
  TouchableOpacity,
  ScrollView,
  SectionList,
  
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { API_URL } from '@env'; // Import API_URL depuis le fichier .env

// Composant pour afficher chaque utilisateur
const UserCard = ({ data, onEdit, deleteUser }) => (
  <View style={styles.userCard}>
    <Image
      
        source={require('../assets/ges_user.jpg')}
    
      style={styles.userImage}
    />
    <View style={styles.userInfo}>
      <Text style={styles.userName}>{`${data.nom} ${data.prenom}`}</Text>
      <Text style={styles.userType}>{data.userType}</Text>
    </View>
    <View style={styles.actionIcons}>
      <TouchableOpacity onPress={onEdit} style={styles.iconButton}>
        <Icon name="account-edit" size={25} color="#4CAF50" />
      </TouchableOpacity>
      <TouchableOpacity onPress={deleteUser} style={styles.iconButton}>
        <Icon name="delete" size={25} color="#F44336" />
      </TouchableOpacity>
    </View>
  </View>
);

// Composant pour les sections de catégories
const CategorySection = ({ title, data, navigation }) => (
  <View style={styles.categoryContainer}>
    <Text style={styles.categoryTitle}>{title}</Text>
    <FlatList
      data={data}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <UserCard
          data={item}
          onEdit={() => navigation.navigate('EditUser', { userId: item._id })}
          onDelete={() => deleteUser(item)}
        />
      )}
      showsVerticalScrollIndicator={false}
    />
  </View>
);

function AdminScreen({ navigation }) {
  const [userData, setUserData] = useState({});
  const [allUserData, setAllUserData] = useState([]);
  const nav = useNavigation();

  const getAllData = async () => {
    try {
      const res = await axios.get(`${API_URL}/get-all-user`);
      console.log(res.data.data); // Vérifier les données renvoyées par l'API
      setAllUserData(res.data.data);
    } catch (error) {
     
    }
  };
  

  useEffect(() => {
    getData();
    getAllData();
  }, []);

  

  // Récupération des données de l'utilisateur connecté
  const getData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
  
    
  
      const res = await axios.post(`${API_URL}/userdata`, { token });
      setUserData(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Déconnexion de l'utilisateur
  const signOut = async () => {
    try {
      await AsyncStorage.multiRemove(['isLoggedIn', 'token', 'userType']);
      navigation.navigate('Login');
    } catch (error) {
      console.error('Erreur lors de la déconnexion :', error);
      Alert.alert('Erreur', 'Impossible de se déconnecter.');
    }
  };

  // Suppression d'un utilisateur
  const deleteUser = (data) => {
    Alert.alert(
      'Confirmation',
      `Voulez-vous vraiment supprimer ${data.nom} ${data.prenom} ?`,
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: async () => {
            try {
              const res = await axios.post(`${API_URL}/delete-user`, { id: data._id });
              if (res.data.status === 'Ok') {
                Alert.alert('Succès', 'Utilisateur supprimé avec succès.');
                getAllData();
              } else {
                Alert.alert('Erreur', 'Impossible de supprimer l\'utilisateur.');
              }
            } catch (error) {
              console.error('Erreur lors de la suppression de l’utilisateur :', error);
              Alert.alert('Erreur', 'Impossible de supprimer l\'utilisateur.');
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

   

 // Catégorisation des utilisateurs en fonction de leur type
const categorizedUsers = {
  Administrateurs: allUserData.filter((user) => user.userType === 'Admin'),
  Élèves: allUserData.filter((user) => user.userType === 'Eleve'),
  Professeurs: allUserData.filter((user) => user.userType === 'Professeur'),
  Parents: allUserData.filter((user) => user.userType === 'Parent'),
  
};


// Composant pour afficher chaque utilisateur avec un bouton de suppression et d'édition
const UserCard = ({ data, onEdit, deleteUser }) => (
  <View style={styles.userCard}>
    <Image source={require('../assets/ges_user.jpg')} style={styles.userImage} />
    <View style={styles.userInfo}>
      <Text style={styles.userName}>{`${data.nom} ${data.prenom}`}</Text>
      <Text style={styles.userType}>{data.userType}</Text>
    </View>
    <View style={styles.actionIcons}>
      <TouchableOpacity onPress={onEdit} style={styles.iconButton}>
        <Icon name="account-edit" size={25} color="#4CAF50" />
      </TouchableOpacity>
      <TouchableOpacity onPress={deleteUser} style={styles.iconButton}>
        <Icon name="delete" size={25} color="#F44336" />
      </TouchableOpacity>
    </View>
  </View>
);

return (
  <ScrollView style={styles.container}>
    {/* En-tête */}
    <TouchableOpacity onPress={() => navigation.navigate('Profil')} style={styles.headerCard}>
      <Image source={require('../assets/admin.jpg')} style={styles.headerImage} />
      <View style={styles.headerInfo}>
        <Text style={styles.headerUserType}>{userData.userType} School</Text>
        <Text style={styles.headerUserName}>{`${userData.nom} ${userData.prenom}`}</Text>
      </View>

     

    </TouchableOpacity>
  {/* Bouton pour ajouter un nouvel utilisateur */}
  <TouchableOpacity
    onPress={() => navigation.navigate('PR')}
    style={styles.addUserButton}
  >
    <Icon name="plus-circle" size={30} color="#4CAF50" />
    <Text style={styles.addUserText}>Ajouter un nouvel utilisateur</Text>
  </TouchableOpacity>
    {/* Liste des utilisateurs par catégorie */}
    {Object.keys(categorizedUsers).map((category) => (
      <View key={category}>
        <Text style={styles.categoryTitle}>{category}</Text>
        {categorizedUsers[category].map((user) => (
          <UserCard key={user.identifiant} data={user} onEdit={() => editUser(user)} deleteUser={() => deleteUser(user.identifiant)} />
        ))}
      </View>




    ))}
  </ScrollView>
);

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5E9',
    padding: 15,
  },
  headerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  headerImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  headerInfo: {
    flex: 1,
    marginLeft: 15,
  },
  headerUserName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  headerUserType: {
    fontSize: 14,
    color: '#777777',
    marginBottom: 5,
  },
  signOutButton: {
    padding: 5,
  },
  addUserButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  addUserText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  categoryContainer: {
    marginBottom: 30,
  },
  categoryTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 10,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
    backgroundColor: '#CFD8DC',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  userType: {
    fontSize: 14,
    color: '#777777',
    marginTop: 4,
  },
  actionIcons: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 10,
  },
});

export default AdminScreen;

