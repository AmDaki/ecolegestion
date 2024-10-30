import { View, Text } from 'react-native'
import React from 'react'

import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LoginScreen from '../Screens/LoginScreen';
import AdminProfileScreen from '../Screens/AdminProfileScreen';
// import CommunicationScreen from '../Screens/CommunicationScreen';
import ProfileScreen from '../Screens/ProfileScreen';


const BottomTab = () => {

    const Tab = createMaterialBottomTabNavigator();

    return (
        <Tab.Navigator
          initialRouteName="tab"
          activeColor="#e91e63"
          barStyle={{ backgroundColor: 'white' }}
        >
          <Tab.Screen
            name="tab"
            component={AdminProfileScreen}
            options={{
              tabBarLabel: 'DashBoard',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="home" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="Notifications"
            component={CommunicationScreen}
            options={{
              tabBarLabel: 'Communication',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="message-text" color={color} size={26} />
              ),
              tabBarBadge: 2,
            }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              tabBarLabel: 'Profile',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="account-settings-outline" color={color} size={26} />
              ),
            }}
          />
        </Tab.Navigator>
      );
}

export default BottomTab