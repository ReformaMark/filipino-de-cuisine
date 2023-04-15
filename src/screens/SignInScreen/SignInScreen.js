import { View, Text, StyleSheet, ScrollView, ActivityIndicator,Dimensions } from 'react-native'
import React,{ useState} from 'react'
import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton'
import SocialSignButtons from '../../components/SocialSignButtons'
import { useNavigation } from '@react-navigation/native'
import { EMAIL_REGEX } from '../../components/Regex/Regex'
import { useForm } from 'react-hook-form'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import CustomPasswordInput from '../../components/CustomPasswordInput/CustomPasswordInput'


const auth = getAuth();
const SignInScreen = ({navigation}) => {
  const {control, handleSubmit,setError, formState: {errors}} = useForm();
  const [loading, setLoading ] = useState(false);
 

  const onLoginPressed = async (data) => {  
    setLoading(true)
    try {      
      const userCredential = await signInWithEmailAndPassword( auth ,data.email, data.password)
      const user = userCredential.user;
      if(user){
        console.log(user)
        setLoading(false) 
        if (!user.emailVerified) {
          navigation.navigate('EmailVerify')
          console.log('User is not verified');
        } else {
          // User is verified, proceed to the app
          console.log('User is verified');
        }
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
    console.warn("You pressed the forgot password")

    navigation.navigate('ForgotPassword')
  }
  const onSignUpPressed =  () =>{
    console.warn("You pressed the Sign Up")
    navigation.navigate('SignUp')
  }
  
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor: 'white'}}>    
    {loading && 
         <ActivityIndicator size={100 || 'large'} color="#10B981" style={[styles.loading]} />    
      }   
      <View style={[styles.container, { height: Dimensions.get('screen').height-240}]}>             

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
    backgroundColor: 'white',
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

