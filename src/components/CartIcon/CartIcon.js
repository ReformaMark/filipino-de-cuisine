import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { useAuthentication } from '../../hooks/useAuthentication';
import axios from 'axios';

export default function CartIcon() {
  const { user } = useAuthentication();
  const navigation = useNavigation();
  const [orderItem, setOrderItem] = useState([]);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [cartUpdated, setCartUpdated] = useState(false);
  const userUid = user;
  let userId;
  if(userUid != undefined){
    console.log(userUid.uid)
    userId = userUid.uid
}
  useEffect(() => {
    const fetchOrderItem = async () => {
      try {
        const response = await axios.get('http://192.168.100.18:3000/api/orderItem');
        setOrderItem(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrderItem();
  }, [navigation]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setCartUpdated((prev) => !prev); // toggle the state value
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    const filteredOrderItems = orderItem.filter((item) => item.userId === userId && item.orderId == null).length;
    setCartItemsCount(filteredOrderItems);
  }, [orderItem]);

  return (
    <View style={styles.container}>
      {user != undefined ?
      <>
      <Icon
        name='shopping-cart'
        type='font-awesome'
        color='#342006'
        size={35}
        onPress={() => {
          // navigate to cart screen
          navigation.navigate('Cart')
        }}
      />
      {cartItemsCount > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{cartItemsCount}</Text>
        </View>
      )}
    </> :
    <>
      <Icon
      name='shopping-cart'
      type='font-awesome'
      color='#342006'
      size={35}
      onPress={() => {
        // navigate to cart screen
        navigation.navigate('MainAuthTab')
      }}
    />
    {cartItemsCount > 0 && (
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{cartItemsCount}</Text>
      </View>
    )}
    </>
}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#f00',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    minWidth: 20,
    minHeight: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
