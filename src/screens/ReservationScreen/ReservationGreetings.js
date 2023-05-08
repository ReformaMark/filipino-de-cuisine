import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import SpoonAndFork from './images/spoonForl.jpg'
import { Image } from 'react-native'
import CustomButton from '../../components/CustomButton/CustomButton'
import { TouchableOpacity } from 'react-native'

const ReservationGreetings = ({navigation}) => {
  return (
    <ScrollView style={{padding:30, backgroundColor:'white'}}>
      <View style={{marginTop: 100, alignItems:'center' }}>
        <Text style={{fontSize:30 ,fontWeight:'800', textAlign: 'center', marginBottom:20}}>Thank You!</Text>
        <Image 
          source={SpoonAndFork}
          style={{width:150,height:150}}
        />
        <View>
          <Text style={{fontSize:20 ,fontWeight:'400', textAlign: 'center', marginTop:20}}>You should receive an email with the details of your reservation.</Text>
        </View>
      </View>
      <TouchableOpacity onPress={()=>navigation.navigate("MainTab")} style={{padding: 10, backgroundColor: "#10B981", marginTop:20}}>
        <Text style={{fontSize:16 ,fontWeight:'800', textAlign: 'center', color:'white'}}>Book Again</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>navigation.navigate("MainTab")} style={{padding: 10, backgroundColor: "#10B981", marginTop:20}}>
        <Text style={{fontSize:16 ,fontWeight:'800', textAlign: 'center', color:'white'}}>Return to Home Screen</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

export default ReservationGreetings

const styles = StyleSheet.create({})