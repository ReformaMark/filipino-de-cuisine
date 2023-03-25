import React, { useState } from 'react'
import { StyleSheet, Text, View, ScrollView} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton'
import SocialSignButtons from '../../components/SocialSignButtons'
import { EMAIL_REGEX } from '../../components/Regex/Regex'
import {useForm} from 'react-hook-form'
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';


const auth = getAuth();


const SignUpScreen = () => {

  const navigation = useNavigation();
  const {control, handleSubmit, formState: {errors}, watch} = useForm();
  const password = watch('password')
  const {error, setError } = useState('');

  // Firebase Authentication methods
  const onRegisterPressed = async (data) => {
    console.log(data);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(() => {
        console.log(userCredential);
        sendEmailVerification(auth.currentUser);
        updateProfile(auth.currentUser, {
          displayName: data.username
        })
        console.log("Email verification link has been sent")
      })
      .catch(error => {
        alert(error)
      }); 
    
    navigation.navigate('SignIn');

    } catch (err) {
      if(err.code === 'auth/email-already-in-use'){
        console.log('Registration failed: Email already in use')
      } else{
        console.log(err.message)
      }
        
    }
  };
   
  
  const onSignInPressed =  () =>{
    navigation.navigate('SignIn')
  };

  const onTermsOfUsePressed =  () =>{
    console.warn("You pressed the onTermsOfUsePressed")
  };

  const onPrivacyPressed =  () =>{
    console.warn("You pressed the onTermsOfUsePressed")
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
      <View style={styles.container}>
          <Text>Username</Text>
            <CustomInput
            name='username'
            control={control}
            placeholder="Username" 
            rules={{
                required: "Username is required", 
                minLength: {value: 6, message: "Username should be minimum of 6 characters long."}
              }}
            />
          <Text>Email</Text>
            <CustomInput     
            name='signupEmail'
            control={control}         
            placeholder="Email"
            rules={{
                required:"Email is required" ,
                pattern:{value:EMAIL_REGEX , message: 'Email is invalid'}
              }}
            />
          <Text>Phone number</Text> 
            <CustomInput 
            name='phoneNumber'
            control={control}     
            placeholder="Phone number"
            keyboardType='numeric'
            rules={{
              required: "Confirm password is required", 
              minLength: {value: 11, message: "Please enter a valid phone number."}
            }}            
            />
          <Text>Password</Text>
            <CustomInput 
            name='SignUpPassword'
            control={control}        
            placeholder="Password"
            secureTextEntry={true} 
            rules={{
              required: "Password is required", 
              minLength: {value: 6, message: "Password should be minimum of 6 characters long."}
            }}
            />
          <Text>Confirm password</Text>
            <CustomInput 
            name='confirmPassword'
            control={control}     
            placeholder="Confirm password"
            secureTextEntry={true} 
            rules={{
              validate: value => value === SignupPassword || 'Password does not match',
              required: "Confirm password is required", 
              minLength: {value: 6, message: "Confirm password should be minimum of 6 characters long."}
            }}
            />
          <View style={styles.signupBtn}>
            <CustomButton 
                text="Sign Up"
                onPress={handleSubmit(()=>{})}      
            />
          </View> 
        </View>
      </View>
    </ScrollView>
  )
}

// styles
const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
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

  }
})
export default SignUpScreen

