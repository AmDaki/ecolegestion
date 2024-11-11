// import { View, Text, TouchableOpacity, ImageBackground, StyleSheet,Image,FlatList, ScrollView } from 'react-native'
// import React from 'react'
// import { useState,useEffect } from 'react';
// import axios from 'axios';
// import Backgroundall from './Background_AllScreen'
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import {Button} from 'react-native-paper';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation } from '@react-navigation/native';

// const AdminProfileScreen = () => {
  
//   const [userData, setUserData] = useState('');
//   const [allUserData, setAllUserData] = useState('');
//   const navigation= useNavigation();

//   async function getAllData() {
//     axios.get('http://192.168.1.69:5000/get-all-user').then(res => {
//       console.log(res.data);

//       setAllUserData(res.data.data);
//     });
//   }

//   async function getData() {
//     const token = await AsyncStorage.getItem('token');
//     console.log(token);
//     axios
//       .post('http://192.168.1.69:5000/userdata', {token: token})
//       .then(res => {
//         console.log(res.data);
//         setUserData(res.data.data);
//       });
//   }
//   useEffect(() => {
//     getData();
//     getAllData();
//   }, []);
//   function signOut() {
//     AsyncStorage.setItem('isLoggedIn', '');
//     AsyncStorage.setItem('token', '');
//     AsyncStorage.setItem('userType', '');
//     navigation.navigate('Login');
//   }

//   function deleteUser(data) {
//     axios
//       .post('http://192.168.1.69:5000/delete-user', {id: data._id})
//       .then(res => {
//         console.log(res.data);
//         if(res.data.status=="Ok"){
//           Alert.alert("User deleted");
//           getAllData();
//         }
//       });
//   }
//   const UserCard = ({data}) => (
//     <View style={styles.card}>
//       {/* <Image
//         source={{
//           uri:
//             data.image == '' || data.image == null
//               ? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAAM1BMVEXFzeD////Byt7L0uPByd7Q1+b7/P3j5/Dv8fbe4+3r7vTFzuDL0+P19/rn6/LZ3urW2+lU+LHUAAAFLklEQVR4nO2dC3arMAxEQXwCcfjsf7XPkLw2tEka5AEziu8CeuKpJVmyLLIskUgkEkdFbsT+HXEQKbNqOPWN59y72D9nd/z/vWqbOv/mozSY9n116vIl1acYg1++G9v+5/rzvMs+QwL/7x/O9a/lT5zL2D9uF7wAzcP1e+pP2AQi4/mZAJ6TfQ3EtY9N4D+jdQ2k6F8K4OltayDFKyP4cghmI6PzVvDnHrDuEqR9UwFPY1IEufw+C72yh8LeIUFOaxSY6K0dFt2qTXDDVJCUi0IBT2vHHmTUSWAnPjgZtBJ4p2BjJ4RIYCSHlCpEAi+CAXMowiSwIIJoguKSE7k5rD8aPWDg3gnKg8EPLrGXEUL5tGC2ijr2OkIIjAlfEJdVBLMNcmprQEnAW09YUzT5C9aNADgbfMGaPQlOgrwj1cAlDZIGGVYD2ktIpAasiRNQgzxpkOektoCMjUkDT+zFaEFqwNqohtSgiL0YHcHlVAMaoCooM6SJo/qK7RGk+yBpkGVBl2w2NAi7aEwamNEAWE5MGiQNkgZJg6RB0sCEBoj+C3YN0j5IGkyks3LKnSegdaSkQdIgaUCtwcf7RJHy02OjVG3/+knvSlxJd+uK7Emb6eqOrQVBoJvgCtu16xYasF23QXsPWDVI+yArN9CALTyW6LhAqAE8NuaEcQH2fOMbtkNS+e7IC8MaYIuJM3TnRGwxcYbvPQ+0eDBD95TFIRv3rwyx17Qa/EGRbmqSAz1xvSP2ktaDvW3MOV9xoJ0i43tftEPgc4n4U1Ls9ajAbgTOkSCh02AW1GxJ4w2gCKwSIAspF0pLmIB5BNaXvhnwnMSXMn6DqrBzBoUrqKoiXdp8B6qqWMVeSADyzijhNyDeBiinyOwSUc95uAemYZ66sl0wLYGcFPmK6gsgCTRzZJxAlJe5TQFyQiA3hQxRVuSOChPBXrEW2trBf/RDts1sg+C8iXZA1oKwc9IY++dDCDojUKcKd5T67JF6ou4C9SHBhjO4os2hiWupv1Hm0JY00LpFKx5xQmsLpjRQdisy19R/om3MsaSB9rxsSgOdBKY00E5SZOxBeoa2kGJJA+01gyEN1JmjJQ20jxnYq+p3qPNGQxqo66qtHQ3UfUlJA0MalKJ+8NnyPfh/hFzOnbpFr6vP7JeNGaALw0BJMfzemT4+IhqSYq8hFESDInNj3ky4BPSXroieLPZDAuI7nuROsUS84iAvqKmT5gWxVxEIQgJuY8BsA+6NgPmyMXVkQHXuM+cMuBEIjO98Z4K78r5pOFtVpWiRn7Qd+aop5QU9AqJuMyYVRKoNJkT58OD/cuy1vYUX4LTBvLgrzVAcXwYpthPgSjcc2ybkgjoRvKQvjqrCVl7gEU11RJMQGTeYFvicbjyaCnsrMFG3R1JBsnZjR/hEhf4gJiHi0NOg1nCOL8OejvAJ3RBTBScy7O4GHlCfXCwV4hrBkvMlQmYpZXQjWLJ7sJTyEEawZNfMsowUC/+m38kxiNtgbDCMZgfHIMUuaVEA3cYnBnx5aAu8e9xMASkYFJjoNpo/K+7oVnBPg68xuKw8zoHoPXp0pCzHg0bDV0CTa3EsjmBJjUunsB9u35Ua08wkGecmuIEIEVIReoIFwTf38JHhEQgcxuqOlx4qCBFBCnY7uKH/uhV0SHRU9CNFUO1EB0A9TMKIIczoggP+QxpRUQ0cM+MMrmiezG7x0bmoKDYCZhLqgVjf8WvhfLhkfaPnFt/di8zq6XNbfIczMqsHDW3xTdrYPFvrP7kiUsVMV4ODAAAAAElFTkSuQmCC'
//               : data.image,
//         }}
//         style={styles.image}
//       /> */}
//       <View style={styles.cardDetails}>
//         <Text style={styles.name}>{data.nom}</Text>
//         <Text style={styles.email}>{data.prenom}</Text>
//         <Text style={styles.userType}>{data.userType}</Text>
//       </View>
//       <View>
//         <Icon
//           name="delete"
//           size={30}
//           color="black"
//           onPress={() => deleteUser(data)}
//         />
//       </View>
//     </View>
//   );


