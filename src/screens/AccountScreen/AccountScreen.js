import React, { useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuthentication } from '../../hooks/useAuthentication';
import { Button } from 'react-native-elements';
import { getAuth, signOut } from "firebase/auth";
import { app } from '../../../config/firebaseConfig';
import HeaderImage from './images/accountHeader.png';
import DefaultImage from './images/default.png';
import { Avatar, Icon, ListItem, Dialog } from '@rneui/themed';
import { useEffect } from 'react';
import CustomButton from '../../components/CustomButton/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FeedbackIcon from './images/feedback.png';
import OrderHistoryIcon from './images/orderHistory.png';
import reservationHistoryIcon from './images/reservationHistory.png';
import { ScrollView } from 'react-native';
import { color } from '@rneui/base';


export default function ProfileScreen({ navigation }) {
  const [visible, setVisible] = useState(false);
  const { user } = useAuthentication();
  const [expanded, setExpanded] = useState(false);
  const auth = getAuth(app)

  const toggleDialog = () => {
    setVisible(!visible);
  };
  
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
  <ScrollView style={styles.container}>
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
      <Avatar
        size={65}
        rounded
        title={user.displayName.charAt(0)}
        containerStyle={{ backgroundColor: '#3d4db7' }}
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
        <Image
          source={OrderHistoryIcon}
          resizeMode='contain'
          style={{width: 30, height:40}}
        />
        <TouchableOpacity style={ styles.orderTransaction} onPress={()=> navigation.navigate('OrderTransactionScreen')}>
          <Text style={styles.transactionText}>Order Transaction</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.list}>
        <Image
          source={reservationHistoryIcon}
          resizeMode='contain'
          style={{width: 30, height:40, }}
        />
        <TouchableOpacity style={ styles.orderTransaction}>
          <Text style={styles.transactionText}>Reservation History</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.list}>
        <Image
          source={FeedbackIcon}
          resizeMode='contain'
          style={{width: 30, height:40}}
        />
        <TouchableOpacity style={ styles.orderTransaction} onPress={()=>navigation.navigate('Feedback')}>
          <Text style={styles.transactionText}>Send us FeedBack</Text>
        </TouchableOpacity>
      </View>
      <View style={{width: '100%', paddingHorizontal: 40, marginTop: -30}}>
        <ListItem.Accordion
        containerStyle={{backgroundColor: 'transparent'}}
        bottomDivider={true}
        pad={140}
        content={
          <Text>More Settings</Text>
        }
        isExpanded={expanded}
        onPress={() => {
          setExpanded(!expanded);
        }}
      >
        <TouchableOpacity onPress={()=>navigation.navigate('AboutUs')}>
        <ListItem containerStyle={{backgroundColor: 'transparent', paddingLeft: 50}}>
          <ListItem.Title >About Us</ListItem.Title>
        </ListItem>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate('ContactUs')}>
        <ListItem containerStyle={{backgroundColor: 'transparent', paddingLeft: 50}}>
          <ListItem.Title >Contact Us</ListItem.Title>
        </ListItem>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate('PrivacyPolicy')}>
        <ListItem containerStyle={{backgroundColor: 'transparent', paddingLeft: 50}}>
          <ListItem.Title>Privacy Statement</ListItem.Title>
        </ListItem>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate('TermsService')}>
        <ListItem containerStyle={{backgroundColor: 'transparent', paddingLeft: 50}}>
          <ListItem.Title>Terms & Conditions</ListItem.Title>
        </ListItem>
        </TouchableOpacity>
        
      </ListItem.Accordion>
      </View>
      <TouchableOpacity onPress={toggleDialog} style={styles.logoutTextContainer}>
        <Icon 
          name='log-out'
          type='feather'
          size={30}
          color={'rgba(16, 185, 129, 1)'}
        />
        <Text style={styles.logoutText}>Log out</Text>
        
      </TouchableOpacity>
      <Dialog
          isVisible={visible}
          onBackdropPress={toggleDialog}
          style={{borderColor: 'black', borderWidth: 2, borderRadius: 100, padding: 30}}
        >
        <View style={{padding: 10}}>
        <Dialog.Title title="Log out" />
        <Text style={{ fontSize: 12, fontWeight: '500'}}>Are you sure you want to log out?</Text>
        <View style={{flexDirection: 'row', marginTop: 60, justifyContent: 'space-between'}}>
          <TouchableOpacity onPress={handleSignOut} style={{padding: 10, backgroundColor: '#10B981', width: 90,borderRadius: 30}}>
            <Text style={{textAlign:'center', fontSize: 15, fontWeight: '500', color: 'white'}}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleDialog} style={{padding: 10, backgroundColor: '#10B981', width: 90, borderRadius: 30}}>
            <Text style={{textAlign:'center', fontSize: 15, fontWeight: '500', color: 'white'}}>No</Text>
          </TouchableOpacity>
        </View>
        </View>
        </Dialog>
    </View>
    </> :
   
      <View style={{flex: 1, justifyContent:'center', padding: 30, marginTop: 300}}>
        <Text style={{fontSize: 15, fontWeight:'700', marginBottom: 20,}}>Please Login to enjoy using our app</Text>
        <View>
          <CustomButton         
            text="Login"
            onPress={() => navigation.navigate('MainAuthTab')}      
        
          />
        </View>
      </View>

    }
  </ScrollView>

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
    marginHorizontal: 30,
    color: 'rgba(16, 185, 129, 1)',
  },
  logoutTextContainer:{
    marginVertical: 30,
    paddingBottom: 20, 
    alignItems:'center',
    marginLeft: 20,
    flexDirection: 'row'
  },
});