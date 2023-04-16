import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ReservationScreen = () => {
  return (
    <View style={styles.root}>
      <Text>ReservationScreen</Text>
    </View>
  )
}

export default ReservationScreen

const styles = StyleSheet.create({
  root:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})