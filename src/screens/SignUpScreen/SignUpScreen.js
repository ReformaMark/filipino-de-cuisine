import React, { useState } from 'react'
import { 
  StyleSheet, 
  Text,
  View, 
  ScrollView} from 'react-native'
import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton'
import SocialSignButtons from '../../components/SocialSignButtons'
import { EMAIL_REGEX } from '../../components/Regex/Regex'
import {useForm} from 'react-hook-form'
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  sendEmailVerification, 
  updateProfile } from 'firebase/auth';
import CustomPasswordInput from '../../components/CustomPasswordInput/CustomPasswordInput'


const auth = getAuth();


const SignUpScreen = ({navigation}) => {

  const {control, handleSubmit,setError,reset, watch} = useForm();
  const password = watch('password');

  // Firebase Authentication methods
  const onRegisterPressed = async (data) => {
    console.log(data);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(() => {
        console.log(userCredential);             
        signInWithEmailAndPassword( auth ,data.email, data.password)
        reset();
        console.log("Email verification link has been sent")
       
      })
      .catch(error => {
        if(error.code === 'auth/email-already-in-use'){
          console.log('Registration failed: Email already in use')
          setError('email',{
            type: error.code,
            message: "Email already in used"
          })
          return
        }
      }); 
    } catch (err) {
      if(err.code === 'auth/email-already-in-use'){
        console.log('Registration failed: Email already in use')
      } else{
        console.log(err.message)
      }
    }
  };
   
  
  

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor: 'white'}}>
     
        <View style={styles.container}>
         
          <Text>Email</Text>
            <CustomInput     
            name='email'
            control={control}         r
            placeholder="Email"
            rules={{
                required:"Email is required" ,
                pattern:{value:EMAIL_REGEX , message: 'Email is invalid'}
              }}
            />
          <Text>Password</Text>
            <CustomPasswordInput 
            name='password'
            control={control}        
            placeholder="Password"
            rules={{
              required: "Password is required", 
              minLength: {value: 8, message: "Password should be minimum of 6 characters long."}
            }}
            />
          <Text>Confirm password</Text>
            <CustomPasswordInput 
            name='confirmPassword'
            control={control}     
            placeholder="Confirm password"
            rules={{
              validate: value => value === password || 'Password does not match',
              required: "Confirm password is required", 
              minLength: {value: 8, message: "Confirm password should be minimum of 8 characters long."}
            }}
            />
          <View style={styles.signupBtn}>
            <CustomButton 
                text="Sign Up"
                onPress={handleSubmit(onRegisterPressed)}      
            />
          </View> 
          <SocialSignButtons />
        </View>      
    </ScrollView>
  )
}
export default SignUpScreen

// styles
const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#051C60',
    marginVertical: '5%',
  },
  text: {
    color: 'gray',
    marginVertical: 10,
  },
  link: {
    color: '#FDB075'

  },
  signupBtn:{
    marginVertical: 20,
  },
})


