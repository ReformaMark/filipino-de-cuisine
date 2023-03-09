import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAuthentication } from '../../hooks/useAuthentication';
import { Button } from 'react-native-elements';
import { getAuth, signOut } from "firebase/auth";
import { app } from '../../../config/firebaseConfig'
export default function HomeScreen({ navigation }) {

  const { user } = useAuthentication();
  const auth = getAuth(app)

  const handleSignOut = () => {
    if (user) {
      signOut(auth)
      .then(() => {
        console.log("Successfully signed out");
      })
      .catch((error) => {
        console.error(error);
      });
    }
  };

  return (
    <View style={styles.container}>
      {user ? (
        <View style={styles.userInfo}>
          <Text>Welcome back, {user.displayName}!</Text>
            <Button 
              title="Sign out" 
              onPress={handleSignOut} 
            />
        </View>
      ) : (
        <>
          <Text>Welcome to Filipino de Cuisine!</Text>
          <View style={styles.buttons}>
            <Button
              title="Sign In"
              buttonStyle={styles.button}
              onPress={() => navigation.navigate('SignIn')}
            />
            <Button
              title="Sign Up"
              type="outline"
              buttonStyle={styles.button}
              onPress={() => navigation.navigate('SignUp')}
            />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttons: {
    marginTop: 20,
  },
  button: {
    marginBottom: 10,
  },
});