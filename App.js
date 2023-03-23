import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { ThemeProvider } from 'react-native-elements';
import './config/firebaseConfig';
import RootNavigation from './src/navigation';


export default function App() {
  return (
    <ThemeProvider>
      
      <RootNavigation />
      
    </ThemeProvider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
