import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React,{ useLayoutEffect } from 'react'
import CartIcon from '../../components/CartIcon';
import CustomInput from '../../components/CustomInput';
import {useForm } from 'react-hook-form'
import Logo from '../../components/Logo';
import { Card, Image } from '@rneui/themed';

import Breakfast from './images/breakfast.png'
import Lunch from './images/launch.png'
import Dinner from './images/dinner.png'
import CustomButton from '../../components/CustomButton';
import CustomSearchBar from '../../components/CustomSearchBar/CustomSearchBar';

const MenuScreen = ({navigation}) => {
  const {control, handleSubmit,setError, formState: {errors}} = useForm();

  //set icon to the right of the header navbar
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ marginRight: 20, justifyContent:'center' }}>
          <CartIcon/>
        </View>
      ),
    });
  }, [navigation]);


  return (
    <View style={styles.root}>
      <CustomSearchBar/>
      <View>
        <Logo/>
      </View>
      <View style={[styles.container,]}>
        <TouchableOpacity onPress={() => {navigation.push('FoodScreen')}}>
          <Card containerStyle={{padding: 0, width: 145, backgroundColor: 'transparent', borderColor: '#fff' }}>
            {/*need to use array map when fetching data from db example: https://reactnativeelements.com/docs/components/card */}
            <Card.Image
              style={styles.image}
              resizeMode="cover"
              source={Breakfast}
            />
            <CustomButton 
                text="Breakfast"
                onPress={handleSubmit(()=>{})}      
            />
          </Card>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {navigation.push('FoodScreen')}}>
          <Card containerStyle={{padding: 0, width: 145, backgroundColor: 'transparent', borderColor: '#fff' }}>
            {/*need to use array map when fetching data from db example: https://reactnativeelements.com/docs/components/card */}
            <Card.Image
              style={styles.image}
              resizeMode="cover"
              source={Lunch}
            />
            <CustomButton 
                text="Lunch"
                onPress={handleSubmit(()=>{})}      
            />
          </Card>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {navigation.push('FoodScreen')}}>
          <Card containerStyle={{padding: 0, width: 145, backgroundColor: 'transparent', borderColor: '#fff' }}>
            {/*need to use array map when fetching data from db example: https://reactnativeelements.com/docs/components/card */}
            <Card.Image
              style={styles.image}
              resizeMode="cover"
              source={Dinner}
            />
            <CustomButton 
                text="Dinner"
                onPress={handleSubmit(()=>{})}      
            />
          </Card>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default MenuScreen

const styles = StyleSheet.create({
  root:{
    backgroundColor: '#fff',
    height: Dimensions.get('screen').height,
  },
  container: {
    borderRadius: 100,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  image: {
    width: 145,
    marginBottom: 10,
  
  },
})