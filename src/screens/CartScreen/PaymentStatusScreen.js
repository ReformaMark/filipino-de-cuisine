import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import CustomButton from '../../components/CustomButton/CustomButton';
import { CheckBox, Icon } from '@rneui/themed';
import * as Linking from 'expo-linking';
import { getAuth } from 'firebase/auth';
const PaymentStatusScreen = ({navigation, route}) => {
  const {displayName, contact, address, notes} = route.params;
  const [loading, setLoading ] = useState(true);
  const [getStatus, setGetStatus ] = useState(false);
  const [isGettingData, setIsGettingData ] = useState(false);
  const [status, setStatus ] = useState('');
  const [customer, setCustomer] = useState();
  const [user, setUser ] = useState();
  const [ succeeded , setSucceeded] = useState(false);
  const [isRendered, setIsRendered] = useState(true);
  const [orderId, setOrderId] = useState(0);
const auth=getAuth();


  useEffect(()=>{
    getData()
  },[isRendered])
  
  //this will trigger the getData() to have a PaymentIntent Id
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

  //this will setloading to false after 60 seconds after that it will render the result of payment(succeed, failed or expired)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
        setLoading(false);
  
    }, 6000); // delay for 60 seconds
  
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setGetStatus(!getStatus);
  
    }, 5000); // delay for 50 seconds
  
    return () => clearTimeout(timeoutId);
  }, [loading]);

  useEffect(()=>{
    const CheckUserId = async() =>{
      if(user != undefined){
        const response = await axios.get(`http://192.168.100.18:3000/api/customerInfo/${auth.currentUser.uid}`)
        .then((res)=>{
          setCustomer(res.data)
        }).catch((error)=>{
            console.log(error);
          
        })
      } 
    }
    CheckUserId();
  },[user])

  

  useEffect(() => {
    const getPaymentIntentStatus = async() =>{
      await axios.get(`http://192.168.100.18:3000/api/payment_intents/`)
        .then(response => {
          const {paymentIntentId, paymentStatus} = response.data;
          console.log(`This is from get payment intent status function: ${paymentStatus}`)
          if(paymentStatus === 'succeeded'){
            
            axios.post('http://192.168.100.18:3000/api/order', 
            {
              customerName: displayName, 
              customerId: customer?.id, 
              address: address,
              contactNumber: contact,
              deliveryFee: "80.00",
              customerId: auth.currentUser.uid,
              additionalNotes: notes,
              paymentIntentId: paymentIntentId
            }).then(result => {
           
              setOrderId(result.data?.id)
            }).catch(error=>{
              console.log(error)
            })
          }
          setStatus(paymentStatus)
        })
        .catch(error=>{
          console.log(`Error from get payment intent status: ${error}`)
        })
    }
    getPaymentIntentStatus()
  }, [getStatus]);

  
  const handlePaymentSuccess = () =>{
    navigation.navigate('OrderSuccessScreen',{orderId: orderId})
  }
  console.log(`The status is : ${status}`);
  return (
    <View>
      {loading ?(
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) :
      <View style={styles.rootContainer}>
      {status === 'awaiting_next_action' ? (
        <View style={styles.container}>
          <Text style={styles.resultText}>Failed to complete your payment.</Text>
          <CustomButton 
            text='Refresh'
            onPress={()=>setGetStatus(!getStatus)}
          />
          <View style={{marginTop: 20}}>
          
          <CustomButton 
              text="Go back"
              onPress={()=> navigation.navigate('MainTab')}      
          />
          </View>
        </View>
      ) : status === 'succeeded' ? (
        <View style={styles.container}>
          <Icon 
            name='check-circle'
            type='feather'
            size={40}
          />
            <Text style={styles.resultText}>Payment Successfully</Text>
            <CustomButton
             text='Okay'
             onPress={handlePaymentSuccess}
             />
        </View>
      ) : status === 'processing' ? (
        <View style={styles.container}>
          <Text style={styles.resultText}>Your payment is still processing. Refresh to contiue.</Text>
          <View>
            <CustomButton 
                text="Refresh"
                onPress={()=> setGetStatus(!getStatus)}      
            />   
          </View>     
        </View> 
      ): status === 'expired' ? (
        <View style={styles.container}>
          <Text style={styles.resultText}>The payment session for this order has expired. Please choose a new payment method.</Text>
          <CustomButton 
            text='Okay' 
            onPress={()=>navigation.navigate('CheckoutScreen')}  
          />
        </View>
      ) :
      <View>
         <View style={styles.container}>
        <Text style={styles.resultText}>Failed to finish payment or the payment session has expired.</Text>
        <View style={{marginBottom: 20}}>
        <CustomButton 
            text="Okay"
            onPress={()=> navigation.navigate('CheckoutScreen')}      
        />
        
        </View>
        <CustomButton 
            text="Return to Home"
            onPress={()=> navigation.navigate('MainTab')}      
        />
        </View>
      </View>
      }
        
      </View>
      }
    </View>
  )
}

export default PaymentStatusScreen

const styles = StyleSheet.create({
  loading:{
    position:'absolute',
    top: 320,
    left: 165,
  },
  rootContainer:{
    paddingTop: 250,
    paddingHorizontal: 30,
  },
  container:{
    padding: 30,
    borderWidth: 1,
    borderColor: 'black',
  },
  resultText:{
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 500,
    marginVertical: 20,
  }
})