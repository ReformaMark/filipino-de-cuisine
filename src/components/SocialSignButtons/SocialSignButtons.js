import React from 'react'
import CustomButton from '../CustomButton/CustomButton'
import { Text, StyleSheet } from 'react-native'
import { View } from 'react-native'

const SocialSignButtons = () => {
    
    const onSigninToGoogle =  () =>{
        console.warn("You pressed the google")
      }
      const onSigninToFacebook =  () =>{
        console.warn("You pressed the facebook")
      }
      const onSignInApple =  () =>{
        console.warn("You pressed the Apple")
      }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Or</Text>
       <CustomButton 
        style={styles.socialButton}
        iconType='ant-design'
        color='red'
        name='google'
        text="Sign In with Google"
        onPress={onSigninToGoogle}
        bgColor="#FAE9EA"
        fgColor="#DD4D44"
        type='SOCIAL'
      />
      <CustomButton 
        style={styles.socialButton}
        iconType='entypo'
        color='blue'
        name='facebook-with-circle'
        text="Sign In with Facebook"
        onPress={onSigninToFacebook}
        bgColor="#E7EAF4"
        fgColor="#4765A9"
        type='SOCIAL'
      />
    </View>
  )
}

const styles = StyleSheet.create({
  text:{
    marginVertical: 10,
    textAlign: 'center',
    fontWeight: 500,
  },
  container:{
    paddingHorizontal: 20,
  },
})

export default SocialSignButtons