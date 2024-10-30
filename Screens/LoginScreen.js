import {StyleSheet, View, Text,TextInput } from 'react-native'
import React from 'react'
import Backgroundlog from './Backgroundlog'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'

import Field from '../Custom/Field'
import Btn1 from '../Custom/Btn1'
import axios from 'axios'
import { Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'


const LoginScreen = () => {
  const navigation = useNavigation();
  const [identifiant, setIdentifiant] = useState('');
  const [password, setPassword] = useState('');


  function handleSubmit() {
    console.log(identifiant, password);
      const userData = {
       identifiant: identifiant,
       password: password,
      };
  axios.post('http://192.168.1.87:5000/login-user', userData).then(res => {
        console.log(res.data);
        
        if (res.data.status == 'ok') {
          Alert.alert('Connexion Reussie!!');
          AsyncStorage.setItem('token', res.data.data);
         navigation.navigate('Profil');
        }
        else if(res.data.password != 'ok'){
          Alert.alert('Mot de Passe Incorrect')
        }
        else if (res.data.status != 'ok') {
          Alert.alert('Remplissez Correctement toutes les informations!!');
        }
      })
      .catch(e => console.log(e));}
      

     
     

  

 




  return (
   <Backgroundlog>

<View style={{
      backgroundColor: "white",
       height: 200, 
       width: 400,
       borderTopLeftRadius: 100 ,
       borderTopRightRadius: 100 , 
       marginVertical:300
        }}></View>
     <View style={{
      backgroundColor: "black",
       height: 700, 
       width: 400,
       borderTopLeftRadius: 100 ,
       borderTopRightRadius:100 , 
       marginVertical:-480
        }}>
            <Text style={{fontSize: 19, color: 'white', fontWeight: 'bold',
  marginLeft: 120, paddingTop: 50, marginBottom: 20}}>  Connectez Vous! </Text>
        
        
        <TextInput
              placeholder="Identifiant"
            
               style={{borderRadius: 10, color:"black" , paddingHorizontal: 30, width: '78%', backgroundColor: 'white', marginVertical: 10, marginLeft: 50}}
      placeholderTextColor="black"

      onChange={e => setIdentifiant(e.nativeEvent.text)}
           
            />

          <TextInput
              placeholder="Password"
         
               style={{borderRadius: 10, color:"black" , paddingHorizontal: 30, width: '78%', backgroundColor: 'white', marginVertical: 10, marginLeft: 50}}
      placeholderTextColor="black"
           
      onChange={e => setPassword(e.nativeEvent.text)}
            />

         
          <Btn1 bgcolor='white' textColor='black' btnLabel="Connexion" Press={()=> handleSubmit()}/> 
   
        </View>
    
  
    {/* <View style={{
      backgroundColor: "black",
       height: 700, 
       width: 400,
       borderTopLeftRadius: 100 ,
       borderTopRightRadius: 100 , 
       marginVertical:350
        }}>

<Text style={{fontSize: 19, color: 'white', fontWeight: 'bold',
  marginLeft: 120, paddingTop: 50, marginBottom: 50}}>  Connectez Vous! </Text>
        
          <Field
            placeholder="Identifiant"
            keyboardType={'email-address'}/>
          <Field placeholder="Mot de Passe" secureTextEntry={true} />
         
         
          <Btn1 bgcolor='white' textColor='black' btnLabel="Connexion"Press={()=> props.navigation.navigate("LoginScreen")}/>
         </View>
   */}
   </Backgroundlog>
  )
}


const styles = StyleSheet.create({})

export default LoginScreen;