import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import CustomInput from '../../components/CustomInput/CustomInput'
import {useForm} from 'react-hook-form'
import { EMAIL_REGEX } from '../../components/Regex/Regex'
import { TextInput } from 'react-native'
import { useState } from 'react'
import axios from 'axios'
import { useToast } from "react-native-toast-notifications";

const FeedbackScreen = () => {
  const {control, handleSubmit,setError,reset, watch} = useForm();
  const [message, setMessage] = useState('')
  const toast = useToast();

  const onChange = (text)=>{
    setMessage(text)
  }

  const handleSend = async(data)=>{
    
    console.log(data.name)
    console.log(data.email)
    await axios.post('http://192.168.100.18:3000/api/message', { name: data.name, email: data.email, body: message})
    .then((response)=>{
      toast.show(`Thanks for sending us feedback!`, {
        type: "success",
        placement: "bottom",
        duration: 2000,
        offset: 100,
        animationType: "slide-in"
      });
      setMessage('')
      reset();
    })
    .catch(error=>{
      console.log(error)
    })
  }
  return (
    <ScrollView style={{ marginTop: 100, backgroundColor:'white'}}>
      <View style={{ marginTop: 20,backgroundColor: "rgba(16, 185, 129, 1)", padding: 20, width: "60%", borderTopRightRadius: 50, borderBottomRightRadius: 50}}>
        <Text style={{ fontSize: 15, fontWeight: '700', color:'white'}}>Send Us Feedback</Text>
      </View>
     <View style={{ backgroundColor: 'rgba(100, 100, 250, 0.03)',marginHorizontal: 20, marginTop: 20, borderRadius: 20}}>
      <View style={{borderColor: 'black', borderWidth: 2, borderRadius: 20,paddingHorizontal: 20, paddingTop: 20}}>
        <Text>Name</Text>
        <View style={{borderColor: 'black', borderWidth: 1, borderRadius: 10}}>
          <CustomInput
              name='name'
              control={control}
              placeholder="Fullname" 
              rules={{
                  required: "Username is required", 
                }}
              />
        </View>
        <Text>Email</Text>
        <View style={{borderColor: 'black', borderWidth: 1, borderRadius: 10}}>
        <CustomInput     
            name='email'
            control={control}         
            placeholder="Email"
            rules={{
                required:"Email is required" ,
                pattern:{value:EMAIL_REGEX , message: 'Email is invalid'}
              }}
            />
          </View>
        <Text>Input your Feedback</Text>
       
        <TextInput
            style={{ height: 100, borderColor: 'gray', borderWidth: 1 , paddingHorizontal: 10, backgroundColor: 'white'}}
            onChangeText={onChange}
            placeholder='Message...'
            textAlignVertical='top'
            value={message}
            multiline={true}
          />

        <View style={{paddingHorizontal: 80, marginTop: 20, marginBottom: 80}}>
        <TouchableOpacity onPress={handleSubmit(handleSend)} style={{backgroundColor: "rgba(16, 185, 129, 1)", padding: 10, borderRadius: 40, borderColor: 'black', borderWidth:1 }}>
          <Text style={{textAlign:'center', color: 'white'}}>Send</Text>
        </TouchableOpacity>
        </View>
      </View>
     </View>
    </ScrollView>
  )
}

export default FeedbackScreen

const styles = StyleSheet.create({})