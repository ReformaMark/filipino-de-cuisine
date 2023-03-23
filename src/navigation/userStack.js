import React from 'react';
import { NavigationContainer, DefaultTheme  } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen/index'
import ProfileScreen from '../screens/ProfileScreen'

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: 'rgb(255, 45, 85)',
    },
  };
function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
}

export default function MainTabNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator 
        screenOptions={({ route }) => ({
          headerShown: false ,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home';
              return <MaterialIcons name={iconName} size={size} color={color} />;
            } else if (route.name === 'Menu') {
              iconName = 'restaurant-menu';
              return <MaterialIcons name={iconName} size={size} color={color} />;
            } else if (route.name === 'Reservation') {
              iconName = 'clockcircleo';
              return <AntDesign name={iconName} size={size} color={color} />;
            } else if (route.name === 'Account') {
              iconName = 'account-circle';
              return <MaterialIcons name={iconName} size={size} color={color} />;
            }
          },

          tabBarActiveTintColor: '#FBBC05',
          tabBarInactiveTintColor: 'black',
        })}
      >
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Menu" component={ProfileStack} />
        <Tab.Screen name="Reservation" component={ProfileStack} />
        <Tab.Screen name="Account" component={ProfileStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}