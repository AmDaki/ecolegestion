import {StyleSheet, View, Text,TextInput } from 'react-native'
import React from 'react'
import Backgroundlog from './Backgroundlog'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import Field from '../Custom/Field'
import Btn1 from '../Custom/Btn1'
import { Alert } from 'react-native'
import axios from 'axios'


const RegisterScreen = (props) => {
    const navigation = useNavigation();
    const [identifiant, setIdentifiant] = useState('');
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [telephone, setTelephone] = useState('');
    const [identifiantVerify, setIdentifiantVerify] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordVerify, setPasswordVerify] = useState(false);

    function handelSubmit() {
        const userData = {
         identifiant: identifiant,
         nom: nom,
         prenom: prenom,
         password: password,
         telephone: telephone,
        };
 axios.post('http://192.168.1.87:5000/register', userData).then(res => {
          console.log(res.data);
          if (res.data.status == 'ok') {
            Alert.alert('Enregistrement Reussi!!');
           props.navigation.navigate('LoginScreen');
          } else {
            Alert.alert(JSON.stringify(res.data));
          }
        })
        .catch(e => console.log(e));}
        

       
       

        function handleNom(e) {
          const nomVar = e.nativeEvent.text;
          setNom(nomVar);
        }

        function handlePrenom(e) {
          const prenomVar = e.nativeEvent.text;
          setPrenom(prenomVar);
        }

        function handleTelephone(e) {
          const telephoneVar = e.nativeEvent.text;
          setTelephone(telephoneVar);
        }
    

   
    function handleIdentifiant(e) {
      const identifiantVar = e.nativeEvent.text;
      setIdentifiant(identifiantVar);
      setIdentifiantVerify(false);
  
      if (identifiantVar.length > 1) {
        setIdentifiantVerify(true);
      }
    }

    function handlePassword(e) {
      const passwordVar = e.nativeEvent.text;
      setPassword(passwordVar);
      setPasswordVerify(false);
      if (/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(passwordVar)) {
        setPassword(passwordVar);
        setPasswordVerify(true);
      }
    }


  return (
   <Backgroundlog>

    <View style={{
      backgroundColor: "black",
       height: 700, 
       width: 400,
       borderTopLeftRadius: 100 ,
       borderTopRightRadius: 100 , 
       marginVertical:250
        }}>

<Text style={{fontSize: 19, color: 'white', fontWeight: 'bold',
  marginLeft: 75, paddingTop: 10, marginBottom: 13}}> Effectuez un Enregistrement! </Text>
   <TextInput
              placeholder="Identifiant"
            
               style={{borderRadius: 10, color:"black" , paddingHorizontal: 30, width: '78%', backgroundColor: 'white', marginVertical: 10, marginLeft: 50}}
      placeholderTextColor="black"

      onChange={e => handleIdentifiant(e)}
           
            />


         <TextInput
              placeholder="Nom"
            
               style={{borderRadius: 10, color:"black" , paddingHorizontal: 30, width: '78%', backgroundColor: 'white', marginVertical: 10, marginLeft: 50}}
      placeholderTextColor="black"

      onChange={e => handleNom(e)}
           
            />

        
          <TextInput
              placeholder="Prenom"
            
               style={{borderRadius: 10, color:"black" , paddingHorizontal: 30, width: '78%', backgroundColor: 'white', marginVertical: 10, marginLeft: 50}}
      placeholderTextColor="black"

      onChange={e => handlePrenom(e)}
           
            />

          <TextInput
              placeholder="Password"
         
               style={{borderRadius: 10, color:"black" , paddingHorizontal: 30, width: '78%', backgroundColor: 'white', marginVertical: 10, marginLeft: 50}}
      placeholderTextColor="black"
           
      onChange={e => handlePassword(e)}
            />
             {/* <TextInput
              placeholder="Professiont"
            
               style={{borderRadius: 100, color:"black" , paddingHorizontal: 30, width: '78%', backgroundColor: 'white', marginVertical: 10, marginLeft: 50}}
      placeholderTextColor="black"

      onChange={e => handleIdentifiant(e)}
           
            /> */}

<TextInput
              placeholder="Numero de Telephone"
            
               style={{borderRadius: 10, color:"black" , paddingHorizontal: 30, width: '78%', backgroundColor: 'white', marginVertical: 10, marginLeft: 50}}
      placeholderTextColor="black"

      onChange={e => handleTelephone(e)}
           
            />
         
          <Btn1 bgcolor='white' textColor='black' btnLabel="ENREGISTREZ" Press={()=> handelSubmit()}/>
         </View>
  
   </Backgroundlog>
  )
}



const styles = StyleSheet.create({})

export default RegisterScreen;