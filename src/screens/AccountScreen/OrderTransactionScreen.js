import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderImage from './images/accountHeader.png'
import DefaultImage from './images/default.png'
import { Icon, Divider, Avatar} from '@rneui/themed'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { set } from 'react-hook-form'
import { ActivityIndicator } from 'react-native'
import { ScrollView } from 'react-native'
import { Dimensions } from 'react-native'
import PendingIcon from './images/preparation.png';
import DeliveredIcon from './images/delivered1.png';
import OnTheWayIcon from './images/delivery.png';
import PreparingIcon from './images/preparing1.png';
import Dinner from './images/dinner.png';
import IconLogo from './images/logo.png';
import Logo from '../../components/Logo'
import { getAuth } from 'firebase/auth'

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
    const [selectedStatus, setSelectedStatus] = useState('');
    const auth = getAuth();

    useEffect(()=>{
        getUser()
    },[isRendered])
    
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setIsRendered(false);
        
        }, 1000); // delay for 1 second
    
        return () => clearTimeout(timeoutId);
    }, [navigation]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setIsLoading(false);
      
        }, 1500); // delay for 3 seconds
    
        return () => clearTimeout(timeoutId);
      }, []);

    useEffect
    const getUser = ()=>{
   
       
        axios.get(`http://192.168.100.18:3000/api/orders/${auth.currentUser.uid}`)
        .then(response =>{
        setOrders(response.data)
        }).catch(error=>{
            console.log(error)
        })

    
    
    }

    const handleAllBtnPressed = (selectedStatus)=>{
        setAllBtn(true)
        setPreparing(false)
        setCancelled(false)
        setDelivered(false)
        setPendingBtn(false)
        setoutForDelivery(false)
        setSelectedStatus(selectedStatus)

    }
    const handlePreparingBtnPressed = (selectedStatus)=>{
        setAllBtn(false)
        setPreparing(true)
        setCancelled(false)
        setDelivered(false)
        setPendingBtn(false)
        setoutForDelivery(false)
        setSelectedStatus(selectedStatus)
    }
    const handlePendingBtnPressed = (selectedStatus)=>{
        setAllBtn(false)
        setPreparing(false)
        setCancelled(false)
        setDelivered(false)
        setPendingBtn(true)
        setoutForDelivery(false)
        setSelectedStatus(selectedStatus)
    }
    const handleOutForDeliveryBtnPressed = (selectedStatus)=>{
        setAllBtn(false)
        setPreparing(false)
        setCancelled(false)
        setDelivered(false)
        setPendingBtn(false)
        setoutForDelivery(true)

        setSelectedStatus(selectedStatus)
    }
    const handleDeliveredBtnPressed = (selectedStatus)=>{
        setAllBtn(false)
        setPreparing(false)
        setCancelled(false)
        setDelivered(true)
        setPendingBtn(false)
        setoutForDelivery(false)
        setSelectedStatus(selectedStatus)
    }
    const handleCancelledBtnPressed = (selectedStatus)=>{
        setAllBtn(false)
        setPreparing(false)
        setCancelled(true)
        setDelivered(false)
        setPendingBtn(false)
        setoutForDelivery(false)
        setSelectedStatus(selectedStatus)
    }
    const sortedOrders = orders.sort((a, b) => b.id - a.id);
  
    const filteredOrders = sortedOrders.filter((item)=> item.onlineOrders[0].deliveryStatus === selectedStatus)

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
                <Avatar
                    size={65}
                    rounded
                    title={auth.currentUser.displayName.charAt(0)}
                    containerStyle={{ backgroundColor: '#3d4db7' }}
                />
                </View>
                {auth.currentUser ? 
                <View >        
                    <Text style={styles.displayName}>{auth.currentUser.displayName}</Text>
                    <View style={styles.emailContainer}>
                    <Text style={styles.email}>{auth.currentUser.email}</Text>
                    <Icon 
                        name='pencil'
                        type='font-awesome'
                        size={10}
                        color="white"
                    />
                    </View>
                </View> : 
                <Text>Loading...</Text>
                }
            </View>
            <Image
                source={Dinner}
                style={{height: 100, width: '100%', marginTop: 130, marginBottom: 10}}
                
            />
            <View style={{flexDirection: 'row', width: '100%', backgroundColor: 'white', justifyContent:'space-evenly'}}>
                <TouchableOpacity style={{alignItems:'center'}} onPress={()=>handlePendingBtnPressed('Pending')}>
                    <Image 
                    source={PendingIcon}
                    resizeMode='contain'
                    style={{width: 60, height:60}}
                    />
                     <Text style={{fontSize: 10, fontWeight: '400'}}>Pending</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{alignItems:'center'}} onPress={()=>handlePreparingBtnPressed('Preparing')}>
                    <Image 
                    source={PreparingIcon}
                    resizeMode='contain'
                    style={{width: 60, height:60}}
                    />
                     <Text style={{fontSize: 10, fontWeight: '400'}}>Preparing</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{alignItems:'center'}} onPress={()=>handleOutForDeliveryBtnPressed('OutForDelivery')}>
                    <Image 
                    source={OnTheWayIcon}
                    resizeMode='contain'
                    style={{width: 60, height:60}}
                    />
                     <Text style={{fontSize: 10, fontWeight: '400'}}>Out for Delivery</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{alignItems:'center'}} onPress={()=>handleDeliveredBtnPressed('Delivered')}>
                    <Image 
                    source={DeliveredIcon}
                    resizeMode='contain'
                    style={{width: 60, height:60}}
                    />
                    <Text style={{fontSize: 10, fontWeight: '400'}}>Delivered</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.statusBtnContainer}>
                <TouchableOpacity style={{ borderBottomColor: allBtn ? '#10B981' : 'transparent', borderBottomWidth: 1,  }} onPress={()=>handleAllBtnPressed('')}>
                    <Text style={styles.btnText}>All</Text>
                </TouchableOpacity >
                <TouchableOpacity style={{ borderBottomColor: pendingBtn ? '#10B981' : 'transparent', borderBottomWidth: 1,  }} onPress={()=>handlePendingBtnPressed('Pending')}>
                    <Text style={styles.btnText}>Pending</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ borderBottomColor: preparing ? '#10B981' : 'transparent', borderBottomWidth: 1,  }} onPress={()=>handlePreparingBtnPressed('Preparing')}>
                    <Text style={styles.btnText}>Preparing</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ borderBottomColor: outForDelivery ? '#10B981' : 'transparent', borderBottomWidth: 1,  }} onPress={()=>handleOutForDeliveryBtnPressed('OutForDelivery')}>
                    <Text style={styles.btnText}>Out for Delivery</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ borderBottomColor: delivered ? '#10B981' : 'transparent', borderBottomWidth: 1,  }} onPress={()=>handleDeliveredBtnPressed('Delivered')}>
                    <Text style={styles.btnText}>Delivered</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ borderBottomColor: cancelled ? '#10B981' : 'transparent', borderBottomWidth: 1,  }} onPress={()=>handleCancelledBtnPressed('Cancelled')}>
                    <Text style={styles.btnText}>Cancelled</Text>
                </TouchableOpacity>
            </View>
            <Divider color='#A8A29E'/>

            <View style={styles.label}>
                <Text style={[styles.labelText, {marginLeft: 30,}]}>Order ID</Text>
                <Text style={[styles.labelText, {marginLeft: 30,}]}>Date</Text>
                <Text style={[styles.labelText, {marginLeft: 40,}]}>Cost</Text>
                <Text style={[styles.labelText, {marginLeft: 40,}]}>Status</Text>
                <Text>   </Text>
            </View>
            <ScrollView style={styles.container}>
            {selectedStatus === '' ? sortedOrders.map((item)=>(
            <View key={item.id} style={styles.orderContainer}>
                <View style={{marginLeft: 30,width: 20}}>
                    <Text style={styles.orderItem}>{item.id}</Text>
                </View>
                <View style={{marginLeft: 25,width: 70}}>
                    <Text style={styles.orderItem}>{item.createdAt.split("T")[0]}</Text>
                </View>
                <View style={{marginLeft: 10,width: 40,}}>
                    <Text style={styles.orderItem}>₱ {item.orderItems.reduce((total, orderTtem) => total + parseFloat(orderTtem.price), 80)}</Text>
                </View>
                <View style={{marginLeft: 20, marginRight: 20, width: 80}}>
                    <Text style={styles.orderItem}>{item.onlineOrders[0].deliveryStatus}</Text>
                </View>
                <TouchableOpacity onPress={()=>navigation.navigate('OrderStatusScreen', { id: item.id })}>
                    <Text style={styles.view}>View</Text>
                </TouchableOpacity>
            </View>
            )): 
            filteredOrders.map((item) => (
                 
                <View key={item.id} style={styles.orderContainer}>
                <View style={{marginLeft: 30,width: 20}}>
                    <Text style={styles.orderItem}>{item.id}</Text>
                </View>
                <View style={{marginLeft: 25,width: 70}}>
                    <Text style={styles.orderItem}>{item.createdAt.split("T")[0]}</Text>
                </View>
                <View style={{marginLeft: 10,width: 40,}}>
                    <Text style={styles.orderItem}>₱ {item.orderItems.reduce((total, orderTtem) => total + parseFloat(orderTtem.price), 49)}</Text>
                </View>
                <View style={{marginLeft: 20, marginRight: 20, width: 80}}>
                    <Text style={styles.orderItem}>{item.onlineOrders[0].deliveryStatus}</Text>
                </View>
                <TouchableOpacity onPress={()=>navigation.navigate('OrderStatusScreen', { id: item.id })}>
                    <Text style={styles.view}>View</Text>
                </TouchableOpacity>
            </View>
            ))}
            
            </ScrollView>
            <View style={{}}>
                <Image 
                    source={HeaderImage}
                    style={{height: 100, width: '100%', borderTopRightRadius: 40, borderTopLeftRadius: 40, }}
                />
                <View style={{position: 'relative', top: -80}}>
                    <Logo/>
                </View>
              
            </View> 
           
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
    header:{
        position: 'absolute',
        top: -70
    },
    userInfoContainer:{
        position: 'absolute',
        top: 40,
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
        color: 'white'
    },
        emailContainer:{
        flexDirection: 'row',
        color: 'white',

    },
        email:{
        fontSize: 10,
        fontWeight: '600',
        marginHorizontal: 10,
        color: 'white',
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
        marginTop: 20,
        borderBottomWidth: 1,
        borderBottomColor: "rgba(120, 113, 108, 0.09)",
    },
    container:{
       height: Dimensions.get('screen').height * 0.25,
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