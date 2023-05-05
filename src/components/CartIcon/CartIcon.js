import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { useAuthentication } from '../../hooks/useAuthentication';
import axios from 'axios';
import Cart from './images/cartIcon.png';
import { Touchable } from 'react-native';
import { TouchableOpacity } from 'react-native';

export default function CartIcon() {
  const { user } = useAuthentication();
  const navigation = useNavigation();
  const [basketItem, setBasketItem] = useState([]);
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
        const response = await axios.get('http://192.168.100.18:3000/api/basketItem');
        setBasketItem(response.data);
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
    const filteredOrderItems = basketItem.filter((item) => item.customerId === userId ).length;
    setCartItemsCount(filteredOrderItems);
  }, [basketItem]);

  return (
    <View style={styles.container}>
      {user != undefined ?
      <>
      <TouchableOpacity onPress={()=>navigation.navigate('Cart')}>
      <Image
        source={Cart}
        style={{width: 40, height: 40}}
        
      />
      </TouchableOpacity>
      {cartItemsCount > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{cartItemsCount}</Text>
        </View>
      )}
    </> :
    <>
       <TouchableOpacity onPress={()=>navigation.navigate('MainAuthTab')}>
      <Image
        source={Cart}
        style={{width: 40, height: 40}}
        
      />
      </TouchableOpacity>
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
