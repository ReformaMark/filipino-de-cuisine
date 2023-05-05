import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ClockIcon from './images/clockIcon.png'
import PhoneIcon from './images/phoneIcon.png'
import LocationIcon from './images/locationIcon.png'
import { TextInput } from 'react-native'
import CustomInput from '../../components/CustomInput/CustomInput'
import { EMAIL_REGEX } from '../../components/Regex/Regex'
import {useForm} from 'react-hook-form'
import { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import axios from 'axios'
import { useToast } from "react-native-toast-notifications";

const ContactUsScreen = () => {
  const toast = useToast();
  const {control, handleSubmit,setError,reset, watch} = useForm();
  const [message, setMessage] = useState('')
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
    <ScrollView style={{backgroundColor:'white', paddingHorizontal: 20}}>
      <Text style={{textAlign:'center', fontSize: 24, fontWeight: '700'}}>Get in Touch</Text>
      <Text  style={{textAlign:'center', fontSize: 16, fontWeight: '400'}}>Feel free to contact us anytime. We will get back to you as possible as we can!</Text>
      <View>
        <View style={{flexDirection:'row', marginTop: 20,}}>
          <View style={{ borderRadius: 10,backgroundColor:'black', height: 80, width: 70, alignItems: 'center', justifyContent:'center', elevation: 10}}>
            <Image 
              source={LocationIcon}
              resizeMode='contain'
              style={{width: 40, height:50}}
            />
          </View>
          <View style={{marginLeft: 10, justifyContent: 'center'}}>
            <Text style={{fontSize: 14, fontWeight: '600', lineHeight: 22}}>Our Location</Text>
            <Text style={{fontSize: 12, fontWeight: '400', lineHeight: 22}}>673 Quirino Highway, San Bartolome</Text>
            <Text style={{fontSize: 12, fontWeight: '400', lineHeight: 22}}>Novaliches Quezon City</Text>
          </View>
        </View>
      </View>
      <View>
        <View style={{flexDirection:'row', marginVertical: 10}}>
          <View style={{ borderRadius: 10,backgroundColor:'black', height: 80, width: 70, alignItems: 'center', justifyContent:'center', elevation: 10}}>
            <Image 
              source={PhoneIcon}
              resizeMode='contain'
              style={{width: 40, height:50}}
            />
          </View>
          <View style={{marginLeft: 10, justifyContent: 'center'}}>
            <Text style={{fontSize: 14, fontWeight: '600', lineHeight: 22}}>Phone Number</Text>
            <Text style={{fontSize: 12, fontWeight: '400', lineHeight: 22}}>(02) 8806-3049</Text>
          
          </View>
        </View>
      </View>
      <View>
        <View style={{flexDirection:'row'}}>
          <View style={{ borderRadius: 10,backgroundColor:'black', height: 80, width: 70, alignItems: 'center', justifyContent:'center', elevation: 10}}>
            <Image 
              source={ClockIcon}
              resizeMode='contain'
              style={{width: 40, height:50}}
            />
          </View>
          <View style={{marginLeft: 10, justifyContent: 'center'}}>
            <Text style={{fontSize: 14, fontWeight: '600', lineHeight: 22}}>Business Hours</Text>
            <Text style={{fontSize: 12, fontWeight: '400', lineHeight: 22}}>8:00 AM - 10:00 PM</Text>
          </View>
        </View>
      </View>

      <View style={{ backgroundColor: 'rgba(100, 100, 250, 0.03)', marginVertical:20, borderRadius: 20}}>
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

        <View style={{paddingHorizontal: 80, marginVertical: 10}}>
        <TouchableOpacity onPress={handleSubmit(handleSend)} style={{backgroundColor: "rgba(16, 185, 129, 1)", padding: 10, borderRadius: 40, borderColor: 'black', borderWidth:1 }}>
          <Text style={{textAlign:'center', color: 'white'}}>Send</Text>
        </TouchableOpacity>
        </View>
      </View>
      </View>
    </ScrollView>
  )
}

export default ContactUsScreen

const styles = StyleSheet.create({})