import { View, Text, TextInput, StyleSheet} from 'react-native';
import { useState} from 'react';
import { Icon } from '@rneui/base';
import { colors } from '../../global/styles';
import { Controller } from 'react-hook-form';
import { TouchableOpacity } from 'react-native';

const CustomPasswordInput = ({control, name, placeholder,rules={}, secureTextEntry, type, iconName, keyboardType}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
      <Controller 
        name={name}
        control={control}
        rules={rules}
        render={({field: {value, onChange, onBlur}, fieldState:{error}}) => (
          <>
            <View style={[styles.container, {borderColor: error ? 'red' : '#dea02c'}]}>
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder={placeholder}
                style={styles.input}
                secureTextEntry = {!showPassword}
                keyboardType={keyboardType}
              />
               <TouchableOpacity onPress={togglePasswordVisibility} style={styles.icon}>
                <Icon 
                  type='font-awesome'
                  name={showPassword ? "eye" : "eye-slash" }
                  color={colors.darkBrown}
                  size={30}     
                />
              </TouchableOpacity>
            </View>
            {error && (<Text style={{color: 'red', alignSelf: 'stretch'}}>{error.message || 'Error'}</Text>)}
          </>
        )}
      />
  )
};

export default CustomPasswordInput

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
     borderColor: colors.darkBrown,
     padding: 5,
    },
    icon:{
      position: 'absolute',
      top: 10,
      left: 280,
    },
  })