//   return (
//  <Backgroundall > 
//  <TouchableOpacity onPress={()=>navigation.navigate("Profil")}>

//  <View style={styles.card}>
//  <Image
//         source={require('../assets/iconschool.png')}
//         style={styles.image}
//       /> 
      
//         <View style={styles.cardDetails}>
//         <Text style={styles.userType}>{userData.userType} School</Text>
//           <Text style={styles.userName}>{userData.nom} {userData.prenom}</Text>
//           {/* <Text style={styles.userType}>Total User: {allUserData.length}</Text> */}
//         </View>
//         <FlatList
//           data={userData}
//           showsVerticalScrollIndicator={false}
//           keyExtractor={item => item._id}
//           renderItem={({item}) => <UserCard data={item} />}
//         />
//       </View>

//  </TouchableOpacity>


//       {/* <View style={{
//       backgroundColor: "white",
     
//       borderTopRightRadius: 10,
//       alignItems: 'center',
//       width: 180,
//       paddingVertical: 10,
//       marginVertical: 60,
//     marginRight: 100,
//         }}>
//             <Text style={{color:"black", fontSize: 15, fontWeight: 'bold'}}>
//                 Tableau de Bord    
//              </Text>
//         </View>  */}
//       {/* <View style={{
//       backgroundColor: "black",
//        height: 200, 
//        width: 400,
//        borderTopLeftRadius: 100 ,
//        borderTopRightRadius: 100 , 
//        marginVertical:100,
//        marginTop:-10
//         }}></View> */}

// <ScrollView>
//      <View style={{
//       backgroundColor: "orange",
//        height: 700, 
//        width: 400,
//        borderTopLeftRadius: 7 ,
//        borderTopRightRadius:10 , 
//        marginVertical:15,
             
//          }}>
             
//     <TouchableOpacity 
   
//    style={{
//        backgroundColor: "white",
//        borderRadius:10,
//        alignItems: 'center',
//        width: 150,
      
//        paddingVertical: 35,
//        marginVertical: 20,
//       marginLeft:220,
      
