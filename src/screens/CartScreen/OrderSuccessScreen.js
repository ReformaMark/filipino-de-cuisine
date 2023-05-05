import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Icon } from 'react-native-elements'
import CustomButton from '../../components/CustomButton/CustomButton'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useState } from 'react'
import { useEffect } from 'react'

const OrderSuccessScreen = ({navigation, route}) => {
    const [recentOrderId, setResentOrderId] = useState();
    const { orderId } = route.params;
  

    const handleViewOrderStatus = () =>{
        navigation.navigate('OrderStatusScreen', { id: orderId})
    }   
    const handleReturnToHomeScreen = () =>{
        navigation.navigate('HomeScreen')
    }   
  return (
    <View style={styles.rootContainer}>
        <View style={styles.container}>
            <Icon 
            name='check-circle'
            type='feather'
            size={40}
            />
            <Text style={styles.resultText}>Order Successfully</Text>
        </View>
        <View style={styles.button}>
            <CustomButton
                text='View Order Status'
                onPress={handleViewOrderStatus}
            />
        </View>
        <View style={styles.button}>
            <CustomButton
                text='Return To Home Screen'
                onPress={handleReturnToHomeScreen}
            />
        </View>
        
    </View>
  )
}

export default OrderSuccessScreen

const styles = StyleSheet.create({
    rootContainer:{
        paddingTop: 250,
        paddingHorizontal: 30,
    },
    resultText:{
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 500,
    marginVertical: 20,
    },
    container:{
        padding: 30,
        borderWidth: 1,
        borderColor: 'black',
    },
    button:{
        marginTop: 30,
        paddingHorizontal: 30,
    },
})