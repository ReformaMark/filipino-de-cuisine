import { Dimensions, StyleSheet, Text, View, Image } from 'react-native'
import React,{useEffect, useState, useContext} from 'react';
import { Button, Icon } from '@rneui/themed';
import { CartContext } from '../../context/cartContext';
import Breakfast from '../MenuScreen/images/breakfast.png';

const CartScreen = ({ navigation }) => {
  const {cartItems} = useContext(CartContext);
  const [quantity, setQuantity ] = useState(1)
  // fetch the cartItems of the Current User
  useEffect(()=>{

  },[])

  const handleAddBtn = () => {
    setQuantity(quantity + 1)
  }
  const handleSubtractBtn = () => {
    setQuantity(quantity - 1)
  }


  return (
    <View style={styles.root}>
      {cartItems == null ? 
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
          {cartItems.map((item) => (
          <View  key={item.id} style={styles.itemContainer}>
            <View>
              <Image source={Breakfast}/>
            </View>
            <View style={styles.TextContainer}>
              <View>
                <Text>{item.name}</Text>
                <Text>{item.price}</Text>
              </View>
              <View>
                <Text>Quantity:</Text>
                <Button title="-" type="outline" onPress={handleSubtractBtn}/>
                <Text>{quantity}</Text>
                <Button title="+" type="outline" onPress={handleAddBtn}/>
              </View>
            </View>  
          </View>
          ))}
          
        </View>
      }     
    </View>
  )
}



export default CartScreen

const styles = StyleSheet.create({
  root:{
    backgroundColor: 'white',
    height: '100%',
    width: Dimensions.get('screen').width,
    alignItems:'center',
    paddingHorizontal: 20,
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
  },
  itemContainer:{
    flexDirection: 'row',
    backgroundColor: 'rgba(217, 217, 217, 0.2)',
    width:Dimensions.get('screen').width - 30,
    marginVertical: 5,
    
  },
})