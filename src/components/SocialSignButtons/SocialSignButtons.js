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
        iconType='fontAwesome'
        color='#FFFFFF'
        name='facebook'
        text="Sign In with Facebook"
        onPress={onSigninToFacebook}
        bgColor="#3B5998"
        fgColor="#FFFFFF"
        type='SOCIAL'
      />
       <CustomButton 
        style={styles.socialButton}
        iconType='ant-design'
        color='#FFFFFF'
        name='google'
        text="Sign In with Google"
        onPress={onSigninToGoogle}
        bgColor="#EA4335"
        fgColor="#FFFFFF"
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