import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Divider } from 'react-native-elements';
import { TouchableOpacity } from 'react-native';

const ReservationConfirmationScreen = ({navigation, route}) => {
  const {data, date, paymentMethod, time, table } = route.params;
  console.log(data)
  console.log(date)
  console.log(paymentMethod)
  console.log(time)
  console.log(table)
  const dateString = date;
  const setdate = new Date(dateString);
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = setdate.toLocaleDateString('en-US', options);


  return (
    <View style={{alignItems:'center', padding: 20}}>
      <View style={{backgroundColor:'white', borderColor:'black', borderWidth:1, borderRadius: 20, padding: 20, marginTop: 50}}>
        <Text style={{textAlign: 'center', fontSize: 12, fontWeight:'400', marginBottom: 10}}>Reservation Confirmation</Text>
        <Text style={{textAlign: 'center', fontSize: 15, fontWeight:'700'}}>{data.name}</Text>
        <Text style={{textAlign: 'center', fontSize: 15, fontWeight:'700'}}>{formattedDate}</Text>
        <Text style={{textAlign: 'center', fontSize: 15, fontWeight:'700'}}>For 3 guests at {time.slice(0, -1).join(", ")}{time.length > 2 && ","} and {time.slice(-1)}</Text>
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
          <TouchableOpacity style={{marginVertical: 10}}>
            <Text style={{color:'#DC2626', textAlign:'center'}}>Cancel Reservation</Text>
          </TouchableOpacity>
        </View>
        <Divider width={2} color='black'/>
        <Text style={{textAlign:'center', fontSize: 12, fontWeight:'600'}}>Your Reservation ID is 1234</Text>
      </View>
      <View>
        <TouchableOpacity style={{paddingHorizontal: 50,paddingVertical: 10, borderRadius: 20, marginVertical: 30, backgroundColor:'#10B981'}}>
          <Text style={{color: 'white',}}>Okay</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ReservationConfirmationScreen

const styles = StyleSheet.create({})