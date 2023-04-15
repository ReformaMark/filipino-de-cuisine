import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { useFonts, Inika_400Regular, Inika_700Bold } from '@expo-google-fonts/inika';
import LogoImage from '../../assets/logo.png';
import { Dimensions } from 'react-native';

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
            <Image source={LogoImage}/>
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
        alignItems:'center',
        justifyContent: 'space-evenly',
        width: Dimensions.get('screen').width,
        
      },
      logo: {
       lineHeight: 40,
       fontSize: 20,
       fontWeight: 700,
      },

})