import { StyleSheet, Text, View, Button, Pressable, Platform, TextInput } from 'react-native'
import React,{useEffect, useState} from 'react'
import CustomInput from '../../components/CustomInput/CustomInput'
import { useForm } from 'react-hook-form'
import CustomButton from '../../components/CustomButton/CustomButton'
import DateTimePicker from '@react-native-community/datetimepicker';
import { useAuthentication } from '../../hooks/useAuthentication'
import axios from 'axios';

const CustomerInforForm = () => {
    
    const {control, handleSubmit, formState: {errors}} = useForm();
    const [date, setDate] = useState(new Date());
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [error, setError ] = useState(false)
    const { user } = useAuthentication();
    const [loading, setLoading ] = useState();

    const toggleDatePicker = () => {
        setShowDatePicker(!showDatePicker)
      }
      const onChange = ({type}, selectedDate) => {
        if(type == 'set'){
            const currentDate = selectedDate;
            setDate(currentDate);
        if(Platform.OS === 'android'){
            toggleDatePicker();
            setDateOfBirth(formatDate(currentDate));
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
  return (
     <View style={styles.root}>
        <View style={styles.container}>
        <Text style={[styles.label,{fontWeight: '700', textAlign: 'center'}]}>Add your information</Text>
            <View style={styles.inputContainer}>        
                <Text style={styles.label}>Name</Text>
                <CustomInput 
                    name="name"          
                    placeholder="name" 
                    control={control}
                    rules={{
                    required: "Name is required"
                    }}
                />
                <Text style={styles.label}>Contact Nnumber</Text>
                <CustomInput 
                    name='phoneNumber'
                    control={control}     
                    placeholder="Phone number"
                    keyboardType='numeric'
                    rules={{
                        required: "Phone number is required", 
                        minLength: {value: 11, message: "Please enter a valid phone number."}
                    }}            
                />
                <Text style={styles.label}>Address</Text>
                <CustomInput 
                    name="address"          
                    placeholder="Address" 
                    control={control}
                    rules={{
                    required: "Address is required"
                    }}
                />
                <Text style={styles.label}>Date of Birth</Text>
                {showDatePicker &&(
                <DateTimePicker
                    mode='date'
                    display='spinner'
                    value={date}
                    onChange={onChange}
                    maximumDate={new Date()}
                    />
                )}
                
                
                <Pressable 
                    style={styles.dateOfBirthInput}
                    onPress={toggleDatePicker}
                >
                    <TextInput
                        style={styles.input}
                        placeholder="00-00-00"
                        value={dateOfBirth}
                        onChangeText={setDateOfBirth}
                        editable={false}
                    />
                </Pressable>
                {error && (<Text style={styles.errorMsg}>Date of birth is required.</Text>)}
                <View style={{marginVertical: 20}}>
                <CustomButton 
                    text="Submit"
                    onPress={handleSubmit(handleCreate)}      
                />   
                </View>                  
                             
                </View>
        </View>
      
    </View>
  )
}

export default CustomerInforForm

const styles = StyleSheet.create({
    root:{
        flex: 1,
        alignContent: 'center',
        paddingTop: 30,
        paddingHorizontal: 20,
    },
    container:{
        borderWidth: 1,
        borderColor: 'rgba(217, 217, 217, 0.7)',
        backgroundColor: 'rgba(217, 217, 250, 0.2)',
        padding: 20,
    },
    inputContainer:{
        marginVertical: 20,
    },
    errorMsg:{
        color: 'red',
    },
    dateOfBirthInput:{
        backgroundColor: 'rgba(245, 245, 245, 1)',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 10,
    },
    label:{
        marginTop: 10,
        marginBottom: 5,
        fontSize: 15,
        fontWeight: '600',
    },
    input:{
        color: 'black',
        
    }
})