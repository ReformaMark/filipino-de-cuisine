import React from 'react';
import { NavigationContainer, DefaultTheme, useNavigation  } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen/HomeScreen'
import AccountScreen from '../screens/AccountScreen'
import MenuScreen from '../screens/MenuScreen/MenuScreen'
import CartScreen from '../screens/CartScreen';
import { View } from 'react-native';
import CartIcon from '../components/CartIcon';
import { CartProvider } from '../context/cartContext';
import { ToastProvider } from 'react-native-toast-notifications'

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

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


const ProfileStack = createStackNavigator()
function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="ProfileScreen" component={AccountScreen} />
    </ProfileStack.Navigator>
  );
}


 function MainTabNavigator() {
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
    <ToastProvider>
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
            headerTitleAlign: 'center',
            title: 'Your Cart',
            headerStyle: {
              backgroundColor: 'white',
              height: 120,
            },
            headerRight: () => (
              <View style={{ marginRight: 20, justifyContent:'center' }}>
                <CartIcon/>
              </View>
            ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </ToastProvider>
  );
}