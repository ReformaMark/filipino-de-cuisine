import { View, Text, TextInput, StyleSheet} from 'react-native';
import { useState} from 'react';
import { Icon } from '@rneui/base';
import { colors } from '../../global/styles';
import { Controller } from 'react-hook-form';
import { TouchableOpacity } from 'react-native';

const CustomInput = ({control, name, placeholder,rules={}, secureTextEntry, type, iconName, keyboardType, editable}) => {
  

  return (
      <Controller 
        name={name}
        control={control}
        rules={rules}
        render={({field: {value, onChange, onBlur}, fieldState:{error}}) => (
          <>
            <View style={[styles.container, {borderColor: error ? 'red' : '#dea02c'}]}>
              
              <TouchableOpacity style={{position: 'absolute', top: 10,left: 215, zIndex: 2}}>
              <Icon 
                type={type}
                name={iconName}
                color={colors.darkBrown}
                size={28}     
                
              />
              </TouchableOpacity>
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder={placeholder}
                style={styles.input}
                secureTextEntry = {secureTextEntry}
                keyboardType={keyboardType}
                editable={editable}
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
    },
    input: {
      width: '100%',
      borderColor: colors.darkBrown,
      borderWidth: 1,
      padding: 10,
      borderRadius: 10,
      backgroundColor: 'white'
    }
  })

export default CustomInput