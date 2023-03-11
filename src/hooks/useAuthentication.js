import React, {useEffect, useState} from 'react';
import { getAuth, onAuthStateChanged, User, sendEmailVerification} from 'firebase/auth';

const auth = getAuth();

export function useAuthentication() {
  const [user, setUser] = useState();

  useEffect(() => {
    const unsubscribeFromAuthStatuChanged = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        
        if(user.emailVerified){
          setUser(user);
        } else {
          alert("Please verify your email")
          sendEmailVerification(user)
          console.log("Email verification link has been sent")
        }
        console.log(user)
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