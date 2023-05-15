import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native'
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { getAuth } from 'firebase/auth';
import { Divider } from '@rneui/themed';
import CustomButton from '../../components/CustomButton/CustomButton';
import { DateTime } from 'luxon';

const ReservationStatus = ({navigation, route}) => {
    const {id} = route.params;
    const [reservation, setReservation] = useState();
    const [reservationTable, setReservationTable] = useState();
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
    useEffect(()=>{
        const getReservationTables = axios.get(`http://192.168.100.18:3000/api/reservationTable/${id}`)
        .then(res=>{
            setReservationTable(res.data)
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
                    {DateTime.fromISO(reservation.reservationSlots[0].startIsoDate).toLocaleString(DateTime.TIME_SIMPLE)} to{' '}
                    {DateTime.fromISO(reservation.reservationSlots[reservation.reservationSlots.length - 1].endIsoDate).toLocaleString(DateTime.TIME_SIMPLE)}
                    </Text>
                    <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                        <Text style={{fontSize:15, fontWeight:'700', color:'#EE2A24', textAlign:'center'}}>Table </Text>
                    {reservationTable?.map((item, index)=>{
                        if (index === 0) {
                        return <Text style={{fontSize:15, fontWeight:'700', color:'#EE2A24', textAlign:'center'}} key={item.id}>{item.table}</Text>;
                        } else if (index === reservationTable.length - 1) {
                        return <Text style={{fontSize:15, fontWeight:'700', color:'#EE2A24', textAlign:'center'}} key={item.id}> and {item.table}</Text>;
                        } else {
                        return <Text style={{fontSize:15, fontWeight:'700', color:'#EE2A24', textAlign:'center'}} key={item.id}>, {item.table}</Text>;
                        }
                    })}
                    </View>
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
            <View style={{marginTop: 20}}>
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