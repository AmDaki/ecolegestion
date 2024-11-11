
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import PreScreen from './Screens/PreScreen'
import LoginScreen from './Screens/LoginScreen'
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import RegisterScreen from './Screens/RegisterScreen';
import AdminProfileScreen from './Screens/AdminProfileScreen';
import BottomTab from './Tabs/BottomTab';

import HomeScreen from './Screens/HomeScreen';
import {createDrawerNavigator} from '@react-navigation/drawer';
import DrawerContent from './Screens/DrawerContent';
import Register2Screen from './Screens/Register2Screen';
import Login2Screen from './Screens/Login2Screen';
import AdminScreen from './Screens/AdminScreen';
import ProfScreen from './Screens/ProfScreen';
import EleveScreen from './Screens/EleveScreen';

import TeacherAssignmentScreen from './Screens/EspaceE';
import AssignStudentsToClassScreen from './Screens/AjoutEleve';
import ProfesseurScreen from './Screens/ProfesseurScreen';
import AssignAbsencesScreen from './Screens/absence';
import CreateClassScreen from './Screens/ajoutclasse';
import ManageAbsencesScreen from './Screens/gererA';



const DrawerNav = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
      }}>
      <Drawer.Screen name="Home" component={StackNav} />
    </Drawer.Navigator>
  );
};

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

function App  () {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  async function getData() {
    const data = await AsyncStorage.getItem('isLoggedIn');
    console.log(data, 'at app.jsx');
    setIsLoggedIn(data);
   
  }



  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login2Screen' >
       
           <Stack.Screen options={{headerShown: false}} name="PL" component={Login2Screen}/>   
        <Stack.Screen options={{headerShown: true}} name="PR" component={Register2Screen}/>     

         <Stack.Screen options={{statusBarColor: '#0163d2',
          headerShown: true,
          headerBackVisible:true,
          headerStyle: {
            backgroundColor: '#0163d2',
          },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',}} name="AdminScreen" component={AdminScreen}/>       
        
     

 
            {/* <Stack.Screen options={{headerShown: false}} name="Home" component={PreScreen}/>  */}
               {/* <Stack.Screen options={{headerShown: false}} name="RegisterScreen" component={RegisterScreen}/>     */}
            {/* <Stack.Screen options={{headerShown: true}} name="LoginScreen" component={LoginScreen}/>      */}
            {/* <Stack.Screen options={{headerShown: false}} name="ACC" component={ConnectAcceptScreen}/>    */}
                <Stack.Screen options={{headerShown: true}} name="Profil" component={HomeScreen}/>      
               <Stack.Screen options={{headerShown: true}} name="Professeur" component={ProfesseurScreen}/>        
             

           <Stack.Screen  options={{statusBarColor: '#0163d2',
          headerShown: true,
          headerBackVisible:true,
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',}}  name="Dashboard" component={AdminProfileScreen}/>
         
           <Stack.Screen options={{headerShown: false}}  name="tab" component={BottomTab}/> 
           <Stack.Screen options={{headerShown: false}}  name="el" component={EleveScreen}/>   
            <Stack.Screen options={{headerShown: false}}  name="pr" component={ProfesseurScreen}/>           
            <Stack.Screen options={{headerShown: true}}  name="es" component={TeacherAssignmentScreen}/>    
           <Stack.Screen options={{headerShown: true}}  name="esl" component={ AssignStudentsToClassScreen}/>
           <Stack.Screen options={{headerShown: true}}  name="esk" component={ AssignAbsencesScreen}/>
           <Stack.Screen options={{headerShown: true}}  name="esc" component={ CreateClassScreen}/>
           <Stack.Screen options={{headerShown: true}}  name="esq" component={ ManageAbsencesScreen}/>
 

      </Stack.Navigator>

     
    </NavigationContainer>



  )


}



export default App