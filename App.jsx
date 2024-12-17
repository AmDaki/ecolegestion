
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import AdminProfileScreen from './Screens/AdminScreen';

import SelectClassScreen from './Screens/SelectClassScreen';
import UploadNotesScreen from './Screens/UploadNoteScreen';
import MyNotesScreen from './Screens/MyNotesScreen';


import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from './Screens/DrawerContent';
import EleveScreen from './Screens/EleveScreen';
import AdminScreen from './Screens/GestionUser';

import Login2Screen from './Screens/Login2Screen';
import Register2Screen from './Screens/Register2Screen';

import AssignStudentsToClassScreen from './Screens/AjoutEleve';
import TeacherAssignmentScreen from './Screens/EspaceE';
import ProfesseurScreen from './Screens/ProfesseurScreen';
import AssignAbsencesScreen from './Screens/absence';
import CreateClassScreen from './Screens/ajoutclasse';
import ManageAbsencesScreen from './Screens/absence';
import ParentHomeScreen from './Screens/ParentScreen';
import HomeScreen from './Screens/ProfileView';
import EditUserScreen from './Screens/EditUserScreen';
import ScheduleScreen from './Screens/EmploiTemps';
import AssignClassScreen from './Screens/AjoutEleve';

import ClassesScreen from './Screens/ProfClasses';
import NotesScreen from './Screens/InserNotes';



import ImportFileScreen from './Screens/ImportFileScreen';
import NotesListScreen from './Screens/NotrlistScreen';

// const StackNav = () => {
//   const Stack = createNativeStackNavigator();
//   const navigation = useNavigation();
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         statusBarColor: '#0163d2',
//         headerShown: false,
//         headerStyle: {
//           backgroundColor: '#0163d2',
//         },
//         headerTintColor: '#fff',
//         headerTitleAlign: 'center',
//       }}>
//       <Stack.Screen
//         name="Home"
//         component={HomeScreen}
//         options={
//           {
//             // headerLeft: () => {
//             //   return (
//             //     <Icon
//             //       name="menu"
//             //       onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
//             //       size={30}
//             //       color="#fff"
//             //     />
//             //   );
//             // },
//           }
//         }
//       />
//       <Stack.Screen name="Profile" component={ProfileScreen} />
//       <Stack.Screen
//         name="User"
//         component={UserScreen}
//         options={{
//           headerShown: true,
//         }}
//       />
//       <Stack.Screen
//         name="UpdateProfile"
//         component={UpdateProfile}
//         options={{
//           headerShown: false,
//         }}
//       />
//       <Stack.Screen name="LoginUser" component={LoginNav} />
//     </Stack.Navigator>
//   );
// };


const LoginNav = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Home" component={DrawerNav} />
      
    </Stack.Navigator>
  );
};


const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const TabNav = () => {
  return (
    <NavigationContainer>
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#fff"
      shifting={true}
      barStyle={{ backgroundColor: '#0163d2' }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          tabBarLabel: 'Accueil',
          tabBarIcon: ({ color }) => (
            <Icon name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen 
        name="Schedule" 
        component={ScheduleScreen} 
        options={{
          tabBarLabel: 'Emploi du Temps',
          tabBarIcon: ({ color }) => (
            <Icon name="calendar" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen 
        name="Professeur" 
        component={ProfesseurScreen} 
        options={{
          tabBarLabel: 'Professeur',
          tabBarIcon: ({ color }) => (
            <Icon name="account" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen 
        name="Parent" 
        component={ParentHomeScreen} 
        options={{
          tabBarLabel: 'Parent',
          tabBarIcon: ({ color }) => (
            <Icon name="account-group" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
    </NavigationContainer>
  );
};

function App  () {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  async function getData() {
    const data = await AsyncStorage.getItem('isLoggedIn');
    console.log(data, 'at app.jsx');
    setIsLoggedIn(data);
   
  }



  return (
    <NavigationContainer>
      <Stack.Navigator  >
       
           <Stack.Screen options={{headerShown: false}} name="PL" component={Login2Screen}/>   
        <Stack.Screen options={{headerShown: true}} name="Enregistrement" component={Register2Screen}/>     

         <Stack.Screen options={{statusBarColor: '#0163d2',
          headerShown: true,
          headerBackVisible:true,
          headerStyle: {
            backgroundColor: '#0163d2',
          },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',}} name="Gestion des Utilisateurs" component={AdminScreen}/>       
        
     

 
            {/* <Stack.Screen options={{headerShown: false}} name="Home" component={PreScreen}/>  */}
               {/* <Stack.Screen options={{headerShown: false}} name="RegisterScreen" component={RegisterScreen}/>     */}
            {/* <Stack.Screen options={{headerShown: true}} name="LoginScreen" component={LoginScreen}/>      */}
            {/* <Stack.Screen options={{headerShown: false}} name="ACC" component={ConnectAcceptScreen}/>    */}
                <Stack.Screen options={{headerShown: true}} name="Profil" component={HomeScreen}/>      
               <Stack.Screen options={{headerShown: true}} name="Professeur" component={ProfesseurScreen}/>  
               <Stack.Screen options={{headerShown: true}} name="EditUser" component={EditUserScreen} /> 
               <Stack.Screen options={{headerShown: true}} name="Emploi du Temps" component={ScheduleScreen} /> 
                    
             

           <Stack.Screen  options={{statusBarColor: 'green',
          headerShown: false,
          headerBackVisible:true,
          headerStyle: {
            backgroundColor: 'green',
          },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',}}  name="Dashboard" component={AdminProfileScreen}/>


<Stack.Screen  options={{statusBarColor: '#0163d2',
          headerShown: true,
          headerBackVisible:true,
          headerStyle: {
            backgroundColor: '#0163d2',
          },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',}}  name="Dashboard Parent" component={ParentHomeScreen}/>
         

           <Stack.Screen options={{headerShown: false}}  name="el" component={EleveScreen}/>   
            <Stack.Screen options={{headerShown: false}}  name="pr" component={ProfesseurScreen}/>           
            <Stack.Screen options={{headerShown: true}}  name="Espace Professeur" component={TeacherAssignmentScreen}/>    
           <Stack.Screen options={{headerShown: true}}  name="esl" component={ AssignClassScreen}/>
           <Stack.Screen options={{headerShown: true}}  name="esk" component={ AssignAbsencesScreen}/>
           <Stack.Screen options={{headerShown: false}}  name="esc" component={ CreateClassScreen}/>
           <Stack.Screen options={{headerShown: true}}  name="esq" component={ ManageAbsencesScreen}/>

           <Stack.Screen options={{headerShown: true}}  name="Mes Classes" component={ClassesScreen}/>
       

           <Stack.Screen name="Notes" component={NotesScreen} />
          
 
           <Stack.Screen
          name="ImportFileScreen"
          component={ImportFileScreen}
          options={{ title: 'Importer un fichier' }}
        />
        <Stack.Screen
          name="NotesScreen"
          component={NotesScreen}
          options={{ title: 'Fichier importé' }}
        />

<Stack.Screen
          name="NotesListScreen"
          component={NotesListScreen}
          options={{ title: 'Fichier importé' }}
        />

<Stack.Screen name="SelectClass" component={SelectClassScreen} />
      <Stack.Screen name="UploadNotes" component={UploadNotesScreen} />
      <Stack.Screen name="MyNotes" component={MyNotesScreen} />

      </Stack.Navigator>

     
    </NavigationContainer>



  )


}



export default App;