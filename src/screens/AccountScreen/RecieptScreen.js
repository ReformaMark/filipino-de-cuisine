import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native';
import { Divider } from '@rneui/base';

const RecieptScreen = ({navigation, route}) => {
    const {order}= route.params;
    console.log(order)
  return (
    <ScrollView style={{backgroundColor: 'white', padding: 10}}>
        <View style={{backgroundColor: 'rgba(217, 217, 230, 1)', paddingVertical: 50, paddingHorizontal: 10}}>
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
                <Text style={{fontSize: 20, fontWeight:'400', textAlign: 'center'}}>Thank You!</Text>
                <Text style={{fontSize: 12, fontWeight:'400', textAlign: 'center'}}>your order was successsful, enjoy your meal!</Text>
                <View style={{}}>
                    <View style={styles.itemLabel}>
                        <Text style={styles.Product}>Product</Text>
                        <Text style={styles.Price}>Price</Text>
                        <Text style={styles.Quality}>Quality</Text>
                        <Text style={styles.Total}>Total</Text>
                    </View>
                    <Divider style={styles.divider} color='black'/>
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
        fontWeight: '600'
      },
})