import { StyleSheet, Text, View, ScrollView, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native';
import { DateTime } from 'luxon';
import axios from 'axios';
import { Dialog } from '@rneui/themed';

const TableScreen = ({navigation, route}) => {
  const { data, date, paymentMethod } = route.params;
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [selectedTables, setSelectedTables] = useState([]);
  const [availableTable, setAvailableTable] = useState([]);
  const [visible1, setVisible1] = useState(false);
  const [error, setError] = useState(false);
  const [error1, setError1] = useState(false);
  const timeSlots = [
    `${date}T10:00:00.000+08:00`,
    `${date}T11:15:00.000+08:00`,
    `${date}T13:30:00.000+08:00`,
    `${date}T14:45:00.000+08:00`,
    `${date}T16:00:00.000+08:00`,
    `${date}T17:15:00.000+08:00`,
    `${date}T18:30:00.000+08:00`,
    `${date}T20:45:00.000+08:00`
  ];
 const tableSlots =[
  "1", "2", "3", "4", "5"
 ];

  const handleTimeonPress = (timeSlot) => {
    if (selectedTimes.includes(timeSlot)) {
      setSelectedTimes(selectedTimes.filter((selectedTime) => selectedTime !== timeSlot));
    } else {
      setSelectedTimes([...selectedTimes, timeSlot]);
      setError(false)
    }
  };
  const handleTableOnpress = (tablenum)=>{
    if (selectedTables.includes(tablenum)) {
      setSelectedTables(selectedTables.filter((selectedTable) => selectedTable !== tablenum));
    } else {
      setSelectedTables([...selectedTables, tablenum]);
      setError1(false)
    }
  }

  useEffect(()=>{
    const getAvailableTables = async()=>{
      await axios.get('http://192.168.100.18:3000/api/reservationSlot', {
        params: {
          selectedTimeslots: selectedTimes
        }
      })
      .then((res)=>{
  
        setAvailableTable(res.data)
      })
      .catch(error=>{
        console.log(error)
      })
    }
    getAvailableTables()
  },[selectedTimes])

  const handleSubmit = async()=>{
    const response = await axios.post(
      'http://192.168.100.18:3000/api/payment_intents',
      { amount: 150 * 100}
    ).then((res)=>{
      axios.post(
        'http://192.168.100.18:3000/api/payment_methods',
        { paymentMethod: paymentMethod}
      ).then((res)=>{
      
        axios.post(
          'http://192.168.100.18:3000/api/attach_payment_method_intent')
          .then((res)=>{
       
          Linking.openURL(res.data.attributes.next_action.redirect.url)
          navigation.navigate("ReservationConfirmationScreen", {data: data, date: date, paymentMethod: paymentMethod, time: selectedTimes, table: selectedTables})
        })
      })
    })
  }

  useEffect(()=>{
    if(selectedTimes.length < 1){
      setSelectedTables([])
    }
  },[selectedTimes])
  const toggleDialog1 = () => {
    if(selectedTimes.length < 1){
      setError(true)
      setSelectedTables([])
    } else if(selectedTables.length < 1){
      setError1(true)
    } else{
      setVisible1(!visible1);
    }

  };
  console.log(selectedTables)
  return (
    <ScrollView>
      <View style={{paddingHorizontal: 20, marginVertical: 30}}>
        <Text style={{marginBottom:10}}>Date: {date}</Text>
        <Text style={{fontSize:16, fontWeight:'700'}}>Time slot</Text>
        <View style={{flexDirection: 'row', width: '100%', flexWrap:'wrap', paddingHorizontal: 30, alignItems:'center', justifyContent:'center', gap: 20}}>
          {timeSlots.map((timeSlot, index) => {
          const formattedTime = DateTime.fromISO(timeSlot).toFormat('h:mm a');
          const isSelected = selectedTimes.includes(timeSlot);
          return (
            <TouchableOpacity
              key={index}
              style={{flexBasis:'40%', borderColor: 'black', borderWidth: 1, backgroundColor: isSelected ? '#C4C4C4' : 'white'}}
              onPress={() => handleTimeonPress(timeSlot)}
            >
              <Text style={{fontSize:16, fontWeight:'600',textAlign: 'center'}}>{formattedTime}</Text>
            </TouchableOpacity>
            
          );
          
        })}
        {error && 
        <Text style={{color:'red'}}>Time slot is required. Please choose atleast 1.</Text>}
        </View>
        <View>
          <Text style={{fontSize:16, fontWeight:'700', marginTop: 20}}>Table Slot</Text>
          {selectedTimes.length < 1 ? (
            <Text style={{textAlign:'center',paddingVertical: 20, color: 'gray', fontSize: 12, fontWeight:'500'}}>Please select time first...</Text>
          ):
          <View>
            <View style={{flexDirection:'row', paddingHorizontal: 20, justifyContent:'space-evenly', paddingVertical: 20}}>
              {tableSlots.map((tableNum) => {
                const isAvailable = availableTable.includes(tableNum);
                const isSelected = selectedTables.includes(tableNum);
                return (
                  <TouchableOpacity
                    key={tableNum}
                    style={{borderColor: 'black', borderWidth: 1, borderRadius: 200, paddingVertical: 5, paddingHorizontal: 10, backgroundColor: isAvailable ? isSelected ? "#C4C4C4" :'white' : 'black'}}
                    disabled={!isAvailable}
                    onPress={()=>handleTableOnpress(tableNum)}
                  >
                    <Text style={{color: isAvailable ? 'black' : 'white'}}>{tableNum}</Text>
                  </TouchableOpacity>
                  
                );
              })}
              
            </View>
            {error1 && 
                <Text style={{color:'red', textAlign:'center'}}>Table slot is required. Please choose atleast 1.</Text>
              }
          </View>
          }
          
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
            <TouchableOpacity onPress={toggleDialog1} style={{backgroundColor: '#10B981', paddingHorizontal: 20,paddingVertical: 10, marginHorizontal: 80, borderRadius: 15, marginTop: 20}}>
              <Text style={{fontSize:16, fontWeight:'400', textAlign: "center", color: 'white'}}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Dialog
          isVisible={visible1}
          onBackdropPress={toggleDialog1}
          style={{borderColor: 'black', borderWidth: 2, borderRadius: 100, padding: 30}}
        >
        <View style={{padding: 10}}>
        <Dialog.Title title="Are you sure you want to continue?" />
          <Text>Pressing the proceed button will take you to payment.</Text>
          <TouchableOpacity onPress={handleSubmit} style={{padding: 10, backgroundColor: '#10B981',marginVertical: 20,borderRadius: 30}}>
            <Text style={{textAlign:'center', fontSize: 15, fontWeight: '500', color: 'white'}}>Proceed</Text>
          </TouchableOpacity>
        </View>
        </Dialog>
      </View>
    </ScrollView>
  )
}

export default TableScreen

const styles = StyleSheet.create({})