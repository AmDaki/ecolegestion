import { View, ImageBackground } from 'react-native'
import React from 'react'

const Backgroundlog = ({children}) => {
  return (
    <View>
      <ImageBackground source={require("../assets/backlogin.jpg")} style={{height: '100%'}}/>
      <View style={{position: 'absolute'}}> 
        {children}
      </View>
    </View>
  )
}

export default  Backgroundlog