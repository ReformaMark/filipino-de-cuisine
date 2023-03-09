import React from 'react'
import CustomButton from '../CustomButton/CustomButton'


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
    <>
       <CustomButton 
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
        iconType='entypo'
        color='blue'
        name='facebook-with-circle'
        text="Sign In with Facebook"
        onPress={onSigninToFacebook}
        bgColor="#E7EAF4"
        fgColor="#4765A9"
        type='SOCIAL'
      />
      <CustomButton 
        iconType='ant-design'
        color='black'
        name='apple1'
        text="Sign In with Apple"
        onPress={onSignInApple}
        bgColor="#e3e3e3"
        fgColor="#363636"
        type='SOCIAL'
      />
    </>
  )
}

export default SocialSignButtons