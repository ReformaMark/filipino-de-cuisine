import {useEffect, useState} from 'react';
import { getAuth, onAuthStateChanged, sendEmailVerification} from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

const auth = getAuth();
export function useAuthentication() {
  
  const [user, setUser] = useState();

  useEffect(() => {
    const unsubscribeFromAuthStatuChanged = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
      
       
          setUser(user);

      } else {
        // User is signed out
        setUser(undefined);
      }
    });

    return unsubscribeFromAuthStatuChanged;
  }, []);

  return {
    user
  };
}