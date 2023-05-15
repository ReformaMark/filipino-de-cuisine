import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { ActivityIndicator } from 'react-native'
import { ScrollView } from 'react-native'
import axios from 'axios'
import { getAuth } from 'firebase/auth'
import { Divider } from '@rneui/themed'
import { DateTime } from 'luxon'

const ReservationHistory = ({navigation, route}) => {
    const [isLoading, setIsLoading] = useState(true)
    const [reservations, setReservations] = useState()
    const auth = getAuth();
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setIsLoading(false);
      
        }, 1500); // delay for 3 seconds
    
        return () => clearTimeout(timeoutId);
      }, []);

      useEffect(()=>{
        const getReservation = async()=>{
            await axios.get(`http://192.168.100.18:3000/api/reservations/${auth.currentUser.uid}`)
            .then((res)=>{
                setReservations(res.data)
          
            })
            .catch((error)=>{
                console.log(error)
            })
        }
        getReservation()
      },[])

  return (
    <ScrollView>
        {isLoading ? <ActivityIndicator size={'large'}/> :
        <>
        {reservations && reservations
            .sort((a, b) => b.id - a.id) // sort by ID in descending order
            .map((item)=>(
             <TouchableOpacity key={item.id} onPress={()=>{navigation.navigate("ReservationStatus", { reservation: item, id: item.id})}} style={{paddingHorizontal:20, marginVertical:10}}>
                <View style={{flexDirection:'row', justifyContent:'center'}}>
                    <Text style={{width: 100 ,fontSize:10, fontWeight: '600', color:'#78716C'}}>Reservation ID</Text>
                    <Text style={{width: 60 ,fontSize:10, fontWeight: '600', color:'#78716C'}}>Date</Text>
                    <Text style={{width: 80 ,fontSize:10, fontWeight: '600', color:'#78716C'}}>Time</Text>
                    <Text style={{width: 60 ,fontSize:10, fontWeight: '600', color:'#78716C'}}>Status</Text>
                </View>
                <Divider/>
                    <View style={{flexDirection:'row', marginVertical: 20}}>
                        <Text style={{marginLeft: 30,width: 60 ,fontSize:10, fontWeight: '400', color:'#78716C'}}>{item.id}</Text>
                        <Text style={{width: 60 ,fontSize:10, fontWeight: '400', color:'#78716C'}}>{item.selectedDate}</Text>
                        <View style={{width: 80 }}>
                        <Text style={{marginLeft: 10,width: 60 ,fontSize:10, fontWeight: '400', color:'#78716C', textAlign:'center'}}>
                            {DateTime.fromISO(item.reservationSlots[0].startIsoDate).toLocaleString(DateTime.TIME_SIMPLE)} to{' '}
                            {DateTime.fromISO(item.reservationSlots[item.reservationSlots.length - 1].endIsoDate).toLocaleString(DateTime.TIME_SIMPLE)}
                        </Text>
                        </View>
                        <Text style={{
                            marginLeft: 10,
                            width: 60 ,
                            fontSize:10, 
                            fontWeight: '400', 
                            color: item.attendedStatus === 'Cancelled' ? 'red' :
                                    item.attendedStatus === 'Completed' ? 'green' :
                                    item.attendedStatus === 'Pending' ? 'black' : 'orange'
                            }}>{item.attendedStatus}</Text>
                    </View>
                    <Divider/>
             </TouchableOpacity>
             ))}
        </>
        }
     
    </ScrollView>
  )
}

export default ReservationHistory

const styles = StyleSheet.create({})