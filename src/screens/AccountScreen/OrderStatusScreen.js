import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { useState } from 'react'
import StepIndicator from 'react-native-step-indicator';
import { Divider, Icon } from '@rneui/themed';
import Karekare from '../HomeScreen/images/karekare.png'
import { ActivityIndicator } from 'react-native';
import { useEffect } from 'react';
import axios from 'axios';
import { useToast } from "react-native-toast-notifications";


const OrderStatusScreen = ({navigation, route}) => {
  const toast = useToast();
  const [loading, setLoading ] = useState(true);
  const [order, setOrder] = useState();
  const [status, setStatus] = useState(0);
  const { id } = route.params;
  
  useEffect(() => {
      setLoading(false);
      const getOrderIdUsingRoute = async() =>{
        await axios.get(`http://192.168.100.18:3000/api/order/${id}`)
      .then(response =>{
        setOrder(response.data)
       
        switch (response.data.onlineOrders[0].deliveryStatus) {
          case 'Pending':
            return setStatus(0);
          case 'Preparing':
            return setStatus(1);
          case 'OutForDelivery':
            return setStatus(2);
          case 'Delivered':
            return setStatus(3);
          default:
            return null;
        }
      })
      .catch(error=>{
        setLoading(true)
        console.log(error)
      })
    }
      getOrderIdUsingRoute()
  },[navigation]);

  
 
  // define icons for each step
const customIcons = [
  <Image style={{height: 30, width: 30}} source={require('./images/check-icon.png')} />,
  <Image style={{height: 30, width: 30}} source={require('./images/preparing.png')} />,
  <Image style={{height: 30, width: 30}} source={require('./images/on-the-way.png')} />,
  <Image style={{height: 30, width: 30}} source={require('./images/delivered.png')} />,
];

// render function for custom step indicators
const renderStepIndicator = ({ position, stepStatus }) => {
  return customIcons[position];
};

const customStyles = {
  stepIndicatorSize: 50,
  currentStepIndicatorSize: 50,
  separatorStrokeWidth: 3,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: 'red',
  stepStrokeFinishedColor: 'red',
  stepStrokeUnFinishedColor: '#78716C',
  separatorFinishedColor: 'red',
  separatorUnFinishedColor: '#78716C',
  stepIndicatorFinishedColor: 'red',
  stepIndicatorUnFinishedColor: '#78716C',
  stepIndicatorCurrentColor: 'red',
  labelColor: 'black',
  currentStepLabelColor: 'black',
  labelAlign: 'flex-start',
  stepIndicatorOffset: 10,
};

const labels = ["Order Confirmed", "Preparing in the Kitchen", "On the way", "Order Delivired"];
const orderItemsTotal = order?.orderItems?.reduce((acc, item) => acc + (parseFloat(item.menuItem.price) * item.quantity), 0);
const deliveryFeesTotal = order?.onlineOrders?.reduce((acc, item) => acc + parseFloat(item.deliveryFee), 0);
const overallTotal = orderItemsTotal + deliveryFeesTotal;

const handleCancelBtn = async()=>{
  await axios.put(`http://192.168.100.18:3000/api/order/${id}/onlineOrder`)
  .then((response)=>{
    console.log("order has been canclled")
    toast.show(`Order cancelled!`, {
      type: "success",
      placement: "bottom",
      duration: 2000,
      offset: 100,
      animationType: "slide-in"
    });
    navigation.pop();
  })
  .catch(error=>{
    console.log(error)
  })
}

  return (
    <View style={{paddingHorizontal: 10, backgroundColor:'white'}}>
      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) :
      <>
      {order?.onlineOrders[0].deliveryStatus === 'Cancelled' ?
      <> 
        <View>
          <Text style={{fontSize: 15, fontWeight: '700', marginTop: 10,}}>Order ID: {id}</Text>
        </View>
        <View style={[styles.orderIndicator, {paddingVertical: 20}]}>
        <View style={{paddingHorizontal: 20}}>
          <View style={styles.itemLabel}>
            <Text style={styles.Product}>Product</Text>
            <Text style={styles.Price}>Price</Text>
            <Text style={styles.Quality}>Quality</Text>
            <Text style={styles.Total}>Total</Text>
          </View>
          <Divider style={styles.divider} color='black'/>
        <ScrollView style={{height: 120}}>
        {order?.orderItems?.map((item)=>(
          
            <View key={item.id} style={{flexDirection:'row', alignItems:'center'}}>
              <View>
                <Image source={{uri:item.menuItem.imgUrl}} style={{width: 40, height: 40, borderRadius: 200}}/>
              </View>
              <Text style={{marginLeft:10 ,width: 100,fontSize: 12, fontWeight:'600' }}>{item.menuItem.name}</Text>
              <Text style={{width: 40,fontSize: 12, fontWeight:'600' }}>₱ {item.menuItem.price}</Text>
              <Text style={{width: 60,fontSize: 12, fontWeight:'600', textAlign: 'center' }}>{item.quantity}</Text>
              <Text style={{fontSize: 13, fontWeight:'400' }}>₱ {(item.menuItem.price * item.quantity)}</Text>
            </View>
          ))}

        </ScrollView>
          {order?.onlineOrders?.map((item)=>(
            <View key={item.id}>
              <Divider style={styles.divider} color='black'/>
              <View style={{flexDirection:'row', alignItems:'center', justifyContent: 'space-between'}}>
                <Text style={{fontSize: 12, fontWeight: '600'}}>Delivery Fee</Text>
                <Text style={{marginEnd: 5, fontSize: 13, fontWeight: '400'}}>₱ {item.deliveryFee}</Text>
              </View>
            </View>
          ))}
          <View style={{flexDirection:'row', alignItems:'center', justifyContent: 'space-between', marginTop: 20,}}>
            <Text style={{fontSize: 15, fontWeight: '600'}}>Total</Text>
            <Text style={{marginEnd: 5, fontSize: 13, fontWeight: '400'}}>₱ {overallTotal}</Text>
          </View>
          <View style={{width:'100%', alignItems:'center', marginTop: 20, marginBottom: 20,}}>
          <TouchableOpacity style={[styles.canelBtn, {backgroundColor: 'rgba(0,0,0,0.2)', borderColor: 'gray', borderWidth: 1}]} disabled={true}>
            <Text style={{fontSize: 15,}}>Cancelled</Text>
          </TouchableOpacity>
          </View>
        </View>
       
      </View>
      <View style={{alignItems:'center', marginVertical: 30,}}>
          <TouchableOpacity style={[styles.canelBtn, {}]} onPress={()=>navigation.pop()}>
            <Text style={{fontSize: 15, color:'white'}}>Okay</Text>
          </TouchableOpacity>
      </View>
     
      </> :
        <>
        <View style={{justifyContent: 'space-between', flexDirection:'row'}}>
        <Text style={{fontSize: 10, fontWeight: '500', }}>15-20 Minutes Arrival</Text>
        <TouchableOpacity onPress={()=>navigation.navigate('RecieptScreen',{order: order, deliveryFeesTotal: deliveryFeesTotal})}>
            <Text style={{color:'#10B981'}}>View Reciept</Text>
          </TouchableOpacity>
        </View>
      <View>
        <Text style={{fontSize: 15, fontWeight: '700', marginTop: 10,}}>Order ID: {id}</Text>
      </View>
      <View style={styles.orderIndicator}>
        <View style={styles.stepIndicator}>
        <StepIndicator
          currentPosition={status}
          labels={labels}
          stepCount={4}
          direction="vertical"
          customStyles={customStyles}
          renderStepIndicator={renderStepIndicator}
        />
        </View>
        <View style={{paddingHorizontal: 20}}>
          <View style={styles.itemLabel}>
            <Text style={styles.Product}>Product</Text>
            <Text style={styles.Price}>Price</Text>
            <Text style={styles.Quality}>Quality</Text>
            <Text style={styles.Total}>Total</Text>
          </View>
          <Divider style={styles.divider} color='black'/>
        <ScrollView style={{height: 120}}>
        {order?.orderItems?.map((item)=>(
          
            <View key={item.id} style={{flexDirection:'row', alignItems:'center'}}>
              <View>
                <Image source={{uri:item.menuItem.imgUrl}} style={{width: 40, height: 40, borderRadius: 200}}/>
              </View>
              <Text style={{marginLeft:10 ,width: 100,fontSize: 12, fontWeight:'600' }}>{item.menuItem.name}</Text>
              <Text style={{width: 40,fontSize: 12, fontWeight:'600' }}>₱ {item.menuItem.price}</Text>
              <Text style={{width: 60,fontSize: 12, fontWeight:'600', textAlign: 'center' }}>{item.quantity}</Text>
              <Text style={{fontSize: 13, fontWeight:'400' }}>₱ {(item.menuItem.price * item.quantity)}</Text>
            </View>
          ))}

        </ScrollView>
          {order?.onlineOrders?.map((item)=>(
            <View key={item.id}>
              <Divider style={styles.divider} color='black'/>
              <View style={{flexDirection:'row', alignItems:'center', justifyContent: 'space-between'}}>
                <Text style={{fontSize: 12, fontWeight: '600'}}>Delivery Fee</Text>
                <Text style={{marginEnd: 5, fontSize: 13, fontWeight: '400'}}>₱ {item.deliveryFee}</Text>
              </View>
            </View>
          ))}
          <View style={{flexDirection:'row', alignItems:'center', justifyContent: 'space-between', marginTop: 20,}}>
            <Text style={{fontSize: 15, fontWeight: '600'}}>Total</Text>
            <Text style={{marginEnd: 5, fontSize: 13, fontWeight: '400'}}>₱ {overallTotal}</Text>
          </View>
          <View style={{width:'100%', alignItems:'center', marginTop: 20, marginBottom: 20,}}>
          <TouchableOpacity style={styles.canelBtn} onPress={handleCancelBtn}>
            <Text style={{fontSize: 15, color: 'white'}}>Cancel Order</Text>
          </TouchableOpacity>
          </View>
          
        </View>
      </View>
        </>
      }
      </>
      }
    </View>
  )
}

export default OrderStatusScreen

const styles = StyleSheet.create({
  orderIndicator:{
    width: '100%',
    backgroundColor: 'rgba(217, 217, 217, 0.5)',
    borderRadius: 20,
  },
  stepIndicator:{
    height: 300,
    width: '100%',
    marginLeft: 30,
  },
  itemLabel:{
    flexDirection: 'row'
  },
  divider:{
    marginVertical: 10,
  },
  Product:{
    marginLeft: 10,
    fontSize: 12,
    fontWeight: '600'
  },
  Price:{
    marginLeft: 80,
    fontSize: 12,
    fontWeight: '600'
  },
  Quality:{
    marginLeft: 20,
    fontSize: 12,
    fontWeight: '600'
  },
  Total:{
    marginLeft: 20,
    fontSize: 12,
    fontWeight: '600'
  },
  canelBtn:{
    padding:10,
    backgroundColor: 'red',
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  }

})