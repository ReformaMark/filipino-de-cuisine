import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React,{useEffect, useState} from 'react';
import { Icon } from '@rneui/themed';
import { color } from '@rneui/base';


const CartScreen = ({ navigation }) => {
  const [cartItems, setCartItems] = useState([]);

  // fetch the cartItems of the Current User
  useEffect(()=>{

  },[])


  return (
    <View style={styles.root}>
      {cartItems == 0 ? 
        <View style={styles.container}>
          <Text style={styles.text}>Your cart is empty</Text>
          <View style={styles.addSomething}>
            <Text style={styles.textAdd} onPress={()=> navigation.navigate('MenuScreen')}>Add something</Text>
            <Icon 
              name='add-circle-outline'
              color='rgba(24, 24, 24, 1)'       
            />          
          </View>
        </View>
        :
        <View>
          <Text>List of cart Items</Text>
        </View>
      }     
    </View>
  )
}



export default CartScreen

const styles = StyleSheet.create({
  root:{
    backgroundColor: '#CBCBCB',
    height: '100%',
    width: Dimensions.get('screen').width,
    alignItems:'center',
    
  },
  container:{
    padding: 50,
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  text:{
    fontWeight: '400',
    textAlign: 'center',
    color: 'rgba(128, 128, 128, 0.87)',
    fontSize: 24,
  },
  addSomething:{
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
  },
  textAdd:{
    fontSize: 14,
    fontWeight: '400',
    color: 'rgba(24, 24, 24, 1)',
  }
})