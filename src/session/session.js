import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth, EmailAuthProvider, signInWithCredential } from 'firebase/auth';

const SESSION_STORAGE_KEY = 'myapp_session';
const auth = getAuth();
async function saveSession(user) {
  try {
    const sessionData = JSON.stringify(user.toJSON());
    await AsyncStorage.setItem(SESSION_STORAGE_KEY, sessionData);
  } catch (error) {
    console.error('Error saving session:', error);
  }
}

async function clearSession() {
  try {
    await AsyncStorage.removeItem(SESSION_STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing session:', error);
  }
}

async function getSession() {
  try {
    const sessionData = await AsyncStorage.getItem(SESSION_STORAGE_KEY);
    if (sessionData) {
      const user = auth.currentUser;
      if (user) {
        return user;
      } else {
        const userData = JSON.parse(sessionData);
        const credential = EmailAuthProvider.credential(userData.email, userData.password);
        await signInWithCredential(auth, credential);
        return auth.currentUser;
      }
    }
  } catch (error) {
    console.error('Error getting session:', error);
  }
}

export { saveSession, clearSession, getSession };