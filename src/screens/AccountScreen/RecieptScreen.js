import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native';
import { Divider } from '@rneui/base';

const RecieptScreen = ({navigation, route}) => {
    const {order ,deliveryFeesTotal}= route.params;
   
    const calculateTotalPrice = (order) => {
      let totalPrice = 0;
      order?.orderItems?.forEach((item) => {
        totalPrice += item.menuItem.price * item.quantity;
      });
      return totalPrice;
    };
    const calculateVAT = (order) => {
    let VAT = 0;
    order?.orderItems?.forEach((item) => {
      VAT += item.menuItem.price * item.quantity * 0.12;
    });
    return VAT.toFixed(2);
  }
  return (
    <ScrollView style={{backgroundColor: 'white', padding: 10}}>
        <View style={{backgroundColor: 'rgba(217, 217, 230, 1)', paddingVertical: 30, paddingHorizontal: 10}}>
            <View style={{backgroundColor: 'white', padding: 10, paddingVertical: 20}}>
                <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
                    <Text style={{fontSize: 12, fontWeight:'700'}}>Billed To</Text>
                    <Text style={{fontSize: 12, fontWeight:'700'}}>Order ID: {order.id}</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
                    <Text style={{fontSize: 10, fontWeight:'400'}}>{order.customerName}</Text>
                    <Text style={{fontSize: 10, fontWeight:'400'}}>Date: {order.createdAt.slice(0, 10)}</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
                    <Text style={{fontSize: 10, fontWeight:'400'}}>{order.onlineOrders[0].contactNumber}</Text>
                    <Text style={{fontSize: 10, fontWeight:'400'}}>
                        Time: {new Date(order.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
                    <Text style={{fontSize: 10, fontWeight:'400', flexBasis:"55%"}}>{order.onlineOrders[0].address}</Text>
                    <Text style={{fontSize: 10, fontWeight:'400'}}>Payment Status: {order.paymentStatus}</Text>
                </View>
            </View>

            <View style={{backgroundColor: 'white', padding: 10, paddingVertical: 20, marginTop: 50}}>
                <Text style={{fontSize: 20, fontWeight:'400', textAlign: 'center', marginVertical: 10}}>Thank You!</Text>
                <Text style={{fontSize: 12, fontWeight:'400', textAlign: 'center', marginBottom: 30}}>your order was successsful, enjoy your meal!</Text>
                <View style={{}}>
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
                    <Divider style={styles.divider} color='black'/>
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                      <Text style={{fontSize: 15, fontWeight: '600'}}>Amount Due</Text>
                      <Text style={{fontSize: 15, fontWeight: '600'}}>₱ {calculateTotalPrice(order) - calculateVAT(order)}</Text>
                    </View>
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                      <Text>Vat(12%)</Text>
                      <Text>₱ {calculateVAT(order)}</Text>
                    </View>
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                      <Text>Delivery Fee</Text>
                      <Text>₱ {deliveryFeesTotal}</Text>
                    </View>
                    <Divider />
                    <View style={{flexDirection:'row', justifyContent:'space-between', marginTop: 20}}>
                      <Text style={{fontSize: 17, fontWeight: '700'}}>Total</Text>
                      <Text  style={{fontSize: 17, fontWeight: '700'}}>₱ {deliveryFeesTotal + calculateTotalPrice(order) }</Text>
                    </View>
                </View>
            </View>
            
        </View>
       

    </ScrollView>
  )
}

export default RecieptScreen

const styles = StyleSheet.create({
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
        fontWeight: '700'
      },
})