//    }}>
//      <MaterialCommunityIcons name="clipboard-text-clock" color="black" size={60} />
//        <Text style={{color: "black", fontSize: 12, fontWeight: 'bold'}}>
//        Gestion des Emplois du temps
//         </Text>  
      
//    </TouchableOpacity>

//    <TouchableOpacity 
   
//    style={{
//        backgroundColor: "white",
//        borderRadius: 10,
//        alignItems: 'center',
//        width: 150,
//        paddingVertical: 35,
//        marginVertical: 20,
//      marginLeft:20,
//      marginTop: -180
      
//    }} onPress={()=>navigation.navigate("AdminScreen")} >
//     <MaterialCommunityIcons name="account-group" size={60} color="black" />
//       <Text style={{color: "black", fontSize: 12, fontWeight: 'bold'}}>
//        Gestion des Utilisateurs
//         </Text> 
      
//    </TouchableOpacity>
//    <TouchableOpacity 
   
//    style={{
//        backgroundColor: "white",
//        borderRadius: 10,
//        alignItems: 'center',
//        width: 150,
//        paddingVertical: 35,
//        marginVertical: 20,
//      marginLeft:20,
      
//    }}>
//       <MaterialCommunityIcons name="account-tie" color="black" size={60} />
     
//       <Text style={{color: "black", fontSize: 12, fontWeight: 'bold'}}>
//        Espace Enseignant
//         </Text> 
      
//    </TouchableOpacity>

//    <TouchableOpacity 
   
//    style={{
//        backgroundColor: "white",
//        borderRadius: 10,
//        alignItems: 'center',
//        width: 150,
//        paddingVertical: 35,
//        marginVertical: 20,
//      marginLeft:220,
//      marginTop: -170
      
//    }} onPress={''}>
//       <MaterialCommunityIcons name="message-processing" color="black" size={60} />
//       <Text style={{color: "black", fontSize: 12, fontWeight: 'bold'}}>
//        Communinication avec Parent
//         </Text> 
      
//    </TouchableOpacity>
//         </View>  
//         </ScrollView>
    
   
//   </Backgroundall>
//   )
// }


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#f5f5f5',
//   },
//   userInfo: {
//     marginBottom: 20,
//   },
//   userName: {
//     fontSize: 15,
//     fontWeight: 'bold',
//     color: '#333333',
//     marginBottom: 5,
//   },
//   userType: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: 'black',
//   },
//   card: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#ffffff',
//     padding: 15,
//     borderRadius: 10,
//     marginBottom: 30,
//     shadowColor: '#000',
//     marginTop:25,
    
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   image: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     marginRight: 10,
//   },
//   cardDetails: {
//     flex: 1,
//   },
//   name: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333333',
//     marginBottom: 5,
//   },
//   email: {
//     fontSize: 14,
//     color: '#777777',
//   },
// });


