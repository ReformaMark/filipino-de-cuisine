import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native'
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { getAuth } from 'firebase/auth';
import { Divider } from '@rneui/themed';
import CustomButton from '../../components/CustomButton/CustomButton';

const ReservationStatus = ({navigation, route}) => {
    const {id} = route.params;
    const [reservation, setReservation] = useState();
    const auth = getAuth()
    console.log(id)
    const dateString = reservation?.selectedDate;
    const setdate = new Date(dateString);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = setdate.toLocaleDateString('en-US', options);
  
    console.log(formattedDate)
    

    useEffect(()=>{
        const getReservation = axios.get(`http://192.168.100.18:3000/api/reservation/${id}`)
        .then(res=>{
            setReservation(res.data)
        })
        .catch(error=>{
            console.log(error)
        })
    
    },[])
  console.log(reservation)
  return (
    <ScrollView style={{paddingHorizontal: 20, paddingVertical: 50}}>
        {reservation && 
        <>
            <Text style={{
                    fontSize: 20, 
                    fontWeight:'600', 
                    color: reservation.attendedStatus === 'Cancelled' ? 'red' :
                    reservation.attendedStatus === 'Completed' ? 'green' :
                    reservation.attendedStatus === 'Pending' ? 'black' : 'orange'
                    }}>{reservation && reservation.attendedStatus}</Text>
            <View style={{marginTop:50,padding:20, borderRadius: 20, backgroundColor:'white', borderBottomColor: 'black', borderWidth:1}}>
                
                <View>
                    <Text style={{fontSize:15, fontWeight:'700', textAlign:'center'}}>{auth.currentUser.displayName}</Text>
                    <Text style={{fontSize:15, fontWeight:'700', textAlign:'center'}}>{formattedDate}</Text>
                    <Text style={{fontSize:15, fontWeight:'700', textAlign:'center'}}>
                        {reservation.reservationSlots.map((slot, index) =>
                            new Date(slot.startIsoDate).toLocaleTimeString('en-US', {
                            hour: 'numeric',
                            minute: 'numeric',
                            hour12: true
                            }) +
                            (index === reservation.reservationSlots.length - 1 ? '' : ', ')
                        ).join('').replace(/,\s([^,]+)$/, ' and $1')}
                    </Text>
                    <Text style={{fontSize:15, fontWeight:'700', color:'#EE2A24', textAlign:'center'}}>Table {reservation.reservationSlots.map((id)=> id.reservationTableId)}</Text>
                </View>
                <Divider width={2}/>
                <View style={{marginVertical: 10}}>
                    <Text style={{fontSize:14, fontWeight:'700', textAlign:'center'}}>Contact Us</Text>
                    <Text style={{fontSize:12, fontWeight:'700', textAlign:'center'}}>673 Quirino Highway, San Bartolome Novaliches, Quezon City</Text>
                    <Text style={{fontSize:12, fontWeight:'700', textAlign:'center'}}>02 8806-3049</Text>
                </View>
                <Divider width={2}/>
                <View style={{marginVertical: 10}}>
                    <Text style={{fontSize:12, fontWeight:'400', textAlign:'center'}}>A note from us</Text>
                    <Text style={{fontSize:12, fontWeight:'400', textAlign:'center'}}>Thank you for booking with us! Your reservation at Filipino de Cuisine is confirmed. You may cancel your reservation only up to the day before your reserved date. Cancelled reservation are not refundable.</Text>
                </View>
                <Divider width={2}/>
                <View style={{marginVertical: 10}}>
                <Text style={{fontSize:12, fontWeight:'600', color:'black', textAlign:'center'}}>Your reservation ID is {reservation.id}</Text>
                </View>
            </View>
            <View>
                <CustomButton 
                    text="Go Back"
                    onPress={()=>navigation.navigate("MainTab")}
                />
            </View>
            <View>
            </View> 
        </>
        }
            
      
    </ScrollView>
  )
}

export default ReservationStatus

const styles = StyleSheet.create({})