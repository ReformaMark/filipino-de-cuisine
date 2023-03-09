import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen/index'
import SignUpScreen from '../screens/SignUpScreen/SignUpScreen';
import SignInScreen from '../screens/SignInScreen/SignInScreen';

const Stack = createStackNavigator();

export default function AuthStack() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Filipino de Cuisine' }} />
        <Stack.Screen name="SignIn" component={SignInScreen} options={{ title: 'Sign In' }} />
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ title: 'Sign Up' }} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }