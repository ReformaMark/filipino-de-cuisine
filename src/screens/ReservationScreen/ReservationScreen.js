import { Pressable, StyleSheet, Text, TextInput, View, RefreshControl, ActivityIndicator, ScrollView } from 'react-native'
import React, { useState } from 'react'
import CustomInput from '../../components/CustomInput/CustomInput'
import axios from 'axios';
import { set, useForm } from 'react-hook-form';
import DateTimePicker from '@react-native-community/datetimepicker';
import { CheckBox } from '@rneui/themed';
import { TouchableOpacity } from 'react-native';
import { useEffect } from 'react';
import { getAuth } from 'firebase/auth';



const ReservationScreen = ({navigation, route}) => {
  const auth = getAuth();
  const [checkMaya, setCheckMaya] = useState(false);
  const [checkGCASH, setCheckGCASH] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [ paymentMethodError , setPaymentMethodError] = useState(false)
  const {control, handleSubmit, setValue} = useForm();
  const [date, setDate] = useState(new Date());
  const [reservationDate, setReservationDate] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [error, setError ] = useState(false)
  const [isLoading, setIsLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  useEffect(()=>{
    const getCustomerInfo = async() =>{
      await axios.get(`http://192.168.100.18:3000/api/customerInfo/${auth?.currentUser?.uid}`)
      .then((response)=>{
        console.log(response.data.defaultContactNumber)
        setValue("name", auth.currentUser.displayName)
        setValue("email", auth.currentUser.email)
        setValue("phoneNumber", response.data.defaultContactNumber)
        setIsLoading(false)
      })
      .catch(error=>{
        console.log(error)
        setIsLoading(true)
      })
    }
    getCustomerInfo()
  },[])

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker)
  }
  const onChange = ({type}, selectedDate) => {
    if(type == 'set'){
        const currentDate = selectedDate;
        setDate(currentDate);
    if(Platform.OS === 'android'){
        toggleDatePicker();
        setReservationDate(formatDate(currentDate));
        setError(false)
    }
    } else {
        toggleDatePicker();
    }
  }

  const formatDate = (rawData) =>{
    let date = new Date(rawData)
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;
    return `${year}-${month}-${day}`
  }

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

  const onRefresh = () => {
    setRefresh(true);
    setIsLoading(true)
    setTimeout(()=>{
      setRefresh(false)
      setIsLoading(false)
    }, 1000)
  };
console.log(date)
  const handleProceed = (data)=>{
    if(paymentMethod === ''){
      setError(true)
    } if(reservationDate === ''){
      setPaymentMethodError(true)
    }else{
      navigation.navigate('TableScreen', {data: data, date: reservationDate, paymentMethod: paymentMethod})
    }
  }
  return (
    <ScrollView 
    refreshControl={
      <RefreshControl
        refreshing={refresh} 
        onRefresh={onRefresh}
      />
    }
    style={styles.root}
    >
      {isLoading ? (<ActivityIndicator size={'large'}/>) :
      <View style={{paddingHorizontal: 40, paddingTop: 10}}>
        <View>
          <Text style={{fontSize: 15, fontWeight: '400', marginTop: 20, marginBottom: 10}}>Name</Text>
          <CustomInput 
            name="name"          
            placeholder="name" 
            editable={false}
            control={control}
            rules={{
            required: "Name is required"
            
            }}
          />
        </View>
        <View>
          <Text style={{fontSize: 15, fontWeight: '400', marginTop: 20, marginBottom: 10}}>Contact number</Text>
          <CustomInput 
            name="phoneNumber"          
            placeholder="0900 000 0000" 
            control={control}
            rules={{
            required: "Contact number is required"
            }}
          />
        </View>
        <View>
          <Text style={{fontSize: 15, fontWeight: '400', marginTop: 20, marginBottom: 10}}>Email</Text>
          <CustomInput 
            name="email"          
            placeholder="example@email.com" 
            control={control}
            rules={{
            required: "Email is required"
            }}
          />
        </View>
        <View>
          <Text style={{fontSize: 15, fontWeight: '400', marginTop: 20, marginBottom: 10}}>Reservation Date</Text>
          {showDatePicker &&(
                <DateTimePicker
                    mode='date'
                    display='date'
                    value={date}
                    onChange={onChange}
                    minimumDate={new Date(new Date().setDate(new Date().getDate() + 1))}

                    />
                )}
          <Pressable 
            style={styles.dateOfBirthInput}
            onPress={toggleDatePicker}
          >
            <TextInput
                style={styles.input}
                placeholder="Year-MM-DD"
                value={reservationDate}
                onChangeText={setReservationDate}
                editable={false}
            />
          </Pressable>
          {error && (<Text style={styles.errorMsg}>Date of birth is required.</Text>)}
        </View>
        <View>
          <View style={styles.paymentMethodContainer}>
              <Text style={{fontSize: 15, fontWeight: '400', marginTop: 20, marginBottom: 10}}>Reservation Fee</Text>
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
            <Text style={{fontSize: 11, fontWeight: '400'}}>To reserve your spot kindly note that 150 pesos fee is required.</Text>
          </View>
          <TouchableOpacity style={{padding: 10, backgroundColor: "#10B981", marginHorizontal: 20, borderRadius: 20, marginVertical: 20}} onPress={handleSubmit(handleProceed)}>
            <Text style={{color:'white', textAlign: 'center'}}>Proceed</Text>
        </TouchableOpacity>    
        </View>
      </View>
      }
    </ScrollView>
  )
}

export default ReservationScreen

const styles = StyleSheet.create({

  input:{
    color: 'black',
    backgroundColor: 'white',
    borderColor: 'black',
    padding: 10,
    borderWidth: 1,
},
errorMsg:{
  color:'red',
}
})