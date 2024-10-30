import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Background from './Background';
import Btn from '../Custom/Btn';
import { darkGreen } from '../Custom/constants';


const PreScreen = (props) => {
  return (
    <Background> 
         
         <View style={{marginHorizontal: 40, marginVertical: 100}}>
            <Text style={{color:'white', fontSize: 14}}> 
            Bienvenue sur votre 
         </Text>
         <Text style={{color:'white', fontSize: 24, marginBottom:40}}> 
            Application de Gestion Scolaire 
         </Text>  

         <Btn bgcolor='white' textColor='black' btnLabel="Connexion"Press={()=> props.navigation.navigate("LoginScreen")} /> 
         </View>
         
    </Background>
  );
}

const styles = StyleSheet.create({})

export default PreScreen;