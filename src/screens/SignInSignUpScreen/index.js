import { View, Text, Image, StyleSheet, ScrollView ,useWindowDimensions, } from 'react-native'
import React,{useEffect, useState} from 'react'
import FoodImage from './images/image.png'
import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton'
import SocialSignButtons from '../../components/SocialSignButtons'
import { useNavigation } from '@react-navigation/native'
import { EMAIL_REGEX } from '../../components/Regex/Regex'
import { useForm } from 'react-hook-form'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { CheckBox } from '@rneui/themed'

export default function SignInSignUp () {
    const { width } = useWindowDimensions();
    const {control, handleSubmit, formState: {errors}} = useForm();
    const [login, setLogin] = useState(true)
    const [signup, setSignup] = useState(false)
    const [activeText, setActiveText] = useState('login');
    const [check1, setCheck1] = useState(false);

    useEffect(() => {
        if(login){
            setSignup(false)
        } else if(signup) {
            setLogin(false)
            setActiveText('signup');
        }
    },[login, signup])


  return (
    <ScrollView showsVerticalScrollIndicator={false}>  
    <View styles={styles.root}>
        <View style={styles.imageContainer}>
            <Image 
                source={FoodImage} 
                style={styles.image}
            />
           
        </View>

        <View style={styles.tabContainer}>
        <Text
          style={[styles.tabText, activeText === 'login' ? styles.activeTabText : null, {width: width / 2}]}
          onPress={() => {setLogin(true); setSignup(false);setActiveText('login')}}
        >
          Login
        </Text>
        <Text
          style={[styles.tabText, activeText === 'signup' ? styles.activeTabText : null, {width: width / 2}]}
          onPress={() => {setSignup(true); setLogin(false); setActiveText('signup')}}
        >
          Signup
        </Text>
      </View>
        {login &&
        <View style={styles.container}>
        <Text>Email/Phone number</Text>
            <CustomInput 
              name="email"          
              placeholder="Email" 
              control={control}
              rules={{
                required: "Email is required", 
                pattern:{value:EMAIL_REGEX , message: 'Email is invalid'}
              }}
            />
        <Text>Password</Text>
            <CustomInput 
              name="password"
              placeholder="Password"
              control={control}
              rules={{
                required: "Password is required", 
                minLength: {value: 6, message: "Password should be minimum of 6 characters long."}
              }}
              secureTextEntry={true} 
            />
            <View style={{flexDirection: 'row',}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <CheckBox
                    center
                    title="Remember me"
                    checked={check1}
                    onPress={() => setCheck1(!check1)}
                    wrapperStyle='none'
                />
                </View>
            <View>
                    <CustomButton           
                        text="Forgot Password?"
                        onPress={()=>{}}
                        type="TERTIARY"
                    />
                </View>
            </View>
            <CustomButton 
            text="Login"
            onPress={handleSubmit(()=>{})}       
            />
          </View>
        }
        {signup &&
        <View style={styles.container}>
        <Text>Username</Text>
            <CustomInput
            name='username'
            control={control}
            placeholder="Username" 
            rules={{
                required: "Username is required", 
                minLength: {value: 6, message: "Username should be minimum of 6 characters long."}}}
            />
        <Text>Email</Text>
            <CustomInput     
            name='email'
            control={control}         
            placeholder="Email"
            rules={{
                required:"Email is required" ,
                pattern:{value:EMAIL_REGEX , message: 'Email is invalid'}}}
            />
        <Text>Phone number</Text> 
            <CustomInput 
            name='phoneNumber'
            control={control}     
            placeholder="Phone number"
            secureTextEntry={true} 
            rules={{validate: value => value === password || 'Password does not match',required: "Confirm password is required", minLength: {value: 6, message: "Confirm password should be minimum of 6 characters long."}}}
            
            />
        <Text>Password</Text>
            <CustomInput 
            name='password'
            control={control}        
            placeholder="Password"
            secureTextEntry={true} 
            rules={{required: "Password is required", minLength: {value: 6, message: "Password should be minimum of 6 characters long."}}}
            />
        <Text>Confirm password</Text>
            <CustomInput 
            name='confirmPassword'
            control={control}     
            placeholder="Confirm password"
            secureTextEntry={true} 
            rules={{validate: value => value === password || 'Password does not match',required: "Confirm password is required", minLength: {value: 6, message: "Confirm password should be minimum of 6 characters long."}}}

            />
            
        </View>
        }
    </View>
    </ScrollView>
  )
}



const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 20,
      },
    imageContainer: {
        marginTop: 0,
        marginBottom: 50,
        heigth: 100,
      },
    image: {
        width: 360,
        height: 160,
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: "space-evenly",
        width: "100%",
        marginBottom: 20,
      },
      tabText: {
        marginRight: 20,
        borderBottomWidth: 2,
        borderBottomColor: '#ccc',
        paddingBottom: 10,
        textAlign: 'center'
      },
      activeTabText: {
        borderBottomColor: 'green',
      },
      container: {
        width: '100%',
        paddingHorizontal: 20,
      }
})