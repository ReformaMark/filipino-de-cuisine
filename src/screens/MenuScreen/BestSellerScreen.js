import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import CustomInput from '../../components/CustomInput/CustomInput';
import CartIcon from '../../components/CartIcon/CartIcon';
import { useForm } from 'react-hook-form'
import { getAuth } from 'firebase/auth';
import { useToast } from 'react-native-toast-notifications';
import { Card } from 'react-native-elements';
import { Icon } from '@rneui/themed';

const BestSellerScreen = ({navigation, route}) => {
    const toast = useToast();
    const {width} = useWindowDimensions(); 
    const {control, handleSubmit,setError, formState: {errors}} = useForm();
    const { selectedCategory, filteredMenuItems} = route.params;
    const [ orderItems , setOrderItems ] = useState([]);
    const [ noOrderItems , setNoOrderItems ] = useState('');
    const [user, setUser] = useState();
    const auth = getAuth();

  useEffect(()=>{
    setUser(auth.currentUser)
  },[])
    useEffect(() => {
        const fetchOrderItems = async () => {
          try {
            const response = await axios.get(`http://192.168.100.18:3000/api/orderItems/${selectedCategory}`);
                setOrderItems(response.data);
          } catch (error) {
            console.log(error);
          }
        };
        fetchOrderItems();
      }, []);

      const orderItem = async (userId, quantity, menuItemId) => {
        try {
          const response = await axios.post('http://192.168.100.18:3000/api/basketItem', { userId, quantity, menuItemId });
          return response.data;
        } catch (error) {
          console.error(error);
          throw new Error('Error creating order item.');
        }
      };

      const handleAddToCart = async (item) => {
        try {
          if(user != undefined){
          const orderItemData = await orderItem(user.uid, 1, item.id);
          toast.show(`${item.name} Added to cart!`, {
            type: "success",
            placement: "bottom",
            duration: 2000,
            offset: 100,
            animationType: "slide-in"
          });
        } else {
          navigation.navigate('MainAuthTab');
        }
        } catch (error) {
          console.error(error);
        }
      };
      const topThreeItems = orderItems.slice(0, 3);
  return (
    <ScrollView style={{backgroundColor:'rgba(245, 245, 245, 1)'}}>
    <View>
        <View style={{paddingVertical: 20, paddingHorizontal: 30}}>
            
        </View>
        <View style={{paddingHorizontal: 120,}}>
            <View style={styles.selectedCategory}>
                <Text style={{color: 'white', textAlign: 'center'}}>{selectedCategory}</Text>
            </View>
            
        </View>
        <View style={{padding: 20,backgroundColor: 'white', borderTopLeftRadius: 30, borderTopRightRadius: 30, justifyContent: 'center', alignItems:'center'}}>
            <Text style={{fontSize: 12, fontWeight: '400',alignSelf: 'flex-start'}}>{selectedCategory}</Text>
            <View style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', marginVertical: 40}}>
                <Icon
                    name='plus'
                    type='feather'
                    size={12}
                />
                <Text style={{fontSize: 12, fontWeight: '700',}}>Best seller in {selectedCategory}</Text>
            </View>
        {topThreeItems?.length > 0 ? topThreeItems.map((item)=>(
            <Card key={item.id} containerStyle={styles.cardContainer} > 
                <TouchableOpacity  onPress={()=>{}}>
                    <View style={styles.imageContainer}>
                    <Image
                        resizeMode='cover'
                        style={styles.image} 
                        source={{uri:item.imgUrl}}
                    />
                    </View>   
                    <View>
                        <Text style={styles.name}>{item.name}</Text>
                        <Text style={styles.price}>₱ {item.price}</Text>
                        <Text style={styles.description} numberOfLines={7}>{item.description}</Text>
                        <TouchableOpacity onPress={() => handleAddToCart(item)} style={styles.addtocart}>
                            <Text style={styles.addtocartText}>Add to Cart</Text>
                        </TouchableOpacity>          
                    </View>
                </TouchableOpacity>
            </Card>
        )):
            <View style={{marginVertical: 20, paddingHorizontal:50 }}>
                <Text style={{fontSize: 12, fontWeight: '700', color: 'gray'}}>There are no orders created yet in this category.</Text>
            </View>
        }
        </View>
    </View>

    </ScrollView>
  )
}

export default BestSellerScreen

const styles = StyleSheet.create({
    selectedCategory:{
        padding: 10,
        backgroundColor:'red',
        borderRadius: 50,
        color: 'white',
        marginBottom: 20,
      },
      cardContainer:{
        flexBasis: '40%',
        paddingTop: 5,
        height: 145, 
        width: 145,  
        borderColor: '#fff',
        marginTop: 20,
        borderRadius: 10,
        borderColor:'black',
        flexDirection: 'row',
        marginBottom: 15,
        elevation: 6,
      },
      imageContainer:{
        position: 'absolute',
        top: -20,
        left: -35,
      },
      image: {
        width: 60,
        height: 60,
        marginBottom: 10,
        borderRadius: 100,
      },
      name:{
        fontSize: 10,
        marginStart: 30,
        fontWeight: 700,
      },
      description:{
        fontSize: 7,
        textAlign:'center',
      },
      price:{
        fontSize: 12,
        marginStart: 30,
        color: '#DC2626',
      },
      addtocart:{
        position:'absolute',
        top: 125,
        left: 23,
        width: '60%',
        backgroundColor:'#10B981',
        padding: 7,
        borderRadius: 6,
      },
      addtocartText:{
        textAlign: 'center',
        fontWeight:'700',
        fontSize: 6,
        color:'#FFFFFF',
      },
      categoryBtn:{
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
        marginVertical: 10,
        paddingHorizontal: 20,
      },
      category:{
        padding: 10,
        backgroundColor:'rgba(245, 245, 245, 1)',
        borderRadius: 50,
        width: Dimensions.get('screen').width * 0.2,
        elevation: 8,
        
      },
})