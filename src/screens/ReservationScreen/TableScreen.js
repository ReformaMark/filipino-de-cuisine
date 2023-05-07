import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native';

const TableScreen = ({navigation, route}) => {
  const { data, date, paymentMethod } = route.params;
 
  const handleTimeonPress = ()=>{

  }
  const handleSubmit = ()=>{
    navigation.navigate('ReservationConfirmationScreen', {data: data, date: date, paymentMethod: paymentMethod, time: ["10:00 AM","11:15 AM"], table: [1,2,3]})
  }
  return (
    <ScrollView>
      <View style={{paddingHorizontal: 20, marginVertical: 30}}>
        <Text style={{fontSize:16, fontWeight:'700'}}>Time slot</Text>
        {// dito maglalagay ng data galing sa db. may mamap
        <>
        <View style={{flexDirection:'row', paddingHorizontal: 20, justifyContent:'space-evenly', paddingTop: 20}}>
          <TouchableOpacity style={{flexBasis:'40%', borderColor: 'black', borderWidth: 1, backgroundColor: 'white'}}>
            <Text style={{fontSize:16, fontWeight:'600',textAlign: 'center'}}>10:00 AM</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flexBasis:'40%', borderColor: 'black', borderWidth: 1, backgroundColor: 'white'}}>
            <Text style={{fontSize:16, fontWeight:'600',textAlign: 'center'}}>11:15 AM</Text>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection:'row', paddingHorizontal: 20, justifyContent:'space-evenly', paddingTop: 20}}>
          <TouchableOpacity style={{flexBasis:'40%', borderColor: 'black', borderWidth: 1, backgroundColor: 'white'}}>
            <Text style={{fontSize:16, fontWeight:'600',textAlign: 'center'}}>1:30 PM</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flexBasis:'40%', borderColor: 'black', borderWidth: 1, backgroundColor: 'white'}}>
            <Text style={{fontSize:16, fontWeight:'600',textAlign: 'center'}}>2:45 PM</Text>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection:'row', paddingHorizontal: 20, justifyContent:'space-evenly', paddingTop: 20}}>
          <TouchableOpacity style={{flexBasis:'40%', borderColor: 'black', borderWidth: 1, backgroundColor: 'white'}}>
            <Text style={{fontSize:16, fontWeight:'600',textAlign: 'center'}}>4:00 PM</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flexBasis:'40%', borderColor: 'black', borderWidth: 1, backgroundColor: 'white'}}>
            <Text style={{fontSize:16, fontWeight:'600',textAlign: 'center'}}>5:15 PM</Text>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection:'row', paddingHorizontal: 20, justifyContent:'space-evenly', paddingTop: 20}}>
          <TouchableOpacity style={{flexBasis:'40%', borderColor: 'black', borderWidth: 1, backgroundColor: 'white'}}>
            <Text style={{fontSize:16, fontWeight:'600',textAlign: 'center'}}>6:30 PM</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flexBasis:'40%', borderColor: 'black', borderWidth: 1, backgroundColor: 'white'}}>
            <Text style={{fontSize:16, fontWeight:'600',textAlign: 'center'}}>8:45 PM</Text>
          </TouchableOpacity>
        </View>
        </>
        }
        <View>
          <Text style={{fontSize:16, fontWeight:'700', marginTop: 20}}>Table Slot</Text>
          <View>
            <View style={{flexDirection:'row', paddingHorizontal: 20, justifyContent:'space-evenly', paddingVertical: 20}}>
              <TouchableOpacity style={{borderColor: 'black', borderWidth:1, borderRadius: 200, paddingVertical: 5, paddingHorizontal: 10, backgroundColor: 'white'}}>
                <Text>1</Text>
              </TouchableOpacity >
              <TouchableOpacity style={{borderColor: 'black', borderWidth:1, borderRadius: 200, paddingVertical: 5, paddingHorizontal: 10, backgroundColor: 'white'}}>
                <Text>2</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{borderColor: 'black', borderWidth:1, borderRadius: 200, paddingVertical: 5, paddingHorizontal: 10, backgroundColor: 'white'}}>
                <Text>3</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{borderColor: 'black', borderWidth:1, borderRadius: 200, paddingVertical: 5, paddingHorizontal: 10, backgroundColor: 'white'}}>
                <Text>4</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{borderColor: 'black', borderWidth:1, borderRadius: 200, paddingVertical: 5, paddingHorizontal: 10, backgroundColor: 'white'}}>
                <Text>5</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={{fontSize:11, fontWeight:'400', }}>*Each table can fit 2-3 person</Text>
          <View style={{flexDirection: 'row', justifyContent:'space-around', marginVertical: 20}}>
            <View style={{flexDirection: 'row', alignItems:'center'}}>
              <View style={{height: 15, width: 15, backgroundColor:'black', borderColor:"black", borderWidth: 1, borderRadius: 50}}>
              </View> 
              <Text style={{fontSize:12, fontWeight:'400', marginLeft: 10}}>Fully Booked</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems:'center'}}>
              <View style={{height: 15, width: 15, backgroundColor:'white', borderColor:"black", borderWidth: 1, borderRadius: 50}}>
              </View> 
              <Text style={{fontSize:12, fontWeight:'400', marginLeft: 10}}>Available</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems:'center'}}>
              <View style={{height: 15, width: 15, backgroundColor:'#C4C4C4', borderColor:"black", borderWidth: 1, borderRadius: 50}}>
              </View> 
              <Text style={{fontSize:12, fontWeight:'400', marginLeft: 10}}>Selected</Text>
            </View>
          </View>
          <View>
            <TouchableOpacity onPress={handleSubmit} style={{backgroundColor: '#10B981', paddingHorizontal: 20,paddingVertical: 10, marginHorizontal: 80, borderRadius: 15, marginTop: 20}}>
              <Text style={{fontSize:16, fontWeight:'400', textAlign: "center", color: 'white'}}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
        
      </View>
    </ScrollView>
  )
}

export default TableScreen

const styles = StyleSheet.create({})