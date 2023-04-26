import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderImage from './images/accountHeader.png'
import DefaultImage from './images/default.png'
import { Icon, Divider} from '@rneui/themed'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { set } from 'react-hook-form'
import { ActivityIndicator } from 'react-native'
import { ScrollView } from 'react-native'
import { Dimensions } from 'react-native'
const OrderTransactionScreen = ({navigation}) => {
    const [user, setUser] = useState();
    const [isLoading, setIsLoading] = useState(true)
    const [orders, setOrders] = useState([]);
    const [isRendered, setIsRendered] = useState(true);
    const [allBtn, setAllBtn] = useState(true);
    const [pendingBtn, setPendingBtn] = useState(false);
    const [outForDelivery, setoutForDelivery] = useState(false);
    const [preparing, setPreparing] = useState(false);
    const [delivered, setDelivered] = useState(false);
    const [cancelled, setCancelled] = useState(false);



    useEffect(()=>{
        getUser()
    },[isRendered])
    
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setIsRendered(false);
        
        }, 1000); // delay for 1 second
    
        return () => clearTimeout(timeoutId);
    }, []);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setIsLoading(false);
      
        }, 1500); // delay for 3 seconds
    
        return () => clearTimeout(timeoutId);
      }, []);

    useEffect
    const getUser = ()=>{
        try {
            AsyncStorage.getItem('User')
            .then(value => {
            if(value != null){
                const userParse = JSON.parse(value)
                setUser(userParse)
                axios.get(`http://192.168.100.18:3000/api/orders/${userParse.uid}`)
                .then(response =>{
                setOrders(response.data)
                }).catch(error=>{
                    console.log(error)
                })
            }
        }).catch(error =>{
            console.log(error)
        })
        } catch (error) {
            console.log(error)
        }
    }

    console.log(orders)

    const handleAllBtnPressed = ()=>{
        setAllBtn(true)
        setPreparing(false)
        setCancelled(false)
        setDelivered(false)
        setPendingBtn(false)
        setoutForDelivery(false)
    }
    const handlePreparingBtnPressed = ()=>{
        setAllBtn(false)
        setPreparing(true)
        setCancelled(false)
        setDelivered(false)
        setPendingBtn(false)
        setoutForDelivery(false)
    }
    const handlePendingBtnPressed = ()=>{
        setAllBtn(false)
        setPreparing(false)
        setCancelled(false)
        setDelivered(false)
        setPendingBtn(true)
        setoutForDelivery(false)
    }
    const handleOutForDeliveryBtnPressed = ()=>{
        setAllBtn(false)
        setPreparing(false)
        setCancelled(false)
        setDelivered(false)
        setPendingBtn(false)
        setoutForDelivery(true)
    }
    const handleDeliveredBtnPressed = ()=>{
        setAllBtn(false)
        setPreparing(false)
        setCancelled(false)
        setDelivered(true)
        setPendingBtn(false)
        setoutForDelivery(false)
    }
    const handleCancelledBtnPressed = ()=>{
        setAllBtn(false)
        setPreparing(false)
        setCancelled(true)
        setDelivered(false)
        setPendingBtn(false)
        setoutForDelivery(false)
    }
    const sortedOrders = orders.sort((a, b) => b.id - a.id);
  return (
    <View>
        {isLoading ? (
            <View style={styles.loading}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        ) :
        <View>
            <View style={styles.header}>
                <Image 
                    source={HeaderImage}
                />
              
            </View> 
            <View style={styles.userInfoContainer}>
                <View >
                    <Image 
                    source={DefaultImage}
                    style={styles.userImageContainer}
                    />
                </View>
                {user ? 
                <View >        
                    <Text style={styles.displayName}>{user.displayName}</Text>
                    <View style={styles.emailContainer}>
                    <Text style={styles.email}>{user.email}</Text>
                    <Icon 
                        name='pencil'
                        type='font-awesome'
                        size={10}
                    />
                    </View>
                </View> : 
                <Text>Loading...</Text>}
            </View>
            <View style={styles.statusBtnContainer}>
                <TouchableOpacity style={{ borderBottomColor: allBtn ? '#10B981' : 'none',  }} onPress={handleAllBtnPressed}>
                    <Text style={styles.btnText}>All</Text>
                </TouchableOpacity >
                <TouchableOpacity onPress={handlePendingBtnPressed}>
                    <Text style={styles.btnText}>Pending</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleAllBtnPressed}>
                    <Text style={styles.btnText}>Preparing</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleOutForDeliveryBtnPressed}>
                    <Text style={styles.btnText}>Out for Delivery</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleDeliveredBtnPressed}>
                    <Text style={styles.btnText}>Delivered</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleCancelledBtnPressed}>
                    <Text style={styles.btnText}>Cancelled</Text>
                </TouchableOpacity>
            </View>
            <Divider color='#A8A29E'/>

            <View style={styles.label}>
                <Text style={styles.labelText}>Order ID</Text>
                <Text style={styles.labelText}>Date</Text>
                <Text style={styles.labelText}>Cost</Text>
                <Text style={styles.labelText}>Status</Text>
                <Text>   </Text>
            </View>
            <ScrollView style={styles.container}>
            {sortedOrders.map((item) => (
                 
            <View key={item.id} style={styles.orderContainer}>
                <View style={{marginLeft: 50,width: 30}}>
               <Text style={styles.orderItem}>{item.id}</Text>
               </View>
               <View style={{marginLeft: 25,width: 70}}>
               <Text style={styles.orderItem}>{item.createdAt.split("T")[0]}</Text>
               </View>
               <View style={{marginLeft: 5,width: 40,}}>
               <Text style={styles.orderItem}>₱ {item.orderItems.reduce((total, orderTtem) => total + parseFloat(orderTtem.price), 49)}</Text>
               </View>
               <View style={{marginLeft: 20, marginRight: 20, width: 50}}>
               <Text style={styles.orderItem}>{item.onlineOrders[0].deliveryStatus}</Text>
               </View>
               <TouchableOpacity onPress={()=>navigation.navigate('OrderStatusScreen', { orderId: item.id })}>
               <Text style={styles.view}>View</Text>
               </TouchableOpacity>

               
            </View>
            ))}
            </ScrollView>
        </View>    
        }
    </View>
  )
}

