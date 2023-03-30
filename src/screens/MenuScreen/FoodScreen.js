import { ActivityIndicator, StyleSheet, Text, View,FlatList, ScrollView, Dimensions, SafeAreaView } from 'react-native'
import React,{ useLayoutEffect,useState,useEffect }  from 'react'
import CartIcon from '../../components/CartIcon';
import CustomSearchBar from '../../components/CustomSearchBar/CustomSearchBar';
import CustomButton from '../../components/CustomButton';
import axios from 'axios';
import { Icon, Image } from '@rneui/themed';
import Breakfast from './images/breakfast.png'
const FoodScreen = ({navigation}) => {

  const [menuItems, setMenuItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
    //set icon to the right of the header navbar
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ marginRight: 20, justifyContent:'center' }}>
          <CartIcon/>
        </View>
      ),
    });
  }, [navigation]);

  useEffect(()=>{
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get('http://192.168.100.18:3000/api/menuItems');
        setMenuItems(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(true);
      }
    };

    fetchMenuItems();
  },[])

  return (
    <SafeAreaView style={{alignItems: 'center'}}>
      <CustomSearchBar/>
      <View style={{width: Dimensions.get('screen').width / 2,}}>
        <CustomButton
          text="Breakfast"
          onPress={()=>{}}
          bgColor="#DC2626"  
        />
      </View>
      <View style={styles.container}>
        <View style={styles.category}>
          <Text style={[styles.itemText]}>Breakfast</Text>
          <Text style={[styles.itemText]}>Best Seller</Text>
        </View>
        {isLoading ? 
          <ActivityIndicator size={'large'} color="#10B981" /> :  
          <ScrollView style={styles.container}>
            {menuItems.map(menuItem => (
              <View key={menuItem.id} style={styles.item}>
                <Image 
                  source={Breakfast}
                  containerStyle={styles.Image}
                  PlaceholderContent={<ActivityIndicator />}
                  resizeMode='contain'                  
                />                
                <View>
                  <Text style={[styles.itemText,{width: 150}]}>{menuItem.name}</Text>
                  <Text style={[styles.itemText,{color:'#808080'}]}>{menuItem.category}</Text>
                </View>                
                <Text style={styles.itemText} >{menuItem.description}</Text>
                <Text style={[styles.itemText,{color:'#DC2626'}]}>P {menuItem.price}</Text>
                <Icon
                  name='add-circle-outline'
                />
              </View>
            
            ))}
          </ScrollView>
        }
      </View>
    </SafeAreaView>
  )
}

export default FoodScreen

const styles = StyleSheet.create({
  container:{
    backgroundColor: '#fff',
    marginTop: 20,
    marginBottom: 120,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  category: {
    flexDirection: 'row',
    justifyContent:'space-between',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  menuItemsContainer: {
    
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,

  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: Dimensions.get('screen').width,
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 0,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemText: {
    fontSize: 10,
    fontWeight: 600,
    marginBottom: 5,
  },
  Image: {
    width: 60,
    height: 60,
    marginRight: 20,
    
  },
})