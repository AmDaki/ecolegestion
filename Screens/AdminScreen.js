

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

// Composant pour afficher chaque utilisateur
const UserCard = ({ data, onEdit, onDelete }) => (
  <View style={styles.userCard}>
    <Image
      source={{
        uri:
          data.image === '' || data.image === null
            ? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAAM1BMVEXFzeDByt7L0uPByd7Q1+b7/P3j5/Dv8fbe4+3r7vTFzuDL0+P19/rn6/LZ3urW2+lU+LHUAAAFLklEQVR4nO2dC3arMAxEQXwCcfjsf7XPkLw2tEka5AEziu8CeuKpJVmyLLIskUgkEkdFbsT+HXEQKbNqOPWN59y72D9nd/z/vWqbOv/mozSY9n116vIl1acYg1++G9v+5/rzvMs+QwL/7x/O9a/lT5zL2D9uF7wAzcP1e+pP2AQi4/mZAJ6TfQ3EtY9N4D+jdQ2k6F8K4OltayDFKyP4cghmI6PzVvDnHrDuEqR9UwFPY1IEufw+C72yh8LeIUFOaxSY6K0dFt2qTXDDVJCUi0IBT2vHHmTUSWAnPjgZtBJ4p2BjJ4RIYCSHlCpEAi+CAXMowiSwIIJoguKSE7k5rD8aPWDg3gnKg8EPLrGXEUL5tGC2ijr2OkIIjAlfEJdVBLMNcmprQEnAW09YUzT5C9aNADgbfMGaPQlOgrwj1cAlDZIGGVYD2ktIpAasiRNQgzxpkOektoCMjUkDT+zFaEFqwNqohtSgiL0YHcHlVAMaoCooM6SJo/qK7RGk+yBpkGVBl2w2NAi7aEwamNEAWE5MGiQNkgZJg6RB0sCEBoj+C3YN0j5IGkyks3LKnSegdaSkQdIgaUCtwcf7RJHy02OjVG3/+knvSlxJd+uK7Emb6eqOrQVBoJvgCtu16xYasF23QXsPWDVI+yArN9CALTyW6LhAqAE8NuaEcQH2fOMbtkNS+e7IC8MaYIuJM3TnRGwxcYbvPQ+0eDBD95TFIRv3rwyx17Qa/EGRbmqSAz1xvSP2ktaDvW3MOV9xoJ0i43tftEPgc4n4U1Ls9ajAbgTOkSCh02AW1GxJ4w2gCKwSIAspF0pLmIB5BNaXvhnwnMSXMn6DqrBzBoUrqKoiXdp8B6qqWMVeSADyzijhNyDeBiinyOwSUc95uAemYZ66sl0wLYGcFPmK6gsgCTRzZJxAlJe5TQFyQiA3hQxRVuSOChPBXrEW2trBf/RDts1sg+C8iXZA1oKwc9IY++dDCDojUKcKd5T67JF6ou4C9SHBhjO4os2hiWupv1Hm0JY00LpFKx5xQmsLpjRQdisy19R/om3MsaSB9rxsSgOdBKY00E5SZOxBeoa2kGJJA+01gyEN1JmjJQ20jxnYq+p3qPNGQxqo66qtHQ3UfUlJA0MalKJ+8NnyPfh/hFzOnbpFr6vP7JeNGaALw0BJMfzemT4+IhqSYq8hFESDInNj3ky4BPSXroieLPZDAuI7nuROsUS84iAvqKmT5gWxVxEIQgJuY8BsA+6NgPmyMXVkQHXuM+cMuBEIjO98Z4K78r5pOFtVpWiRn7Qd+aop5QU9AqJuMyYVRKoNJkT58OD/cuy1vYUX4LTBvLgrzVAcXwYpthPgSjcc2ybkgjoRvKQvjqrCVl7gEU11RJMQGTeYFvicbjyaCnsrMFG3R1JBsnZjR/hEhf4gJiHi0NOg1nCOL8OejvAJ3RBTBScy7O4GHlCfXCwV4hrBkvMlQmYpZXQjWLJ7sJTyEEawZNfMsowUC/+m38kxiNtgbDCMZgfHIMUuaVEA3cYnBnx5aAu8e9xMASkYFJjoNpo/K+7oVnBPg68xuKw8zoHoPXp0pCzHg0bDV0CTa3EsjmBJjUunsB9u35Ua08wkGecmuIEIEVIReoIFwTf38JHhEQgcxuqOlx4qCBFBCnY7uKH/uhV0SHRU9CNFUO1EB0A9TMKIIczoggP+QxpRUQ0cM+MMrmiezG7x0bmoKDYCZhLqgVjf8WvhfLhkfaPnFt/di8zq6XNbfIczMqsHDW3xTdrYPFvrP7kiUsVMV4ODAAAAAElFTkSuQmCC'
            : data.image,
      }}
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
      <TouchableOpacity onPress={onDelete} style={styles.iconButton}>
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
      const res = await axios.get('http://192.168.1.69:5000/get-all-user');
      console.log(res.data.data); // Vérifier les données renvoyées par l'API
      setAllUserData(res.data.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs :', error);
      Alert.alert('Erreur', 'Impossible de récupérer les utilisateurs.');
    }
  };
  

  useEffect(() => {
    getData();
    getAllData();
  }, []);

  // Récupération de toutes les données des utilisateurs
  // const getAllData = async () => {
  //   try {
  //     const res = await axios.get('http://192.168.1.69:5000/get-all-user');
  //     setAllUserData(res.data.data);
  //   } catch (error) {
  //     console.error('Erreur lors de la récupération des utilisateurs :', error);
  //     Alert.alert('Erreur', 'Impossible de récupérer les utilisateurs.');
  //   }
  // };

  // Récupération des données de l'utilisateur connecté
  const getData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await axios.post('http://192.168.1.69:5000/userdata', { token });
      setUserData(res.data.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des données utilisateur :', error);
      Alert.alert('Erreur', 'Impossible de récupérer vos informations.');
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
              const res = await axios.post('http://192.168.1.69:5000/delete-user', { id: data._id });
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

  return (
    <ScrollView style={styles.container}>
      {/* En-tête avec les informations de l'utilisateur connecté */}
      <TouchableOpacity onPress={() => navigation.navigate('Profil')} style={styles.headerCard}>
        <Image source={require('../assets/iconschool.png')} style={styles.headerImage} />
        <View style={styles.headerInfo}>
          <Text style={styles.headerUserType}>{userData.userType} School</Text>
          <Text style={styles.headerUserName}>{`${userData.nom} ${userData.prenom}`}</Text>
        </View>
        <TouchableOpacity onPress={signOut} style={styles.signOutButton}>
          <Icon name="logout" size={25} color="#F44336" />
        </TouchableOpacity>
      </TouchableOpacity>

      {/* Bouton pour ajouter un nouvel utilisateur */}
      <TouchableOpacity
        onPress={() => navigation.navigate('PR')}
        style={styles.addUserButton}
      >
        <Icon name="plus-circle" size={30} color="#4CAF50" />
        <Text style={styles.addUserText}>Ajouter un nouvel utilisateur</Text>
      </TouchableOpacity>

      {/* Sections de catégories d'utilisateurs */}
      {Object.keys(categorizedUsers).map((category) =>
        categorizedUsers[category].length > 0 ? (
          <CategorySection
            key={category}
            title={category}
            data={categorizedUsers[category]}
            navigation={navigation}
          />
        ) : null
      )}
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

