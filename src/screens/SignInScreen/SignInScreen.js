import { View, Text, StyleSheet, ScrollView, ActivityIndicator,Dimensions } from 'react-native'
import React,{ useEffect, useState} from 'react'
import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton'
import SocialSignButtons from '../../components/SocialSignButtons'
import { EMAIL_REGEX } from '../../components/Regex/Regex'
import { useForm } from 'react-hook-form'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import CustomPasswordInput from '../../components/CustomPasswordInput/CustomPasswordInput'
import AsyncStorage from '@react-native-async-storage/async-storage';

const auth = getAuth();
const SignInScreen = ({navigation}) => {
  const {control, handleSubmit,setError, formState: {errors}} = useForm();
  const [loading, setLoading ] = useState(false);
 
  useEffect(()=>{
    deleteData()
  },[])
  const deleteData = async() =>{
    await AsyncStorage.clear()
    console.log('Clear the asyncData')
  }

  const onLoginPressed = async (data) => {  
    setLoading(true)
    try {      
      const userCredential = await signInWithEmailAndPassword( auth ,data.email, data.password)
      const user = userCredential.user;
      const userStringify = JSON.stringify(user)
      if(user){
        try {
          await AsyncStorage.setItem('User', userStringify)
        } catch (error) {
          console.log(error)
        }
        setLoading(false) 
        navigation.navigate('Maintab');
      }
    } catch (error) {
      if (error.code === 'auth/user-not-found') {  
        setError('email',{
          type: error.code,
          message: "User not found"
        })
        setLoading(false)
         
      } else if (error.code === 'auth/wrong-password') {
      
        setError('password',{
          type: error.code,
          message: "Incorect password"
        })
        setLoading(false)
      } else {
        setError(error.message);
        setLoading(false)
      }
    }
  };

  const onForgotPasswordPressed =  () =>{

    navigation.navigate('ForgotPassword')
  }
  const onSignUpPressed =  () =>{
    console.warn("You pressed the Sign Up")
    navigation.navigate('SignUp')
  }
  
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{}}>    
    {loading && 
         <ActivityIndicator size={100 || 'large'} color="#10B981" style={[styles.loading]} />    
      }   
      <View style={[styles.container, { height: Dimensions.get('screen').height-240}]}>             

        <Text>Email</Text>
            <CustomInput 
              name="email"          
              placeholder="Email" 
              control={control}
              rules={{
                required: "Email is required", 
                pattern:{value:EMAIL_REGEX , message: 'Email is invalid'}
              }}
            />
        <Text>Password</Text>
            <CustomPasswordInput 
              name="password"
              placeholder="Password"
              control={control}
              rules={{
                required: "Password is required", 
                minLength: {value: 6, message: "Password should be minimum of 6 characters long."}
              }}
            />           
            <View>
              <CustomButton           
                  text="Forgot Password?"
                  onPress={onForgotPasswordPressed}
                  type="TERTIARY"
              />
            </View>
          
            <CustomButton 
            text="Login"
            onPress={handleSubmit(onLoginPressed)}       
            />
            <SocialSignButtons/>
          </View>
          
    </ScrollView>
  )
}
export default SignInScreen;

const styles = StyleSheet.create({
  
  container: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 30,
   
  },
  loading:{
    position: 'absolute',
    top: -100,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 2,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  }
})

