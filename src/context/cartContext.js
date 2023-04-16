import React,{ createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider =  ({children}) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (item) => {
        setCartItems(() => [...cartItems, item]);
        console.log('added to cart')
      };

      const removeFromCart = (item) => {
        setCartItems((prevCartItems) =>
          prevCartItems.filter((cartItem) => cartItem.id !== item.id)
        );
      };

      return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
          {children}
        </CartContext.Provider>
      );
    
}