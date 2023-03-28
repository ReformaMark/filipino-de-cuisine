import { StyleSheet, Text, View } from 'react-native'
import React,{ useLayoutEffect }  from 'react'
import CartIcon from '../../components/CartIcon';

const FoodScreen = ({navigation}) => {
    //set icon to the right of the header navbar
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ marginRight: 20, justifyContent:'center' }}>
          <CartIcon/>
        </View>
      ),
    });
  }, [navigation]);
  return (
    <View>
      <Text>FoodScreen</Text>
    </View>
  )
}

export default FoodScreen

const styles = StyleSheet.create({})