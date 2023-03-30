import { useEffect } from 'react';
import {View, Text} from 'react-native'
import { getAuth } from 'firebase/auth';

const EmailVerificationScreen = ({navigation}) => {
    const auth = getAuth();

    useEffect(() => {
        const unsubscribe =  auth.onAuthStateChanged(user => {
          console.log(user)
          if (user && user.emailVerified) {
            navigation.navigate('Home');
          }
        });        
        return unsubscribe;
    }, []);

  return (
    <View>
      <Text>EmailVerificationScreen</Text>
    </View>
  )
}

export default EmailVerificationScreen

