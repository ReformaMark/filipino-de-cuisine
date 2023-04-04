import React from 'react';
import { View, Image, StyleSheet, ScrollView, Dimensions } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import SignInScreen from '../screens/SignInScreen/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen/SignUpScreen';
import EmailVerificationScreen from '../screens/SignUpScreen/EmailVerificationScreen';
import ForgotPasswordScreen from '../screens/SignInScreen/ForgotPasswordScreen';

  const Tab = createMaterialTopTabNavigator();

  function MainAuthTabNavigator (){
  return (
    <>
      <Image 
        source={require('./images/image.png')} 
        style={{ 
          width: Dimensions.get('screen').width , 
          height: 100, marginBottom: 20 }} 
      />
    
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
    </>
    );
  };

  export default function MainAuthStackNavigator (){
    const Stack = createStackNavigator()
    return (      
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name="MainAuthTab" 
            component={MainAuthTabNavigator}
            options={{ headerShown: false}} 
          />
          <Stack.Screen
            name='EmailVerify'
            component={EmailVerificationScreen}
          
          />
          <Stack.Screen
            name='ForgotPassword'
            component={ForgotPasswordScreen}
          
          />
        </Stack.Navigator>
      </NavigationContainer>     
    )
  };

