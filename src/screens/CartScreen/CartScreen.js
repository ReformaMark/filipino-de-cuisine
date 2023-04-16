import { Dimensions, StyleSheet, Text, View, Image } from 'react-native'
import React,{useEffect, useState} from 'react';
import { Icon } from 'react-native-elements';
import {useForm} from 'react-hook-form'
import Breakfast from '../MenuScreen/images/breakfast.png';
import { useAuthentication } from '../../hooks/useAuthentication';
import axios from 'axios';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import CustomInput from '../../components/CustomInput/CustomInput';
import { colors } from '../../global/styles';


const CartScreen = ({ navigation }) => {
  const { user } = useAuthentication();
  const [orderItem, setOrderItem] = useState([]);
  const [quantity , setQuantity] = useState();
  const {control, handleSubmit,setError,reset, watch} = useForm();
  // fetch the cartItems of the Current User
  useEffect(() => {
    const fetchOrderItem = async () => {
      try {
        const response = await axios.get('http://192.168.100.18:3000/api/orderItem');
        setOrderItem(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrderItem();
  }, [quantity]);

  const filteredOrderItems = orderItem.filter((item) => item.userId === user.uid);
  const subTotal = filteredOrderItems.reduce((total, item) => total + parseFloat(item.price), 0);

  const deliveryFee = 49;

  const totalPrice = subTotal + deliveryFee;
  async function handleAddBtn(itemId, currentQuantity) {
    const updatedQuantity = currentQuantity + 1;

    try {
      await axios.put(
        `http://192.168.100.18:3000/api/orderitem/${itemId}`,
        {
          quantity: updatedQuantity,
        }
      );


    } catch (error) {
      console.log(error);
    }
  }

  const handleSubtractBtn = async (itemId, currentQuantity) => {
    const updatedQuantity = currentQuantity - 1;

    try {
      await axios.put(
        `http://192.168.100.18:3000/api/orderitem/${itemId}`,
        {
          quantity: updatedQuantity,
        }
      );

     
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleAddBtnPress = (itemId, currentQuantity) => {
    handleAddBtn(itemId, currentQuantity);
    setQuantity(() => currentQuantity + 1)
  };
  const handleSubtractBtnPress = (itemId, currentQuantity) => {
    handleSubtractBtn(itemId, currentQuantity);
    setQuantity(() => currentQuantity - 1)
  };


  return (
    <View style={styles.root}>
      {filteredOrderItems == null ? 
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
        <>
        <View style={styles.orderItemContainer}>
          <ScrollView showsVerticalScrollIndicator={true} >
            {filteredOrderItems.map((item) => (
            <View key={item.id} style={styles.itemContainer}>
              <View >
                <Image source={Breakfast} style={styles.imageContainer}/>
              </View>
              <View style={styles.TextContainer}>
                <View style={styles.xBtn}>
                  <TouchableOpacity>
                    <Text>x</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.namePriceContainer}>
                  <Text style={styles.name}>{item.menuItem.name}</Text>
                  <Text style={styles.price}>₱ {item.price}</Text>
                </View>
                <View style={styles.quantityContainer}>
                  <Text style={styles.quantity}>Quantity:</Text>
                  <View style={styles.qtyBtnContainer}>
                    <TouchableOpacity 
                      onPress={() => handleSubtractBtnPress(item.id, item.quantity)} 
                      disabled={item.quantity === 1}>
                      <Text style={styles.minus}>-</Text>
                    </TouchableOpacity>
                    <Text>{item.quantity}</Text>
                    <TouchableOpacity 
                      onPress={() => handleAddBtnPress(item.id, item.quantity)}>
                      <Text style={styles.add}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>  
            </View>
            ))}            
          </ScrollView>
        </View>
        <View style={styles.summaryContainer}>
          <Text style={styles.summary}>Order Summary</Text>
          <Text style={styles.subtotal}>SubTotal: ₱ {subTotal} </Text>
          <Text style={styles.delFee}>Delivery Fee: ₱ 49</Text>
          <View style={styles.voucherContainer}>
            <View style={styles.inputVoucherContainer}>
            <CustomInput 
              name='code'
              control={control}
              placeholder="Enter voucher code" 
            />
            </View>
            <TouchableOpacity style={styles.apply}>
              <Text style={{color: 'white'}}>APPLY</Text>
            </TouchableOpacity>            
          </View>
          <Text style={styles.totalPrice}>Total Price: ₱ {totalPrice}</Text>
        </View>
   
          <TouchableOpacity style={styles.checkoutBtn}>
            <Text style={{color:'white'}}>Check Out</Text>
            <Icon 
              name='cart-plus'
              type='font-awesome'
              color='white'
              size={26}
            />
          </TouchableOpacity>
        </>
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
  orderItemContainer:{
    height: Dimensions.get('screen').height * 0.43,
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
    backgroundColor: 'rgba(217, 217, 250, 0.2)',
    width:Dimensions.get('screen').width - 30,
    height: Dimensions.get('screen').height * 0.13,
    marginVertical: 5,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  imageContainer:{
    borderRadius: 150,
    width: Dimensions.get('screen').width * 0.2,
    height: 75,
  },
  namePriceContainer:{
    flexDirection: 'row',
  },
  name:{
    fontSize: 10,
    fontWeight: '700',
    width: Dimensions.get('screen').width * 0.40,
  },
  price:{
    fontSize: 10,
    fontWeight: '700',
    
  },
  qtyBtnContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(217, 217, 217, 0.4)',
    marginLeft: 30,
    borderRadius: 30,
  },
  quantityContainer:{
    flexDirection: 'row',
  },
  quantity:{
    fontSize: 10,
    fontWeight: '700',
  },
  add:{
    fontSize: 20,
    fontWeight: '400',
    marginHorizontal: 10,
    color: 'rgba(222, 57, 5, 1)',
  },
  minus:{
    fontSize: 20,
    fontWeight: '600',
    marginHorizontal: 10,
    color: 'rgba(222, 57, 5, 1)',
  },
  TextContainer:{
    gap: 10,
  },
  xBtn:{
    position: 'absolute',
    top: -25,
    left: 170,
  },
  summaryContainer:{
    width: "100%",
    padding: 20,
    backgroundColor: 'rgba(217, 217, 250, 0.2)',
    borderColor: 'rgba(217, 217, 250, 0.8)',
    borderWidth: 1,
  },
  voucherContainer:{
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'space-between',
  
  },
  inputVoucherContainer:{
    width: "70%",
  
  },
  apply:{
    backgroundColor: 'rgba(220, 38, 38, 1)',
    padding: 10,
    borderRadius: 20,
  },
  summary:{
    fontSize: 22,
    fontWeight: '600',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    paddingBottom: 10,
    marginBottom: 10,
  },
  subtotal:{

  },
  delFee:{

  },
  totalPrice: {

  },
  checkoutBtnContainer:{
    width: "100%",
    
    padding: 15,
   
    
  },
  checkoutBtn:{
    flexDirection: 'row',
    padding: 15,
    width: Dimensions.get('screen').width - 40,
    backgroundColor: "rgba(16, 185, 129, 1)",
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
})