export default OrderTransactionScreen

const styles = StyleSheet.create({
    loading:{
        position:'absolute',
        top: 320,
        left: 165,
    },
    userInfoContainer:{
        position: 'absolute',
        top: 90,
        marginHorizontal: 36 ,
        width: '80%',
        backgroundColor: "transparent",
        flexDirection: 'row',
        alignItems: 'center',
    },
        userImageContainer:{
        width: 68,
        height: 68,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: 'black',
    },
        displayName:{
        fontSize: 18,
        fontWeight: '700',
        marginHorizontal: 10,
    },
        emailContainer:{
        flexDirection: 'row',

    },
        email:{
        fontSize: 10,
        fontWeight: '600',
        marginHorizontal: 10,
    },
    statusBtnContainer:{
        justifyContent: 'space-evenly',
        width: '100%',
        flexDirection: 'row',
        paddingTop: 30,
        paddingBottom: 10,
    },
    btnText:{
        fontSize: 10,
        fontWeight: '500',
    },
    label:{
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 20,
        borderBottomWidth: 1,
        borderBottomColor: "rgba(120, 113, 108, 0.09)",
    },
    container:{
       height: Dimensions.get('screen').height * 0.5,
       borderBottomWidth: 1,
       borderBottomColor: "rgba(120, 113, 108, 0.09)",
    },
    orderContainer:{
        flexDirection:'row',
        marginVertical: 10,
    },
    orderItem:{
        fontWeight: '400',
        fontSize: 10,
        textAlign:'left'    
    },
    view:{
        color: '#10B981',
        fontSize: 9,
        fontWeight: '600',
    },
    labelText:{
        color: 'rgba(120, 113, 108, 0.6)',
        fontSize: 10,
        fontWeight: '700',
    }
})