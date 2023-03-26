import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useFonts, Inika_400Regular, Inika_700Bold } from '@expo-google-fonts/inika';


const Logo = () => {
    const [fontsLoaded] = useFonts({
        Inika_400Regular,
        Inika_700Bold,
    });
    if (!fontsLoaded) {
    return null;
    } else {      
    return (
        <View style={styles.logoContainer}>
            <Text style={[styles.logo, {color: '#DC2626', fontFamily: 'Inika_400Regular'}]}>FILIPINO</Text>
            <Text style={[styles.logo, {color: '#78716C'}]}>DE</Text> 
            <Text style={[styles.logo, {color: '#000000'}]}>CUISINE</Text>  
        </View>
    )
    }
}


export default Logo

const styles = StyleSheet.create({
    logoContainer:{
        flexDirection: 'row',
        columnGap: 10,
        alignItems:'center',
        justifyContent: 'center',
        
      },
      logo: {
       lineHeight: 40,
       fontSize: 30,
       fontWeight: 700,
      },

})