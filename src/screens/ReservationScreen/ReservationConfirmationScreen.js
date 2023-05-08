import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Divider } from 'react-native-elements';
import { TouchableOpacity } from 'react-native';
import { DateTime } from "luxon";
import { useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import CustomButton from '../../components/CustomButton/CustomButton';
import axios from 'axios';
import { Dialog } from '@rneui/themed';

const ReservationConfirmationScreen = ({navigation, route}) => {
  const auth = getAuth()
  const {data, date, paymentMethod, time, table } = route.params;
  const [visible1, setVisible1] = useState(false);
  const [loading, setLoading ] = useState(true);
  const [getStatus, setGetStatus ] = useState(false);
  const [status, setStatus ] = useState('');
  const [reservationId, setReservationId ] = useState('');
  const dateString = date;
  const setdate = new Date(dateString);
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = setdate.toLocaleDateString('en-US', options);

  const times = time;
  const formattedTimes = times.map((time) => {
    const dateTime = DateTime.fromISO(time);
    return dateTime.toLocaleString(DateTime.TIME_SIMPLE);
  });

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

  useEffect(() => {
    const getPaymentIntentStatus = async() =>{
      await axios.get(`http://192.168.100.18:3000/api/payment_intents/`)
        .then(response => {
          const {paymentIntentId, paymentStatus} = response.data;
          console.log(`This is from get payment intent status function: ${paymentStatus}`)
          if(paymentStatus === 'succeeded'){
            
            axios.post('http://192.168.100.18:3000/api/booking', 
            {
              selectedTimeslots: time, 
              selectedTableSlots: table, 
              customerId: auth.currentUser.uid,
              selectedDate: date,
              additionalNotes: "",
              paymentIntentId: paymentIntentId,
            }).then(result => {
              setReservationId(result.data.id)
            
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

  const toggleDialog1 = () => {
    setVisible1(!visible1);
  };

  const handleCancel = async()=>{
    const cancelReservation = await axios.put(`http://192.168.100.18:3000/api/reservation/${reservationId}`)
    .then(response=>{
      navigation.navigate("ReservationStatus", {id: reservationId})
    })
    .catch(error=>{
      alert("Error, something went wrong")
    })
  }
  return (
    <View style={{}}>
     {loading ?(
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) :
      <View style={styles.rootContainer}>
      {status === 'succeeded' ? (
        <>
          <View style={{backgroundColor:'white', borderColor:'black', borderWidth:1, borderRadius: 20, padding: 20,}}>
            <Text style={{textAlign: 'center', fontSize: 12, fontWeight:'400', marginBottom: 10}}>Reservation Confirmation</Text>
            <Text style={{textAlign: 'center', fontSize: 15, fontWeight:'700'}}>{data.name}</Text>
            <Text style={{textAlign: 'center', fontSize: 15, fontWeight:'700'}}>{formattedDate}</Text>
            <Text style={{textAlign: 'center', fontSize: 15, fontWeight:'700'}}>
              {formattedTimes.length === 1 ? formattedTimes[0] : 
                `${formattedTimes.slice(0, -1).join(", ")}${formattedTimes.length > 2 && ","} and ${formattedTimes.slice(-1)}`}
            </Text>
            <Text style={{textAlign: 'center', fontSize: 15, fontWeight:'700', color:'red'}}>TABLE {table.length > 1 ? `${table.slice(0, -1).join(", ")} and ${table.slice(-1)}` : table}</Text>
            <Divider width={2} color='black'/>
            <View style={{marginVertical: 20}}>
              <Text style={{textAlign:'center', fontSize: 14, fontWeight:'700'}}>Contact Us</Text>
              <Text style={{textAlign:'center', fontSize: 12, fontWeight:'700'}}>673 Quirino Highway, San Bartolome Novaliches, Quezon City.</Text>
              <Text style={{textAlign:'center', fontSize: 12, fontWeight:'700'}}>02 8806-3049</Text>
            </View>
            <Divider width={2} color='black'/>
            <View style={{marginVertical: 20}}>
              <Text style={{textAlign:'center', fontSize: 12, fontWeight:'600'}}>A note from us</Text>
              <Text style={{textAlign:'center', fontSize: 12, fontWeight:'400'}}>Thank you for booking with us! Your reservation at Filipino de Cuisine is confirmed. You may cancel your reservation only up to the day before your reserved date. Cancelled reservation are not refundable.</Text>
              <TouchableOpacity onPress={toggleDialog1} style={{marginVertical: 10}}>
                <Text style={{color:'#DC2626', textAlign:'center'}}>Cancel Reservation</Text>
              </TouchableOpacity>
            </View>
            <Divider width={2} color='black'/>
            <Text style={{textAlign:'center', fontSize: 12, fontWeight:'600'}}>Your Reservation ID is {reservationId && reservationId}</Text>
            
          </View>
          <View>
            <TouchableOpacity onPress={()=>navigation.reset({
              index: 0,
              routes: [{ name: 'ReservationSuccess' }],
            })} 
            style={{
              paddingHorizontal: 50,
              paddingVertical: 10, 
              borderRadius: 20, 
              marginVertical: 30, 
              backgroundColor:'#10B981',
              marginHorizontal:50,
            }}>
              <Text style={{color: 'white', textAlign:'center'}}>Okay</Text>
            </TouchableOpacity>
          </View>
          <Dialog
            isVisible={visible1}
            onBackdropPress={toggleDialog1}
            style={{borderColor: 'black', borderWidth: 2, borderRadius: 100, padding: 30}}
          >
            <View style={{padding: 10}}>
              <Text style={{fontSize: 24, fontWeight:'500'}}>Are you sure you want to cancel?</Text>
              <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <TouchableOpacity onPress={handleCancel} style={{ alignItems:'center', paddingVertical: 10 ,paddingHorizontal: 30, backgroundColor: '#10B981',marginVertical: 20,borderRadius: 30}}>
                  <Text style={{ textAlign:'center', fontSize: 15, fontWeight: '500', color: 'white'}}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleDialog1} style={{alignItems:'center',paddingVertical: 10 , paddingHorizontal: 30, backgroundColor: '#10B981',marginVertical: 20,borderRadius: 30}}>
                  <Text style={{ textAlign:'center', fontSize: 15, fontWeight: '500', color: 'white'}}>No</Text>
                </TouchableOpacity>
              </View>
              
            </View>
          </Dialog>
      </>
      ): status === 'awaiting_next_action' ? (
        <View style={styles.container}>
          <Text style={styles.resultText}>Failed to complete your payment.</Text>
          <CustomButton 
            text='Refresh'
            onPress={()=>setGetStatus(!getStatus)}
          />
          <View style={{marginTop:20}}>
          <CustomButton 
            text='Go Back'
            onPress={()=>navigation.navigate('MainTab')}
          />
          </View>
          
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
            onPress={()=>navigation.pop()}  
          />
        </View>
      ) :
      <View>
         <View style={styles.container}>
        <Text style={styles.resultText}>Failed to finish payment or the payment session has expired.</Text>
        <View style={{marginBottom: 20}}>
        <CustomButton 
            text="Okay"
            onPress={()=> navigation.navigate("ReservationScreen")}      
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

export default ReservationConfirmationScreen

const styles = StyleSheet.create({
  loading:{
    position:'absolute',
    top: 320,
    left: 165,
  },
  rootContainer:{
    paddingTop: 100,
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