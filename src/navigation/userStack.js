import React from 'react';
import { NavigationContainer, DefaultTheme, useNavigation  } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen/index'
import ProfileScreen from '../screens/ProfileScreen'

import CartScreen from '../screens/CartScreen';
import { useIsFocused } from '@react-navigation/native';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: 'rgb(255, 45, 85)',
    },
  };

const HomeStack = createStackNavigator()
function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false,  }} >
      <HomeStack.Screen name="Home" component={HomeScreen} />
    </HomeStack.Navigator>
  );
}
const MenuStack = createStackNavigator()
function MenuStackScreen (){
  return (
    <MenuStack.Navigator>
      <MenuStack.Screen name="Menu" component={MenuScreen} />
    </MenuStack.Navigator>
  );
}


const ProfileStack = createStackNavigator()
function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />
    </ProfileStack.Navigator>
  );
}


 function MainTabNavigator() {
  const isCartScreenFocused = useIsFocused();
  console.log(isCartScreenFocused)
  return (
    
      <Tab.Navigator 
        screenOptions={({ route }) => ({
          headerShown: false,        
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
        tabBarStyle={{ display: isCartScreenFocused ? 'none' : 'flex' }}
        tabBarHideOnKeyboard={true}
        
      >
        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="Menu" component={MenuStackScreen} />
        <Tab.Screen name="Reservation" component={ProfileStackScreen} />
        <Tab.Screen name="Account" component={ProfileStackScreen} />
        
      </Tab.Navigator>

  );
}

export default function MainStackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="MainTab" 
          component={MainTabNavigator}
          options={{ headerShown: false}} 
        />
        <Stack.Screen
          name="Cart"
          component={CartScreen}
          options={{
            headerShown: true,
            title: 'Cart'
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}