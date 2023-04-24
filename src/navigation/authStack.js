import React from 'react';
import { View, Image, StyleSheet, ScrollView, Dimensions } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import SignInScreen from '../screens/SignInScreen/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen/SignUpScreen';
import EmailVerificationScreen from '../screens/SignUpScreen/EmailVerificationScreen';
import ForgotPasswordScreen from '../screens/SignInScreen/ForgotPasswordScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import MenuScreen from '../screens/MenuScreen/MenuScreen';
import ReservationScreen from '../screens/ReservationScreen/ReservationScreen';
import ProfileScreen from '../screens/AccountScreen/AccountScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { AntDesign, MaterialIcons } from '@expo/vector-icons';

  const Tab = createMaterialTopTabNavigator();
  const BottomTab = createBottomTabNavigator();
  const HomeStack = createStackNavigator()
  function HomeStackScreen() {
    return (
      <HomeStack.Navigator screenOptions={{ headerShown: false,  }} >
        <HomeStack.Screen name="HomeScreen" component={HomeScreen}/>
      </HomeStack.Navigator>
    );
  }

  const MenuStack = createStackNavigator()
  function MenuStackScreen (){
    return (
      <MenuStack.Navigator>
        <MenuStack.Screen 
          name="MenuScreen" 
          component={MenuScreen} 
          options={{
              headerStatusBarHeight: 30,
              headerTitleAlign: 'center', // center align the title
              headerTitle: 'Menu', // set the title
            }} 
        />
      </MenuStack.Navigator>
    );
  }
  const ReservationStack = createStackNavigator()
  function ReservationStackScreen() {
    return (
      <ReservationStack.Navigator screenOptions={{ headerShown: false,  }} >
        <ReservationStack.Screen name="ReservationScreen" component={ReservationScreen}/>
      </ReservationStack.Navigator>
    );
  }


  const ProfileStack = createStackNavigator()
  function ProfileStackScreen() {
    return (
      <ProfileStack.Navigator screenOptions={{ headerShown: false,  }}>
        <ProfileStack.Screen 
        name="ProfileScreen" 
        component={ProfileScreen}/>
      </ProfileStack.Navigator>
    );
  }

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

  function MainTabNavigator() {
    return (    
        <BottomTab.Navigator 
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
        >
          <BottomTab.Screen name="Home" component={HomeStackScreen} />
          <BottomTab.Screen name="Menu" component={MenuStackScreen} />
          <BottomTab.Screen name="Reservation" component={ReservationStackScreen} />
          <BottomTab.Screen name="Account" component={ProfileStackScreen} />        
        </BottomTab.Navigator>

    );
  }
  export default function MainAuthStackNavigator (){
    const Stack = createStackNavigator()
    return (      
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name='Maintab' 
            component={MainTabNavigator}
            options={{ headerShown: false}} 
          />
          <Stack.Screen 
            name="MainAuthTab" 
            component={MainAuthTabNavigator}
            options={{ headerShown: false}} 
          />
          <Stack.Screen
            name='EmailVerify'
            component={EmailVerificationScreen}
            options={{ 
              headerTitleAlign: 'center',
              headerTitle: 'Verify Your Email'
            }}
          
          />
          <Stack.Screen
            name='ForgotPassword'
            component={ForgotPasswordScreen}
            options={{ headerShown: false}} 
          />
        </Stack.Navigator>
      </NavigationContainer>     
    )
  };

