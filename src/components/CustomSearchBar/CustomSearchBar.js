import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomInput from '../CustomInput'
import { useForm } from 'react-hook-form'

const CustomSearchBar = () => {

    const {control, handleSubmit,setError, formState: {errors}} = useForm();

  return (
    
    <View style={{paddingHorizontal: 20, marginVertical: 10}}>
        <CustomInput 
          name="search"          
          placeholder="Search foods" 
          iconName='search'
          control={control}
        />          
      </View>
  )
}

export default CustomSearchBar

const styles = StyleSheet.create({})