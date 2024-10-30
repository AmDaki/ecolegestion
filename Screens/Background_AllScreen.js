import { View,ImageBackground  } from 'react-native'
import React from 'react'

const Backgroundall = ({children}) => {
  return (
    <View> 
   
     <ImageBackground source={require("../assets/backall.jpg")} style={{height: '100%'}}/>  
      <View style={{position: 'absolute'}}> 
        {children}
      </View>
    </View>
  )
}

export default Backgroundall