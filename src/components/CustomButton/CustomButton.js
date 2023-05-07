import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { colors, parameter } from '../../global/styles'
import { Icon } from '@rneui/themed'
import { androidRipple } from '@rneui/base'
import { useState } from 'react'

const CustomButton = ({onPress, text, type="PRIMARY", bgColor, fgColor, size, name, iconType, color, disabled}) => {
    const [isPressed, setIsPressed] = useState(false);

    const handlePressIn = () => setIsPressed(true);
    const handlePressOut = () => setIsPressed(false);
  
    const buttonStyle = isPressed ? styles.buttonPressed : styles.button;
  return (
    <Pressable 
        onPress={onPress} 
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
        style={(pressed) => [
            styles.container, 
            styles[`container_${type}`],
            bgColor ? {backgroundColor: bgColor} : {},
            
                buttonStyle,
                {
                    opacity: pressed? 1 : 0.5,
                },
                
        ]}
        androidRipple={{color: '#DDDDDD'}}
    >
    <Icon
        style={styles.icon}
        name={name}
        type={iconType}
        size={size}
        color={color}
    />
    <Text 
        style={[
            styles.text, 
            styles[`text_${type}`],
            fgColor ? {color: fgColor} : {}
    ]}>
    {text}
    </Text>
    </Pressable>
  )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        padding: 5,
        marginVertical: 0,
        alignItems: 'center',
        borderRadius: 5,
        justifyContent: 'center'

    },

    container_PRIMARY:{
        backgroundColor: colors.brown,
    },

    container_TERTIARY:{
        
    },
    container_SECONDARY:{
        borderColor: '#3B71F3',
        borderWidth: 2,
    },
    container_SOCIAL:{
        width: '100%',
        padding: 10,
        borderRadius: 20,
        paddingLeft: 30,
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',        
        columnGap: 60,
    },

    text:{
        fontWeight: 'bold',
        color: 'white',
        
    },

    text_TERTIARY:{
        color: 'gray',
    },
    text_SECONDARY:{
        color: 'blue',
    },
    icon:{
       
    },
    buttonPressed: {
        backgroundColor: 'rgba(192,192,192, 0.2)',
        borderRadius: 5,
   
      },
})

export default CustomButton