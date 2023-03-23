import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen/index'
import SignInSignUp from '../screens/SignInSignUpScreen/index';
const Stack = createStackNavigator();

export default function AuthStack() {
    return (
      <NavigationContainer>
        <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="SignInSignUp" component={SignInSignUp} options={{ title: 'Sign In' }} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }