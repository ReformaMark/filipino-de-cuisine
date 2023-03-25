import React from 'react';
import { View, Image, StyleSheet, ScrollView, Dimensions } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import SignInSignUp from '../screens/SignInSignUpScreen/index';
import SignInScreen from '../screens/SignInScreen/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen/SignUpScreen';

const Tab = createMaterialTopTabNavigator();



export default function AuthStack() {
    return (
      <>
        <Image 
          source={require('./images/image.png')} 
          style={{ 
            width: Dimensions.get('screen').width , 
            height: 100, marginBottom: 20 }} 
        />
     
      <NavigationContainer>
        <Tab.Navigator 
        screenOptions={{
          activeTintColor: 'white',
          inactiveTintColor: 'gray',
          style: { backgroundColor: 'green' },
          indicatorStyle: { backgroundColor: 'red' },
        }}             
        >
          <Tab.Screen 
          name="Sign In" 
          component={SignInScreen}        
          />
          <Tab.Screen 
            name="Sign Up" 
            component={SignUpScreen}
          
          />
        </Tab.Navigator>
      </NavigationContainer>
      </>
    );
  }
