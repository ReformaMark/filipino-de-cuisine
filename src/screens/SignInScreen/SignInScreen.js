import { View, Text, Image, StyleSheet, ScrollView ,useWindowDimensions } from 'react-native'
import React,{useState} from 'react'
import Logo from '../../../assets/logo.png'
import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton'
import SocialSignButtons from '../../components/SocialSignButtons'
import { useNavigation } from '@react-navigation/native'
import { EMAIL_REGEX } from '../../components/Regex/Regex'
import { useForm } from 'react-hook-form'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '../../../config/firebaseConfig'

const auth = getAuth();
const SignInScreen = () => {
  const {height} = useWindowDimensions();
  const navigation = useNavigation();
  const {control, handleSubmit, formState: {errors}} = useForm();
  const [error, setError] = useState('');

  
  const onSigninPressed = async (data) => {
    try {
      
      await signInWithEmailAndPassword( auth ,data.email, data.password)
      
      navigation.navigate('Home');
    } catch (error) {
      setError(error);
    }
  };
  const onForgotPasswordPressed =  () =>{
    console.warn("You pressed the forgot password")

    navigation.navigate('ForgotPassword')
  }
  const onSignUpPressed =  () =>{
    console.warn("You pressed the Sign Up")
    navigation.navigate('SignUp')
  }
  
  return (
    <ScrollView showsVerticalScrollIndicator={false}>      
      <View style={styles.root}>        
        {/*Logo*/}
        <Image 
          source={Logo} 
          style={[styles.logo, {height: height * 0.2}]} 
          resizeMode="contain" 
        />

        {/*Inputs*/}
        <CustomInput 
          name="email"
          iconName='email'       
          placeholder="Email" 
          control={control}
          rules={{required: "Email is required", 
          pattern:{value:EMAIL_REGEX , message: 'Email is invalid'}
        
        }}
        />
        <CustomInput 
          name="password"
          iconName='lock'
          placeholder="Password"
          control={control}
          rules={{required: "Password is required", minLength: {value: 6, message: "Password should be minimum of 6 characters long."}}}
          secureTextEntry={true} 
        />
        <Text>{error}</Text>
        
        {/*Butons*/}
        <CustomButton 
          text="Sign In"
          onPress={handleSubmit(onSigninPressed)}       
        />
        <CustomButton           
          text="Forgot Password?"
          onPress={onForgotPasswordPressed}
          type="TERTIARY"
        />
        <SocialSignButtons/>
        <CustomButton 
          text="Don't have an account? Create one"
          onPress={onSignUpPressed}
          type="TERTIARY"
        />

      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
  },
  logo: {
   width: 300,
   height: 150,
   maxHeight: 200,
  }
})

export default SignInScreen;