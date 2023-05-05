import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Palabok from './images/palabok.png';
import Food from './images/food.jpg';
import { Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const AboutUsScreen = () => {
  return (
    <ScrollView style={{backgroundColor:'white'}}>
      <View style={{flexDirection: 'row', paddingHorizontal: 10, gap: 20}}>
        <View style={{width: '57%', height: 220}}>
          <Text style={{textAlign: 'center', fontSize: 12, fontWeight:'300'}}>Welcome to Filipino de Cuisine Restaurant, where we offer a unique dining experience that showcases the flavors of Filipino cuisine. Our restaurant is dedicated to providing delicious, high-quality food that is made with fresh ingredients and authentic Filipino recipes.</Text>
        </View>
        <LinearGradient
        // Button Linear Gradient
        colors={['rgba(255, 255, 255, 0.3)', 'rgba(16, 185, 129, 0.4)', 'rgba(16, 185, 129, 1)']}
        style={{width: 115}}>
        <Image
          source={Palabok}
          resizeMode='contain'
          style={{width: 115, height: 100, position: 'relative', top:0, left: -40 }}
        />
       </LinearGradient>
      </View>
      <View style={{flexDirection: 'row', position: 'absolute', top: 150, left: 25}}>
      <Text style={{color: 'rgba(16, 185, 129, 0.7)', fontSize: 48, fontWeight: '900'}}>Filipino</Text>
      <Text style={{color: 'rgba(255, 255, 255, 1)', fontSize: 48, fontWeight: '900', marginLeft: 15}}>food</Text>
      </View>
      <View style={{flexDirection: 'row', marginVertical: 20, gap:10, paddingHorizontal: 10}}>
        <View style={{height: 260, alignItems: 'center', justifyContent:'center',}}>
          <Image 
            source={Food}
            style={{width: 125, height: 230}}
          />
        </View>
        <View style={{flexBasis: '58%'}}>
          <Text style={{textAlign: 'center', fontSize: 10, fontWeight: 300,}}>.Our team is passionate about food and creating memorable dining experiences for our customers. Our chefs have years of experience in preparing Filipino dishes, and they bring that expertise to our restaurant. We believe that food is more than just sustenance - it is a way to connect with others and experience new cultures.</Text>
          <Text style={{textAlign: 'center', fontSize: 10, fontWeight: 300, marginTop: 10}}>At Filipino de Cuisine Restaurant, we strive to create an atmosphere that is welcoming and warm. We want our customers to feel like they are part of our family when they visit us. We take pride in providing exceptional customer service and ensuring that every customer leaves satisfied.</Text>
        </View>
      </View>
      <LinearGradient
        colors={['rgba(16, 185, 129, 1)', 'rgba(16, 185, 129, 0.7)', 'rgba(16, 185, 129, 0)']}
        style={{width: '100%', height: 130, padding: 10 }}>
        <Text style={{textAlign: 'center', fontSize: 12, fontWeight: 300,}}>.Our menu features a variety of Filipino dishes, including classic favorites like adobo, sinigang, and lechon, as well as unique dishes that showcase the diversity of Filipino cuisine. We use only the freshest ingredients and traditional cooking techniques to ensure that our dishes are authentic and delicious.</Text>
       </LinearGradient>
    </ScrollView>
  )
}

export default AboutUsScreen

const styles = StyleSheet.create({})