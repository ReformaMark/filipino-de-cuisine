import React, { useState, useEffect } from 'react'
import CustomButton from '../CustomButton/CustomButton'
import { Text, StyleSheet } from 'react-native'
import { View } from 'react-native'
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { 
  GoogleAuthProvider, 
  FacebookAuthProvider, 
  getAuth, 
  signInWithCredential, 
  signInWithPopup } from 'firebase/auth';
import * as GoogleAuthSession from 'expo-auth-session';
import { useIdTokenAuthRequest} from 'expo-auth-session/providers/google';
import { googleLogInConfig } from './googleConfig';


//https://github.com/expo/expo/issues/8185

WebBrowser.maybeCompleteAuthSession();
const SocialSignButtons = () => {
  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const auth = getAuth()
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "600142616435-bhdjtdj2i2t8cpdosudnipa12k59bvf6.apps.googleusercontent.com",
    expoClientId:'600142616435-s68l80bsam0q4oebbq103hdqplki9ijd.apps.googleusercontent.com'

  });

 useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      console.log(response.authentication.accessToken)
      const credential = GoogleAuthProvider.credential(null, response.authentication.accessToken);
      signInWithCredential(auth, credential).then((userCredential) => {
        const user = userCredential.user;
        setUserInfo(user);
      })
      .catch((error) => {
        console.log(error);
      });
      setToken(response.authentication.accessToken);
      getUserInfo();
    }
  }, [response, token]);


  const getUserInfo = async () => {
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const user = await response.json();
      setUserInfo(user);
      console.log(user)
    } catch (error) {
      // Add your own error handler here
    }
  };
 
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Or</Text>
      <CustomButton 
        style={styles.socialButton}
        iconType='fontAwesome'
        color='#FFFFFF'
        name='facebook'
        text="Sign In with Facebook"
        onPress={()=>{}}
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
        disabled={!request}
        onPress={() => {
          promptAsync();
        }}
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
    
  },
  
})

export default SocialSignButtons