// import React, { useState, useEffect } from 'react';

// import { View, ScrollView, Text, StyleSheet, TouchableOpacity, Animated, Image } from 'react-native';

// import { useNavigation } from '@react-navigation/native';

// import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

// import axios from 'axios';

// import AsyncStorage from '@react-native-async-storage/async-storage';

// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import { API_URL } from '@env';

// const EleveAccueilScreen = () => {
//   const navigation = useNavigation();
//   const [fadeAnim] = useState(new Animated.Value(0)); // Animation pour effet de fondu
//   const [userData, setUserData] = useState({});

//   useEffect(() => {
//     getData();
//     // Animation pour effet de fondu
//     Animated.timing(fadeAnim, {
//       toValue: 1,
//       duration: 500,
//       useNativeDriver: true,
//     }).start();
//   }, []);

//   async function getData() {
//     try {
//       const token = await AsyncStorage.getItem('token');
//       const res = await axios.post(`${API_URL}/userdata`, { token });
//       setUserData(res.data.data);
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   return (
//     <ScrollView style={styles.container}>
//        <View style={styles.header}>
//         <Text style={styles.headerText}>Bienvenue !!!</Text>
//         <FontAwesome name="user-circle" size={50} color="#fff" />
//       </View>
//       <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
     

//         <TouchableOpacity onPress={() => navigation.navigate("Profil")}>
//           <View style={styles.profileCard}>
//             <Image source={require('../assets/student.jpg')} style={styles.image} />
//             <View style={styles.cardDetails}>
//               <Text style={styles.userType}>{userData.userType}</Text>
//               <Text style={styles.userName}>{userData.nom} {userData.prenom}</Text>
//             </View>
//           </View>
//         </TouchableOpacity>

//         {/* Cards Section */}
//         <View style={styles.cardsContainer}>
//           {renderCard("Mes Classes", "Voir les classes auxquelles vous êtes inscrit.", "school", 'ClassesScreen')}
//           {renderCard("Mes Notes", "Consultez vos notes de chaque matière.", "file-document-outline", 'NotesScreen')}
//           {renderCard("Emploi du Temps", "Consultez votre emploi du temps de la semaine.", "calendar", 'EmploiDuTempsScreen')}
//           {renderCard("Messages", "Envoyez et recevez des messages.", "email", 'MessagesScreen')}
//         </View>
//       </Animated.View>
//     </ScrollView>
//   );

//   function renderCard(title, description, icon, navigateTo) {
//     return (
//       <Card style={styles.card} key={title}>
//         <Card.Content>
//           <Title style={styles.cardTitle}>{title}</Title>
//           <Paragraph>{description}</Paragraph>
//         </Card.Content>
//         <Card.Actions>
//           <Button
//             mode="contained"
//             icon={icon}
//             onPress={() => navigation.navigate(navigateTo)}
//             style={styles.actionButton}
//           >
//             {title}
//           </Button>
//         </Card.Actions>
//       </Card>
//     );
//   }
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#E8F5E9',
//     padding: 16,
//   },
//   content: {
//     flex: 1,
//   },
//   // header: {
//   //   fontSize: 24,
//   //   fontWeight: 'bold',
//   //   marginBottom: 16,
//   //   color: '#333',
//   // },
//   header: {
//     backgroundColor: '#3E4A89',
//     padding: 20,
//     width: '100%',
//     alignItems: 'center',
//     borderRadius: 10,
//     marginBottom: 20,
//   },
//   headerText: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#fff',
//   },
//   profileCard: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     padding: 16,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.2,
//     shadowRadius: 8,
//     elevation: 2,
//     marginBottom: 16,
//   },
//   image: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     marginRight: 16,
//   },
//   cardDetails: {
//     flex: 1,
//   },
//   userType: {
//     fontSize: 14,
//     color: '#888',
//   },
//   userName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   cardsContainer: {
//     marginTop: 16,
//   },
//   card: {
//     marginBottom: 16,
//     borderRadius: 8,
//     elevation: 3, // Ombre pour donner de la profondeur
//   },
//   cardTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   actionButton: {
//     marginTop: 8,
//     borderRadius: 20,
//   },
// });

// export default EleveAccueilScreen;

import { View, Text, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { styles } from './Style/HomeStyle'
import { notificationImg, UserProfile, AddTaskImg } from '../../theme/Images'


const tasks = [
  { id: 1, taskName: 'Lundi', taskDetails: 'Voir Plus',  },
  { id: 2, taskName: 'Task 2', taskDetails: 'Details of Task 2', taskStatus: 'Pending' },
  { id: 3, taskName: 'Task 3', taskDetails: 'Details of Task 3', taskStatus: 'Pending' },
  { id: 4, taskName: 'Task 4', taskDetails: 'Details of Task 4', taskStatus: 'Pending' },
  { id: 5, taskName: 'Task 5', taskDetails: 'Details of Task 5', taskStatus: 'Pending' },
];

const TaskItem = ({ taskName, taskDetails, taskStatus }) => (
  <View style={styles.taskContainer}>
    <Text style={styles.taskName}>{taskName}</Text>
    <Text style={styles.taskDetails}>{taskDetails}</Text>
    <Text>Status : {taskStatus}</Text>
  </View>
);

const tasksCustom = [
  { id: 1, taskName: 'Task 1', taskDetails: 'Details of Task 1', myStatus: 'Pending' },
  { id: 2, taskName: 'Task 2', taskDetails: 'Details of Task 2', myStatus: 'Pending' },
  { id: 3, taskName: 'Task 3', taskDetails: 'Details of Task 3', myStatus: 'Pending' },
  { id: 4, taskName: 'Task 4', taskDetails: 'Details of Task 4', myStatus: 'In Progress' },
  { id: 5, taskName: 'Task 5', taskDetails: 'Details of Task 5', myStatus: 'In Progress' },
  { id: 6, taskName: 'Task 6', taskDetails: 'Details of Task 6', myStatus: 'In Progress' },
  { id: 7, taskName: 'Task 7', taskDetails: 'Details of Task 7', myStatus: 'Done' },
  { id: 8, taskName: 'Task 8', taskDetails: 'Details of Task 8', myStatus: 'Done' },
  { id: 9, taskName: 'Task 9', taskDetails: 'Details of Task 9', myStatus: 'Done' },
  { id: 10, taskName: 'Task 9', taskDetails: 'Details of Task 9', myStatus: 'Done' },
  { id: 11, taskName: 'Task 9', taskDetails: 'Details of Task 9', myStatus: 'Done' },
];
const CustomTaskItem = ({ taskName, taskDetails, myStatus }) => {
  let statusColor;

  switch (myStatus) {
    case 'Pending':
      statusColor = 'red';
      break;
    case 'In Progress':
      statusColor = 'yellow';
      break;
    case 'Done':
      statusColor = 'green';
      break;
    default:
      statusColor = 'gray';
      break;
  }
  return (
    <View style={styles.taskContainer}>
      <View style={styles.statusCircle}>
        <Text style={styles.taskName}>{taskName}</Text>
        <View style={[styles.pendingTask, { backgroundColor: statusColor }]}></View>
      </View>
      <View style={styles.statusDetails}>
        <Text style={styles.taskDetails}>{taskDetails}</Text>
        <Text style={styles.taskDetails}>{myStatus}</Text>
      </View>
    </View>
  );
};

export default function EleveAccueilScreen({ navigation }) {
  const [filteredTasks, setFilteredTasks] = useState(tasksCustom);
  const [activeTab, setActiveTab] = useState('All');
  const filterTasks = (myStatus) => {
    let filtered;
    if (myStatus === 'All') {
      filtered = tasksCustom;
    } else {
      filtered = tasksCustom.filter(task => task.myStatus === myStatus);
    }
    setFilteredTasks(filtered);
    setActiveTab(myStatus);
  };

  const goToTask = () => {
    navigation.navigate('AddTask')
  }
  return (
    <View style={styles.homeContainer}>
      <View style={styles.homeView}>
        <View style={styles.profileView}>
          <View>
            <Image source={UserProfile} style={styles.userProfileImg} />
          </View>
          <View style={styles.details}>
          <Text style={styles.userType}>{userData.userType}</Text>
           <Text style={styles.userName}>{userData.nom} {userData.prenom}</Text>
          </View>
        </View>
        <TouchableOpacity>
          <Image source={notificationImg} style={styles.notiImg} />
        </TouchableOpacity>
      </View>

      <View style={styles.taskSummaryView}>
        <View style={styles.taskSummaryCard}>
          <Text style={styles.taskText}>Today Task Summary</Text>
          <View style={styles.addView}>
            <View>
              <Text>Progress <Text style={styles.percentageText}>85%</Text> </Text>
            </View>
            <TouchableOpacity onPress={goToTask}>
              <Image source={AddTaskImg} style={styles.addTaskImg} />
            </TouchableOpacity>
          </View>
        </View>
      </View>


      <ScrollView>
        <View style={styles.upComings}>
          <Text style={styles.upcoingText}>Emploi Du Temps</Text>
          <FlatList
            data={tasks}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TaskItem taskName={item.taskName} taskDetails={item.taskDetails} taskStatus={item.taskStatus} />
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
        <View style={styles.taskListView}>
          <Text style={styles.upcoingText}>My Task List</Text>
          <View style={styles.filterContainer}>
            <TouchableOpacity onPress={() => filterTasks('All')} style={[styles.filterButton, activeTab === 'All' && styles.activeFilterButton]}>
              <Text style={[styles.filterText, activeTab === 'All' && styles.activeFilterText]}>All</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => filterTasks('Pending')} style={[styles.filterButton, activeTab === 'Pending' && styles.activeFilterButton]}>
              <Text style={[styles.filterText, activeTab === 'Pending' && styles.activeFilterText]}>Pending</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => filterTasks('In Progress')} style={[styles.filterButton, activeTab === 'In Progress' && styles.activeFilterButton]}>
              <Text style={[styles.filterText, activeTab === 'In Progress' && styles.activeFilterText]}>In Progress</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => filterTasks('Done')} style={[styles.filterButton, activeTab === 'Done' && styles.activeFilterButton]}>
              <Text style={[styles.filterText, activeTab === 'Done' && styles.activeFilterText]}>Done</Text>
            </TouchableOpacity>
          </View>
          {filteredTasks.map((item) => (
            <CustomTaskItem key={item.id} taskName={item.taskName} taskDetails={item.taskDetails} myStatus={item.myStatus} />
          ))}
        </View>
      </ScrollView>
    </View>
  )
}