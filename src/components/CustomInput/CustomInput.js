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
              
              <Icon 
                type={type}
                name={iconName}
                color={colors.darkBrown}
                size={28}     
              />
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
      backgroundColor: 'rgba(245, 245, 245, 1)',
      width: '100%',
      borderRadius: 10,
      paddingHorizontal: 10,
      paddingVertical: 5,
      marginVertical: 5,
    },
    input: {
     width: '100%',
    }
  })

export default CustomInput