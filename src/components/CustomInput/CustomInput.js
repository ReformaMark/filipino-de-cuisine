import { View, Text, TextInput, StyleSheet} from 'react-native';
import React from 'react';
import { Icon } from '@rneui/base';
import { colors } from '../../global/styles';
import {Controller} from 'react-hook-form';

const CustomInput = ({control, name, placeholder,rules={}, secureTextEntry, type, iconName}) => {

  return (
      <Controller 
        name={name}
        control={control}
        rules={rules}
        render={({field: {value, onChange, onBlur}, fieldState:{error}}) => (
          <>
            <View style={[styles.container, {borderColor: error ? 'red' : '#e8e8e8'}]}>
              <Icon 
                  type={type}
                  name={iconName}
                  color={colors.paleRose}
                  size={28}     
                />
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder={placeholder}
                style={styles.input}
                secureTextEntry = {secureTextEntry}
              />
            </View>
            {error && (<Text style={{color: 'red', alignSelf: 'stretch'}}>{error.message || 'Error'}</Text>)}
          </>
        )}
      />
  )
};

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      backgroundColor: 'white',
      width: '100%',
      borderRadius: 5,
      borderWidth: 1,
      borderColor: '#e8e8e8' ,
      paddingHorizontal: 10,
      paddingVertical: 5,
      marginVertical: 5,
    },
    input: {
     width: '100%',
    }
  })

export default CustomInput