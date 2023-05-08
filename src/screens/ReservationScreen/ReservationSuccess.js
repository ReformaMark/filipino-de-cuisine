import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomButton from '../../components/CustomButton/CustomButton'
import { Icon } from '@rneui/themed'

const ReservationSucccess = ({navigation}) => {
  return (
    <View style={{paddingHorizontal: 30, paddingTop: 250 }}>
      <View style={styles.container}>
          <Icon 
            name='check-circle'
            type='feather'
            size={40}
          />
            <Text style={styles.resultText}>Reservation Successfully</Text>
            <CustomButton
             text='Okay'
             onPress={()=>navigation.navigate("ReservationGreetings")}
             />
        </View>
    </View>
  )
}

export default ReservationSucccess

const styles = StyleSheet.create({

  container:{
    padding: 30,
    borderWidth: 1,
    borderColor: 'black',
  },
  resultText:{
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 500,
    marginVertical: 20,
  }
})