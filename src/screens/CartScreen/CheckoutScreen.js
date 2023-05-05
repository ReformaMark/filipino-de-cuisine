import { Dimensions, StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native'
import React,{useEffect, useState} from 'react';
import { Icon } from 'react-native-elements';
import { useForm} from 'react-hook-form'
import Breakfast from '../MenuScreen/images/breakfast.png';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';
import CustomInput from '../../components/CustomInput/CustomInput';
import { colors } from '../../global/styles';
import { CheckBox, Dialog } from '@rneui/themed';
import * as WeBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native';
import CustomButton from '../../components/CustomButton/CustomButton';

const CheckoutScreen = ({ navigation }) => {
  const [basketItem, setBasketItem] = useState([]);
  const [quantity , setQuantity] = useState();
  const {control, handleSubmit,setError,reset, watch} = useForm();
  const [checkGCASH, setCheckGCASH] = useState(false);
  const [checkMaya, setCheckMaya] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [ paymentMethodError , setPaymentMethodError] = useState(false)
  const [visible, setVisible] = useState(false);
  const [user, setUser ] = useState();
  const [customer, setCustomer] = useState();
  const [loading, setLoading ] = useState(true);
  const [isRendered, setIsRendered] = useState(true);
  const [orderItemsId, setorderItemsId] = useState([]);

useEffect(()=>{
  getData()
},[isRendered])

useEffect(()=>{
  const CheckUserId = async() =>{
    if(user != undefined){
      const response = await axios.get(`http://192.168.100.18:3000/api/customerInfo/${user.uid}`)
      .then((res)=>{
        console.log(res.data)
        setCustomer(res.data)
        setCustomerInfoToState()
      }).catch((error)=>{
          console.log(error);
        
      })
    } else {
        getData()
    }
  }
  CheckUserId();
},[user])


const setCustomerInfoToState = ()=>{
  setDisplayName(user.displayName)
  setContact(customer.defaultContactNumber)
  setAddress(customer.defaultAddress)
}


useEffect(() => {
  const timeoutId = setTimeout(() => {
      setLoading(false);

  }, 1500); // delay for 1 second

  return () => clearTimeout(timeoutId);
}, []);
useEffect(() => {
const timeoutId = setTimeout(() => {
  setIsRendered(false);

}, 1000); // delay for 1 second

return () => clearTimeout(timeoutId);
}, []);

const getData = () =>{
  try {
      AsyncStorage.getItem('User')
      .then(value => {
      if(value != null){
          const userParse = JSON.parse(value)
          setUser(userParse)
      }
  }).catch(error =>{
      console.log(error)
  })
  } catch (error) {
      console.log(error)
  }
  
}
  // fetch the cartItems of the Current User
  useEffect(() => {
    const fetchOrderItem = async () => {
      try {
        const response = await axios.get('http://192.168.100.18:3000/api/basketItem');
        setBasketItem(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrderItem();
  }, [quantity]);

  const filteredOrderItems = basketItem.filter((item) => item.customerId === user.uid );
  const subTotal = filteredOrderItems.reduce((total, item) => total + parseFloat(item.menuItem.price * item.quantity), 0);

  const deliveryFee = 49;

  const totalPrice = subTotal + deliveryFee;

  const handleCheckeBoxGcashPress = () => {
    setPaymentMethod('GCASH');
    setCheckGCASH(true);
    setCheckMaya(false);
    setPaymentMethodError(false);
  };
  
  const handleCheckeBoxMayaPress = () => {
    setPaymentMethod('MAYA');
    setCheckGCASH(false);
    setCheckMaya(true);
    setPaymentMethodError(false);
  };

  const handlePlaceOrder = async () =>{
    if(paymentMethod === ''){
      setPaymentMethodError(true);
    } else {
      const response = await axios.post(
        'http://192.168.100.18:3000/api/payment_intents',
        { amount: totalPrice * 100}
      ).then((res)=>{
        console.log(res.data)
        axios.post(
          'http://192.168.100.18:3000/api/payment_methods',
          { paymentMethod: paymentMethod}
        ).then((res)=>{
          console.log(res.data)
          axios.post(
            'http://192.168.100.18:3000/api/attach_payment_method_intent')
            .then((res)=>{
            try {
             AsyncStorage.setItem('PaymentIntentId', res.data.id)
              .then(()=> console.log('PaymentIntentId successfully saved'))
              .catch((error)=>{
                console.log(error)
              })
             
            } catch (error) {
              console.log(error)
            }
            try {
             AsyncStorage.setItem('PaymentIntentId', res.data.id)
              .then(()=> console.log('PaymentIntentId successfully saved'))
              .catch((error)=>{
                console.log(error)
              })
             
            } catch (error) {
              console.log(error)
            }
            Linking.openURL(res.data.attributes.next_action.redirect.url)
            navigation.reset({
              index: 0,
              routes: [{ name: 'PaymentStatusScreen', params: { displayName:displayName, contact:contact, address:address } }],
  
            });
          })
        })
      })
    }
    
  }

  const toggleDialog = () => {
   setVisible(!visible)
  };

  const handleEditAddress = (data)=>{
    setAddress(data.address)
    setContact(data.phoneNumber)
    setDisplayName(data.name)
    toggleDialog()
  }
  return (
    <>
    {loading ? (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    ) :
    <ScrollView>
    <View style={styles.root}>
      <View style={styles.customerInfoContainer}>
        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
          <Text style={{fontSize: 15, fontWeight: '700'}}>Delivery Address</Text>
          <TouchableOpacity onPress={toggleDialog}>
            <Text style={{fontSize: 15, fontWeight: '700'}}>Edit</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.customerInfo}>
          <Text style={{fontSize: 12, fontWeight: '400'}}>Name: {displayName}</Text>
          <Text style={{fontSize: 12, fontWeight: '400'}}>Contact No: {contact}</Text>
          <Text style={{fontSize: 12, fontWeight: '400'}}>Address: {address}</Text>
        </View>
      </View>
      <Dialog
          isVisible={visible}
          onBackdropPress={toggleDialog}
          style={{borderColor: 'black', borderWidth: 2, borderRadius: 100, padding: 30}}
        >
        <View style={{padding: 10}}>
        <Dialog.Title title="Edit Address" />
        <Text style={styles.label}>Name</Text>
            <CustomInput 
                name="name"          
                placeholder="name" 
                control={control}
                rules={{
                required: "Name is required"
                }}
            />
            <Text style={styles.label}>Contact Nnumber</Text>
            <CustomInput 
                name='phoneNumber'
                control={control}     
                placeholder="Phone number"
                keyboardType='numeric'
                rules={{
                    required: "Phone number is required", 
                    minLength: {value: 11, message: "Please enter a valid phone number."}
                }}            
            />
            <Text style={styles.label}>Address</Text>
            <CustomInput 
                name="address"          
                placeholder="Address" 
                control={control}
                rules={{
                required: "Address is required"
                }}
            />
          <View style={{marginVertical: 20}}>
           <CustomButton 
            text='Submit'
            onPress={handleSubmit(handleEditAddress)}
           />
        </View>
        </View>
        </Dialog>
      <View style={[styles.orderItemContainer, { maxHeight: Dimensions.get('screen').height * 0.28 }]} >
        <ScrollView showsVerticalScrollIndicator={true}  >
          {filteredOrderItems.map((item) => (
          <View key={item.id} style={styles.itemContainer}>
            <View style={styles.imageContainer}>
                <Image
                  resizeMode='cover'
                  style={styles.image}
                  source={{uri: item.menuItem.imgUrl}}
                />
              </View>  
            <View style={styles.TextContainer}>
              <View style={styles.namePriceContainer}>
                <Text style={styles.name}>{item.menuItem.name}</Text>
                <Text style={styles.price}>₱ {item.menuItem.price * item.quantity}</Text>
              </View>
              <View style={styles.quantityContainer}>
                <Text style={styles.quantity}>Quantity:</Text>
                <View style={styles.qtyBtnContainer}>
                  <Text style={styles.quantity}>{item.quantity}</Text>
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
      
      <View style={styles.paymentMethodContainer}>
          <Text style={{fontSize: 15, fontWeight: '500'}}>Payment Methods</Text>
          <CheckBox
              title="GCash"
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checked={checkGCASH}
              onPress={handleCheckeBoxGcashPress}
              size={25}
              iconStyle={{ marginRight: 10, }}
              containerStyle={{backgroundColor: 'transparent'}}
          />
          <CheckBox
        
              title="Maya"
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checked={checkMaya}
              onPress={handleCheckeBoxMayaPress}
              containerStyle={{backgroundColor: 'transparent'}}
          />
          {paymentMethodError &&
          <>
            <Text style={{color: 'red'}}>Please choose payment method first.</Text>
            
          </> 
        
        }
      </View>
      <TouchableOpacity style={styles.checkoutBtn} onPress={handlePlaceOrder}>
          <Text style={{color:'white'}}>Place Order</Text>
          <Icon 
              name='cart-plus'
              type='font-awesome'
              color='white'
              size={26}
          />
      </TouchableOpacity>    
    </View>
    </ScrollView>
    }
    </>
  )
}



export default CheckoutScreen

const styles = StyleSheet.create({
  root:{
    backgroundColor: 'white',
    height: '100%',
    width: Dimensions.get('screen').width,
    alignItems:'center',
    paddingHorizontal: 20,
  },
  label:{
    marginTop: 10,
  },
  orderItemContainer:{
    marginBottom: 10,
  },
  container:{
    padding: 50,
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  customerInfoContainer:{
    width:Dimensions.get('screen').width - 30,
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(128, 128, 128, 0.87)',
    backgroundColor: 'rgba(217, 217, 250, 0.2)',
  },
  customerInfo:{
    marginVertical: 10,
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
    padding: 10,
  },
  checkoutBtn:{
    flexDirection: 'row',
    padding: 10,
    width: Dimensions.get('screen').width - 40,
    backgroundColor: "rgba(16, 185, 129, 1)",
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 30,
  },
  paymentMethodContainer:{
    width: "100%",
    marginVertical: 10,
    backgroundColor: 'rgba(217, 217, 250, 0.2)',
    borderColor: 'rgba(217, 217, 250, 0.8)',
    borderWidth: 1,
    padding: 20,
  },
   image:{
    width: 65,
    height: 65,
    borderRadius: 1000,
  },
})