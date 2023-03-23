import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';

export default function CartIcon() {
  const [cartItemsCount, setCartItemsCount] = useState(1);

  const handleAddToCart = (item) => {
    // add item to cart
    setCartItemsCount((prevCount) => prevCount + 1);
  };

  return (
    <View style={styles.container}>
      <Icon
        name='shopping-cart'
        type='font-awesome'
        color='#342006'
        size={35}
        onPress={() => {
          // navigate to cart screen
        }}
      />
      {cartItemsCount > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{cartItemsCount}</Text>
        </View>
      )}
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
