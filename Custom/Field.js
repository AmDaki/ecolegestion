import React from 'react';
import {TextInput} from 'react-native';
import { darkGreen } from './constants';

const Field = props => {
  return (
    <TextInput
      {...props}
      style={{borderRadius: 100, color:"black" , paddingHorizontal: 30, width: '78%', backgroundColor: 'white', marginVertical: 10, marginLeft: 50}}
      placeholderTextColor="black"></TextInput>
  );
};

export default Field;