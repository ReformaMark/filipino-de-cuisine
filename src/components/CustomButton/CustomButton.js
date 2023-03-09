import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { colors, parameter } from '../../global/styles'
import { Icon } from '@rneui/themed'

const CustomButton = ({onPress, text, type="PRIMARY", bgColor, fgColor, size, name, iconType, color}) => {
  return (
    <Pressable 
        onPress={onPress} 
        style={[
            styles.container, 
            styles[`container_${type}`],
            bgColor ? {backgroundColor: bgColor} : {}
    ]}>
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
        marginVertical: 10,
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
        padding: 5,
        paddingLeft: 20,
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        rowGap: 100 ,
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
       
    }
})

export default CustomButton