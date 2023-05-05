  import React from 'react';
  import { NavigationContainer, DefaultTheme, useNavigation  } from '@react-navigation/native';
  import { createStackNavigator } from '@react-navigation/stack';
  import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
  import { AntDesign, MaterialIcons } from '@expo/vector-icons';
  import HomeScreen from '../screens/HomeScreen/HomeScreen'
  import AccountScreen from '../screens/AccountScreen'
  import MenuScreen from '../screens/MenuScreen/MenuScreen'
  import CartScreen from '../screens/CartScreen';
  import CheckoutScreen from '../screens/CartScreen/CheckoutScreen'
  import ReservationScreen from '../screens/ReservationScreen';
  import { View } from 'react-native';
  import CartIcon from '../components/CartIcon';
  import { ToastProvider } from 'react-native-toast-notifications'
  import CreateUserInfoScreen from '../screens/HomeScreen/CreateUserInfoScreen';
import PaymentStatusScreen from '../screens/CartScreen/PaymentStatusScreen';
import OrderStatusScreen from '../screens/AccountScreen/OrderStatusScreen';
import OrderSuccessScreen from '../screens/CartScreen/OrderSuccessScreen';
import OrderTransactionScreen from '../screens/AccountScreen/OrderTransactionScreen';
import BestSellerScreen from '../screens/MenuScreen/BestSellerScreen';
import AboutUsScreen from '../screens/AccountScreen/AboutUsScreen';
import ContactUsScreen from '../screens/AccountScreen/ContactUsScreen';
import FeedbackScreen from '../screens/AccountScreen/FeedbackScreen';
import PrivacyPolicyScreen from '../screens/AccountScreen/PrivacyPolicyScreen';
import TermsServiceScreen from '../screens/AccountScreen/TermsServiceScreen';
import { Image } from 'react-native';
import EditCustomerInfoScreen from '../screens/CartScreen/EditCustomerInfoScreen';
import RecieptScreen from '../screens/AccountScreen/RecieptScreen';


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
            headerShown: true,
            headerStatusBarHeight: 30,
            headerTitleAlign: 'center', // center align the title
            headerTitle: 'Menu', // set the title
            headerRight: () => (
              <View style={{ marginRight: 20, justifyContent:'center' }}>
                <CartIcon />
              </View>
            ),
          }} 
      />
        <MenuStack.Screen 
          name="BestSellerScreen" 
          component={BestSellerScreen} 
          options={{
            headerShown: true,
            headerStatusBarHeight: 30,
            headerTitleAlign: 'center', // center align the title
            headerTitle: 'Menu', // set the title
            headerRight: () => (
              <View style={{ marginRight: 20, justifyContent:'center' }}>
                <CartIcon />
              </View>
            ),
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
          component={AccountScreen}/>
        <ProfileStack.Screen 
          name="OrderTransactionScreen" 
          component={OrderTransactionScreen}/>
        
      </ProfileStack.Navigator>
    );
  }

  const CartStack = createStackNavigator()
  function CartStackScreen() {
    return (
      <CartStack.Navigator screenOptions={{ headerShown: false,  }}>
        <CartStack.Screen
            name="CartScreen"
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
          <CartStack.Screen
            name="CheckoutScreen"
            component={CheckoutScreen}
            options={{
              headerShown: true,
              headerTitleAlign: 'center',
              title: 'Your Cart',
              headerStyle: {
                backgroundColor: 'white',
                height: 80,
              },
              headerRight: () => (
                <View style={{ marginRight: 20, justifyContent:'center' }}>
                  <CartIcon/>
                </View>
              ),
            }}
          />
          <CartStack.Screen
            name="PaymentStatusScreen"
            component={PaymentStatusScreen}
          />
          <CartStack.Screen
            name="OrderSuccessScreen"
            component={OrderSuccessScreen}
          />
      </CartStack.Navigator>
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
          <Tab.Screen name="Reservation" component={ReservationStackScreen} />
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
            name="CreateUserInfoScreen" 
            component={CreateUserInfoScreen}
            options={{ 
              headerShown: false,
            }} 
          />
          <Stack.Screen 
            name="MainTab" 
            component={MainTabNavigator}
            options={{ headerShown: false}} 
          />
          <Stack.Screen
            name="Cart"
            component={CartStackScreen}
            options={{ headerShown: false}} 
          />          
          <Stack.Screen 
          name="OrderStatusScreen" 
          component={OrderStatusScreen}
          options={{ 
            headerTitle: 'Order Status',
            headerTitleAlign: 'center',
          }}
          />
          <Stack.Screen 
          name="RecieptScreen" 
          component={RecieptScreen}
          options={{ 
            headerTitle: 'Reciept',
            headerTitleAlign: 'center',
          }}
          />
           <Stack.Screen 
            name="EditCutomerInfoScreen" 
            component={EditCustomerInfoScreen}
            options={{ 
              headerShown: false,
            }} 
          />
          <Stack.Screen 
          name="AboutUs" 
          component={AboutUsScreen}
          options={{ 
            headerTitle: 'About Us',
            headerTitleAlign: 'center',
          }}
          /> 
         <Stack.Screen 
          name="ContactUs" 
          component={ContactUsScreen}
          options={{ 
            headerTitle: 'Contact Us',
            headerTitleAlign: 'center',
          }}
          /> 
         <Stack.Screen 
          name="Feedback" 
          component={FeedbackScreen}
          options={{ 
          
            headerTitle: '',
            headerBackground: () => (
              <Image source={require('./images/image.png')} resizeMode='stretch' style={{width: '100%', height: 200}} />
            ),
            headerTitleAlign: 'center',
            headerTintColor: 'white'
          }}
          /> 
         <Stack.Screen 
          name="PrivacyPolicy" 
          component={PrivacyPolicyScreen}
          options={{ 
            headerTitle: '',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#10B981'
            }
          }}
          /> 
         <Stack.Screen 
          name="TermsService" 
          component={TermsServiceScreen}
          options={{ 
            headerTitle: 'Terms & Conditions',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#10B981'
            },
            headerTintColor: 'white'
          }}
          /> 
        </Stack.Navigator>
      </NavigationContainer>
      </ToastProvider>
    );
  }