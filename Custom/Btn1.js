import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

export default function Btn({bgcolor, btnLabel, textColor, Press}) {
  return (
    <TouchableOpacity 
    onPress={Press} 
    style={{
        backgroundColor: bgcolor,
        borderRadius: 10,
        alignItems: 'center',
        width: 250,
        paddingVertical: 3,
        marginVertical: 20,
      marginLeft:75
       
    }}>
       <Text style={{color: textColor, fontSize: 22, fontWeight: 'bold'}}>
        {btnLabel}
         </Text> 
       
    </TouchableOpacity>
  );
}