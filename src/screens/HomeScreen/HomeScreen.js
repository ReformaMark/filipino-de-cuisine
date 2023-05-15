import React,{useEffect, useState} from 'react';
import { StyleSheet, Text, View,ScrollView, Image, useWindowDimensions, TouchableOpacity } from 'react-native';
import { useForm } from 'react-hook-form'
import { useAuthentication } from '../../hooks/useAuthentication';
import CartIcon from '../../components/CartIcon';
import CustomInput  from '../../components/CustomInput'
import Logo from '../../components/Logo';
import CrispyPata from './images/CrispyPata.png'
import Veggies from './images/Veggies.png'
import Foods from './images/Food.png'
import { Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AirbnbRating } from '@rneui/themed';
import axios from 'axios';

export default function HomeScreen({ navigation }) {
  const [mostOrderItem ,setMostOrderItem] = useState([]);
  const {width} = useWindowDimensions(); 
  const {control, handleSubmit,setError, formState: {errors}} = useForm();

  useEffect(()=>{
    getData()
  },[])
  const getData = ()=>{
    try {
      AsyncStorage.getItem('User')
        .then((value)=>{
          if(value != null){
            console.log(value)
          }
        })
    } catch (error) {
      
    }
  } 

  useEffect(()=>{
    const getMostOrdered = async()=>{
      await axios.get(`http://192.168.100.18:3000/api/most-ordered-item`)
      .then((res)=>{
     
        setMostOrderItem(res.data)
      })
      .catch((err)=>{
        console.log(err)
      })
    }
    getMostOrdered()
  },[])


  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor:'white'}} >  
      <View style={styles.searchAndIconContainer}>
       
        <CartIcon/>
        
      </View>
      <Logo/>

      <View style={styles.container}>
        <View>
          <Text style={styles.greetings}>Welcome to Filipino de Cuisine!</Text>
          <Text style={styles.getOrder}>Let us get your order</Text>
          
          <View style={styles.mainContentContainer}>
            <View style={styles.leftContainer}>
              <Text style={styles.ratings}>Ratings&Reviews</Text>
              <View style={styles.starContainer}>
              <AirbnbRating
                count={5}
                isDisabled={true}
                showRating={false}
                defaultRating={4}
                size={20}
              />
              </View>
              <View style={styles.imageContainer}>
                <Image source={Veggies}/>
              </View>
              
            </View>

            <View style={styles.rightContainer}>
              <View style={styles.imageContainer}>
                <Image source={Foods}/>
              </View>
              <View style={styles.foodTextContainer}>
                <Text style={[styles.foodText, {fontSize: 17, fontWeight: '400'}]}>Food</Text>
                <Text style={[styles.foodText, {fontSize: 12, fontWeight: '400'}]}>Order food you love</Text>
              </View>              
              <Text style={styles.text}>Don't miss out on the mouth-watering flavors of Filipino de Cuisine!</Text>
              
            </View>
          </View>
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Menu')} style={styles.btnOutline}>
            <Text style={styles.orderNow}>Order Now</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnPrimary}>
            <Text onPress={() => navigation.navigate('Reservation')} style={styles.bookReservation}>Book a Reservation</Text>
          </TouchableOpacity>
        </View>
        {mostOrderItem && mostOrderItem.map((item)=>(
          <View key={item.id} style={styles.popularDish}>
          <View style={styles.popularDishImage}>
            <Image source={{uri:item.imgUrl}} style={styles.dish}/>
          </View>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.price}>₱ {item.price}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
        ))
        }
      </View>
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  
  searchAndIconContainer: {
    flexDirection: 'row',
    
    justifyContent: "flex-end",
    marginTop: 50,
    marginBottom: 20,
    marginRight: 20,
  },
  greetings:{
    fontSize: 15,
    fontWeight:'700',
    textAlign: 'center',
  },
  getOrder:{
    marginTop: 10,
    textAlign: 'center',
    color: 'rgba(32, 44, 89, 0.51)',
    fontSize:10,
    fontWeight: '600',
  },
  mainContentContainer:{
    flexDirection: 'row',
    marginTop: 20,
  },
  imageContainer:{
    elevation: 5,
  },
  leftContainer:{
    flexBasis: '50%',
  },
  rightContainer:{
    flexBasis: '50%',
  },
  starContainer:{
    width: '100%',
    marginVertical: 12,
    alignItems: 'center',
  },
  ratings:{
    textAlign: 'center',
    textDecorationLine: 'underline',
    fontWeight: '400',
    fontSize: 13,
    marginTop: 20,
    lineHeight: 13,
    color: 'rgba(0, 0, 0, 1)',
  },
  foodTextContainer:{
    elevation: 6,
    position: 'absolute',
    top: 66,
    left: 10,
  },
  foodText:{
    color: 'white',
  },
  text:{
    textAlign: 'justify',
    fontSize: 15,
    fontWeight: '400',
  },
  container:{
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    backgroundColor:'rgba(0, 0, 100, 0.10)',
    marginTop: 30,
    padding: 20,
  },
  btnContainer:{
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 80,
  },
  btnOutline:{
    alignItems: 'center',
    justifyContent:'center',
    padding: 10,
    borderColor: 'rgba(16, 185, 129, 1)',
    borderStyle: 'solid',
    borderWidth: 5,
    borderRadius: 15,
    color: 'rgba(16, 185, 129, 1)',
    marginHorizontal: 20,
  },
  orderNow:{
    color: 'rgba(16, 185, 129, 1)',
    fontSize: 15,
    fontWeight: '600',
  },
  btnPrimary:{
    alignItems: 'center',
    justifyContent:'center',
    borderRadius: 15,
    padding: 10,
    backgroundColor: 'rgba(16, 185, 129, 1)',

  },
  bookReservation:{    
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
  },
  popularDish:{
    backgroundColor:'#fff',
    borderRadius: 25,
    padding: 20,
  },
  popularDishImage:{
   position: 'absolute',
   top: -50,
   left: 0,
  },
  dish:{
    width: Dimensions.get('screen').width * 0.4,
    height: 135,
  },
  name:{
    fontSize: 22,
    fontWeight: '700',
    marginLeft: Dimensions.get('screen').width * 0.36,
  },
  price:{
    fontSize: 14,
    fontWeight: '700',
    marginLeft: Dimensions.get('screen').width * 0.36,
    marginBottom: 10,
  },
  description:{
    fontSize: 8,
    fontWeight: '400',
  },
  
 
});