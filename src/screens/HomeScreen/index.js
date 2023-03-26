import React from 'react';
import { StyleSheet, Text, View, ImageBackground,ScrollView, Image, useWindowDimensions } from 'react-native';
import { useAuthentication } from '../../hooks/useAuthentication';
import { getAuth, signOut } from "firebase/auth";
import { app } from '../../../config/firebaseConfig'
import { useForm } from 'react-hook-form'

import CartIcon from '../../components/CartIcon';
import CustomButton  from '../../components/CustomButton'
import CustomInput  from '../../components/CustomInput'
import dinakdakan from './images/dinakdakan.png'
import karekare from './images/karekare.png'
import halohalo from './images/halohalo.png'
import minatamis from './images/minatamis.png'
import Logo from '../../components/Logo';

export default function HomeScreen({ navigation }) {
  const {width} = useWindowDimensions();
  const { user } = useAuthentication();
  const auth = getAuth(app)
  const {control, handleSubmit,setError, formState: {errors}} = useForm();


  return (
    <ScrollView showsVerticalScrollIndicator={false}>  
      <View style={styles.searchAndIconContainer}>
        <View style={[styles.searchContainer , {width: width * 0.7}]}>
          <CustomInput 
            name="search"          
            placeholder="Search foods" 
            iconName='search'
            control={control}
          />          
        </View>
        <CartIcon/>
      </View>
      <Logo/>

      <View style={styles.container}>
        <Text style={styles.popular}>Most Popular Foods</Text>
        <View style={styles.foodsContainer}>        
          <View style={styles.itemContainer}>
            <Image 
              source={dinakdakan} 
              style={styles.image} 
              resizeMode="contain" 
            />  
            <Text>Crispy Pata Dinakdakan</Text>
            <Text>(2-3 person)</Text>
            <Text>Php 80.00</Text>
          </View>
          <View style={styles.itemContainer}>
            <Image 
              source={karekare} 
              style={styles.image} 
              resizeMode="contain" 
            />  
            <Text>Kare-Kare</Text>
            <Text>(2-3 person)</Text>
            <Text>Php 90.00</Text>
          </View>
        </View>

        <Text style={styles.popular}>Most Popular Dessert</Text>
        <View style={styles.foodsContainer}>        
          <View style={styles.itemContainer}>
            <Image 
              source={minatamis} 
              style={styles.image} 
              resizeMode="contain" 
            />  
            <Text>Minatamis</Text>
            <Text>Php 25.00</Text>
          </View>
          <View style={styles.itemContainer}>
            <Image 
              source={halohalo} 
              style={styles.image} 
              resizeMode="contain" 
            />
            <Text>Halo-halo</Text>
            <Text>Php 40.00</Text>
          </View>
        </View>
      </View>
      <View style={[styles.btnContainer]}>
        <CustomButton 
          text="Get A Meal"
          onPress={()=>{}}       
        />
      </View>
 
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  searchAndIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 50,
    marginBottom: 20,
  },
  btnContainer:{
    paddingHorizontal: 30,
    marginBottom: 10,
  },
  container:{
    marginVertical: 30,
  },
  popular:{
    paddingLeft: 20,
    fontWeight: 500,
    fontSize: 20,
  },
  itemContainer:{
    alignItems: 'center',
    marginVertical: 30,
  },
  image:{
    width: 146,
    height: 120,
  },
  foodsContainer:{
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  }
});