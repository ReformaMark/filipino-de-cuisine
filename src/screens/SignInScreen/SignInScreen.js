import { View, Text, Image, StyleSheet, ScrollView ,useWindowDimensions } from 'react-native'
import React,{useState} from 'react'
import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton'
import SocialSignButtons from '../../components/SocialSignButtons'
import { useNavigation } from '@react-navigation/native'
import { EMAIL_REGEX } from '../../components/Regex/Regex'
import { useForm } from 'react-hook-form'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';


const auth = getAuth();
const SignInScreen = () => {
  const {height} = useWindowDimensions();
  const navigation = useNavigation();
  const {control, handleSubmit, formState: {errors}} = useForm();
  const [error, setError] = useState('');

  
  const onLoginPressed = async (data) => {    
    try {      
      const user = await signInWithEmailAndPassword( auth ,data.email, data.password)
      

    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        setError('email',{
          type: error.code,
          message: "User not found"
        })
      } else if (error.code === 'auth/wrong-password') {
        setError('password',{
          type: error.code,
          message: "Incorect password"
        })
      } else {
        setError(error.message);
      }
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
      <View style={styles.container}>
        <Text>Email/Phone number</Text>
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
            <CustomInput 
              name="password"
              placeholder="Password"
              control={control}
              rules={{
                required: "Password is required", 
                minLength: {value: 6, message: "Password should be minimum of 6 characters long."}
              }}
              secureTextEntry={true} 
            />           
            <View>
              <CustomButton           
                  text="Forgot Password?"
                  onPress={handleSubmit(onLoginPressed)}
                  type="TERTIARY"
              />
            </View>
          
            <CustomButton 
            text="Login"
            onPress={handleSubmit(onLoginPressed)}       
            />
          </View>
          <SocialSignButtons/>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
  },
  container: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 30,
  },
})

export default SignInScreen;