// export default AdminProfileScreen
import { NetworkInfo } from 'react-native-network-info';
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import { ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import Backgroundall from './Background_AllScreen';
import { Dimensions } from 'react-native';
import { Card } from 'react-native-paper';
import { LineChart,BarChart } from 'react-native-chart-kit';
import { VictoryPie } from 'victory-native';
import { API_URL } from '@env';

const API_PORT = '5000';

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

const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

const AdminProfileScreen = () => {
  const [userData, setUserData] = useState({});
  const [allUserData, setAllUserData] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    getData();
    getAllData();
  }, []);

  async function getAllData() {
    try {
      const res = await axios.post(`${API_URL}/get-all-user`);
  
      setAllUserData(res.data.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function getData() {
    try {
      const token = await AsyncStorage.getItem('token');
  
      // Récupère l'IP locale automatiquement
      const localIP = await NetworkInfo.getIPAddress();
  
      // Formate l'URL dynamique de l'API avec l'IP récupérée
      const apiUrl = `http://${localIP}:${API_PORT}/userdata`;
  
      const res = await axios.post(apiUrl, { token });
      setUserData(res.data.data);
    } catch (error) {
      console.error(error);
    }
  }

  function signOut() {
    AsyncStorage.multiRemove(['isLoggedIn', 'token', 'userType'], () => navigation.navigate('Login'));
  }

  function deleteUser(data) {
    axios.post('http://192.168.1.69:5000/delete-user', { id: data._id }).then(res => {
      if (res.data.status === 'Ok') {
        alert('User deleted');
        getAllData();
      }
    });
  }

  const UserCard = ({ data }) => (
    <View style={styles.card}>
      <View style={styles.cardDetails}>
        <Text style={styles.name}>{data.nom}</Text>
        <Text style={styles.email}>{data.prenom}</Text>
        <Text style={styles.userType}>{data.userType}</Text>
      </View>
      <TouchableOpacity onPress={() => deleteUser(data)}>
        <MaterialCommunityIcons name="delete" size={30} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    
      <ScrollView  contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps={'always'}>
          
      <TouchableOpacity onPress={() => navigation.navigate("Profil")}>
        <View style={styles.profileCard}>
          <Image source={require('../assets/iconschool.png')} style={styles.image} />
          <View style={styles.cardDetails}>
            <Text style={styles.userType}>{userData.userType} School</Text>
            <Text style={styles.userName}>{userData.nom} {userData.prenom}</Text>
          </View>
        </View>
      </TouchableOpacity>
      <View >
      {/* <Card style={styles.cardBox}>
   
    <Card.Content>
      <Text variant="titleLarge">statistiques globales</Text>
      <Text variant="bodyMedium">Card content</Text>
    </Card.Content>
    <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
    <Card.Actions>
      <Button>Cancel</Button>
      <Button>Ok</Button>
    </Card.Actions>
  </Card> */}
   <ScrollView style={{ padding: 10, backgroundColor: '#f5f5f5' }}>
      
      {/* Section Cartes */}
      <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 10,color: 'black' }}>Statistiques Clés</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
        <Card style={{ flex: 1, marginRight: 5 }}>
          <Card.Title title="Taux d'Absence" style={{color: 'black'}} />
          <Card.Content>
            <Text style={{ fontSize: 24 ,color: 'black' }}>5%</Text>
          </Card.Content>
        </Card>
        <Card style={{ flex: 1, marginLeft: 5 }}>
          <Card.Title title="Moyenne Générale" />
          <Card.Content>
            <Text style={{ fontSize: 24,color: 'black' }}>14.5</Text>
          </Card.Content>
        </Card>
      </View>

      {/* Ligne de Performance */}
      {/* <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 10,color: 'black' }}>Évolution des Absences</Text>
      <LineChart
        data={chartData}
        width={screenWidth - 20}
        height={220}
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 2, // places after decimal
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      /> */}

      {/* Histogramme */}
      {/* <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 10,color: 'black' }}>Absences par Mois</Text>
      <BarChart
        data={chartData}
        width={screenWidth - 20}
        height={220}
        chartConfig={{
          backgroundColor: '#1cc910',
          backgroundGradientFrom: '#eff3ff',
          backgroundGradientTo: '#efefef',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      /> */}

      {/* Diagramme Circulaire */}
      {/* <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 10,color: 'black' }}>Répartition Garçons/Filles</Text>
      <VictoryPie
        data={pieData}
        colorScale={['tomato', 'orange']}
        height={200}
        innerRadius={50}
        padAngle={5}
        labels={({ datum }) => `${datum.x}: ${datum.y}%`}
        style={{
          labels: { fill: 'black', fontSize: 16, fontWeight: 'bold' },
        }}
      /> */}
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
            onPress={() => {}}
            style={{ marginRight: 10 }}
          />
          <MenuButton
            icon="account-group"
            text="Gestion des Utilisateurs"
            onPress={() => navigation.navigate("AdminScreen")}
          />
          <MenuButton
            icon="account-tie"
            text="Attribution des classes aux Professeurs"
            onPress={() => navigation.navigate("es")}
            style={{ marginRight: 10 }}
          />
            <MenuButton
            icon="account-tie"
            text="Attribution des classes aux Eleves"
            onPress={() => navigation.navigate("esl")}
            style={{  }}
          />
           <MenuButton
            icon="account-tie"
            text="Creer des Classes"
            onPress={() => navigation.navigate("esc")}
            style={{  }}
          />
          <MenuButton
            icon="message-processing"
            text="Communication avec Parent"
            onPress={() => {}}
            style={{ }}
          />
        </View>
        </View>
      </ScrollView>
      
   
  );
};

const MenuButton = ({ icon, text, onPress, style }) => (
  <TouchableOpacity style={[styles.menuButton, style]} onPress={onPress}>
    <MaterialCommunityIcons name={icon} size={60} color="black" />
    <Text style={styles.menuText}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
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
    marginTop:50
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
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 14,
    color: '#666',
  },
  container:{
    flex:1,
    backgroundColor:'#fff',
    alignItems:'center',
    justifyContent: 'center',
  },
  cardBox:{
    margin:10
  },
  img:{
    padding:10
  }
});

export default AdminProfileScreen;
