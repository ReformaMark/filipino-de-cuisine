import React from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuthentication } from '../../hooks/useAuthentication';
import { Button } from 'react-native-elements';
import { getAuth, signOut } from "firebase/auth";
import { app } from '../../../config/firebaseConfig';
import HeaderImage from './images/accountHeader.png';
import DefaultImage from './images/default.png';
import { Icon } from '@rneui/themed';
import { useEffect } from 'react';
import CustomButton from '../../components/CustomButton/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen({ navigation }) {

  const { user } = useAuthentication();
 
  const auth = getAuth(app)
  const handleSignOut = () => {
    if (user) {
      deleteData()
      signOut(auth)
      .then(() => {
        console.log("Successfully signed out");
      })
      .catch((error) => {
        console.error(error);
      });
    }
  };

  const deleteData = async() =>{
    try {
      await AsyncStorage.removeItem('User')
      console.log("Success delete")
    } catch (error) {
      console.log(error)
    }
  }
  return (
  <View style={styles.container}>
    {user != undefined ?
    <>
    <View style={styles.header}>
      <Image 
        source={HeaderImage}
      />
      <Text style={styles.settingText}>Account Settings</Text>
      <View style={styles.gearIcon}>
        <Icon 
          name='gears'
          type='font-awesome'
          size={100}
        />
      </View>
      
    </View>
    <View style={styles.userInfoContainer}>
      <View >
        <Image 
          source={DefaultImage}
          style={styles.userImageContainer}
        />
      </View>
      {user ? 
      <View >        
        <Text style={styles.displayName}>{user.displayName}</Text>
        <View style={styles.emailContainer}>
          <Text style={styles.email}>{user.email}</Text>
          <Icon 
            name='pencil'
            type='font-awesome'
            size={10}
          />
        </View>
      </View>
      : <Text>Loading...</Text>}
    </View>
    <View>
      <View style={styles.list}>
        <Icon 
          name='list'
          type='font-awesome'
          size={30}
        />
        <TouchableOpacity style={ styles.orderTransaction} onPress={()=> navigation.navigate('OrderTransactionScreen')}>
          <Text style={styles.transactionText}>Order Transaction</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.list}>
        <Icon 
          name='list'
          type='font-awesome'
          size={30}
        />
        <TouchableOpacity style={ styles.orderTransaction}>
          <Text style={styles.transactionText}>Reservation History</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.list}>
        <Icon 
          name='list'
          type='font-awesome'
          size={30}
        />
        <TouchableOpacity style={ styles.orderTransaction}>
          <Text style={styles.transactionText}>Send us FeedBack</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.list}>
        <TouchableOpacity style={ styles.orderTransaction}>
          <Text style={styles.transactionText}>More Settings</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handleSignOut} style={styles.logoutTextContainer}>
        <Text style={styles.logoutText}>Log out</Text>
      </TouchableOpacity>
    </View>
    </> :
    <>
      <View style={{flex: 1, justifyContent:'center', padding: 30,}}>
        <Text style={{fontSize: 15, fontWeight:'700', marginBottom: 20,}}>Please Login to enjoy using our app</Text>
        <View>
          <CustomButton         
            text="Login"
            onPress={() => navigation.navigate('MainAuthTab')}      
        
          />
        </View>
        
      </View>
    </>
    }
  </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  buttons: {
    marginTop: 20,
  },
  button: {
    marginBottom: 10,
  },
  header:{
    marginBottom: 50
  },
  settingText:{
    position: 'absolute',
    top: 60,
    left: 40,
    fontSize: 15,
    fontWeight: '700',
  },
  gearIcon:{
    position: 'absolute',
    top: 20,
    left: 220,
  },
  userInfoContainer:{
    position: 'absolute',
    top: 120,
    marginHorizontal: 36 ,
    width: '80%',
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 1)",
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImageContainer:{
    width: 68,
    height: 68,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'black',
  },
  displayName:{
    fontSize: 18,
    fontWeight: '400',
    marginHorizontal: 10,
  },
  emailContainer:{
    flexDirection: 'row',

  },
  email:{
    fontSize: 10,
    fontWeight: '400',
    marginHorizontal: 10,
  },
  list:{ 
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  transactionText:{
    marginHorizontal: 10,
    fontSize: 18,
    fontWeight: '400',
  },
  orderTransaction:{
    width: Dimensions.get('screen').width - 80,
    paddingBottom: 20,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  logoutText:{
    fontSize: 18,
    fontWeight: '400',
  },
  logoutTextContainer:{
    marginLeft: 30,
  },
});