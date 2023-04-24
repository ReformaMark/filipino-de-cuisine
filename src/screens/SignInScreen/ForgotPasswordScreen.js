import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import React, { useState } from 'react';
import {Dialog} from '@rneui/themed';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import HeaderImage from '../MenuScreen/images/headerImage.png';
import { useForm } from 'react-hook-form'
import CustomInput from '../../components/CustomInput/CustomInput';
import { EMAIL_REGEX } from '../../components/Regex/Regex';
import CustomButton from '../../components/CustomButton/CustomButton';


const ForgotPasswordScreen = ({navigation}) => {
  const auth = getAuth();
  const {control, handleSubmit,setError, formState: {errors}} = useForm();
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);

  const toggleDialog1 = () => {
    setVisible(!visible);
  };

  const handleSendPasswordReset = (data) => {
    sendPasswordResetEmail(auth, data.email)
      .then(() => {
        setMessage('Go to your email to reset your password.');
        console.log("pressed");
        toggleDialog1()
      })
      .catch((error) => {
        if(error.code === 'auth/missing-email'){
          setError('email',{
            type: error.code,
            message: "Please type your email"
          });
        } else if(error.code === 'auth/user-not-found'){
          setError('email',{
            type: error.code,
            message: "Please enter a registered email"
          });
        } else {
          setError(error.message);
        }
      });
  };

  return (
    <ScrollView style={{backgroundColor: 'white'}}>
      <View>
          <Image
            source={HeaderImage}
            resizeMode='contain'
            style={styles.Image}
            alt='Header Image'
          />
      </View>
      <View style={styles.container}>        
        <Text style={styles.title}>Reset your Password</Text>
        <Text style={styles.enterEmail}>Enter your email</Text>
        <CustomInput 
          name="email"          
          placeholder="Email" 
          control={control}
          rules={{
            required: "Email is required", 
            pattern:{value:EMAIL_REGEX , message: 'Email is invalid'}
          }}
        />
        <View style={styles.input}>
          <CustomButton 
            text="Send"
            onPress={handleSubmit(handleSendPasswordReset)}     
          />
          <View style={{marginTop: 20,}}>
            <CustomButton 
              text="Login"
              onPress={()=>navigation.navigate('Sign In')}     
            />
          </View>
          
        </View>
        <Dialog 
          isVisible={visible}
          onBackdropPress={toggleDialog1}
          overlayStyle={{ backgroundColor: 'white', borderRadius: 10 }}
        >
          <Text style={styles.message}>{message}</Text>
        </Dialog>
      </View>
    </ScrollView>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  Image:{

  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 50,
    textAlign:'center',
  },
  enterEmail:{
    textAlign: 'left',
  },
  input: {
    width: '100%',
    marginVertical: 30,
  },
  button: {
    backgroundColor: '#10B981',
    borderRadius: 5,
    paddingVertical: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  message: {
    textAlign: 'center',
    marginVertical: 70,
    color: 'black',
    fontSize: 17,
    fontWeight: '400',
  },
});