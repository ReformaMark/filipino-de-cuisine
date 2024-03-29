import { Dimensions, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React,{ useLayoutEffect, useState, useEffect, useContext,   } from 'react'
import CartIcon from '../../components/CartIcon';
import { Card, Image, Dialog, Divider } from '@rneui/themed';
import Breakfast from './images/breakfast.png'
import HeaderImage from './images/headerImage.png';
import useMenuItems from '../../hooks/useMenuItems';
import axios from 'axios';
import { useAuthentication } from '../../hooks/useAuthentication';
import { useToast } from "react-native-toast-notifications";
import { RefreshControl } from 'react-native';

const MenuScreen = ({navigation}) => {
  const toast = useToast();
  const [visible, setVisible] = useState(false);
  const { user } = useAuthentication();
  const [selectedCategory, setSelectedCategory] = useState('Appetizer');
  const [filteredMenuItems, isLoading] = useMenuItems(selectedCategory);
  const [selectedItem, setSelectedItem ] = useState();
  const [addToCart, setAddToCart ] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const onRefresh = () => {
    setRefresh(true);
 
    setTimeout(()=>{
      setRefresh(false)

    }, 1000)
  };

  const orderItem = async (userId, quantity, menuItemId) => {
    try {
      const response = await axios.post('http://192.168.100.18:3000/api/basketItem', { userId, quantity, menuItemId });
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error('Error creating order item.');
    }
  };
 

  //set icon to the right of the header navbar
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ marginRight: 20, justifyContent:'center' }}>
          <CartIcon/>
        </View>
      ),
    });
  }, [navigation, addToCart, refresh]);

  //toggleDIalog box
  const toggleDialog = (item) => {
    setVisible(!visible);
    setSelectedItem(item);
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
      setAddToCart(!addToCart);
    } else {
      navigation.navigate('MainAuthTab');
    }
    } catch (error) {
      console.error(error);
    }
  };

  const renderMenuItems = () => {
    if (isLoading) {
      return <Text>Loading...</Text>;
    }

    if (!filteredMenuItems || filteredMenuItems.length === 0) {
      return <Text>No items found for this category.</Text>;
    }

    return filteredMenuItems.map((item) => (
   
      
      <Card key={item.id} containerStyle={styles.cardContainer} > 
       <TouchableOpacity  onPress={()=>toggleDialog(item)}>
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
 
    ));
  };

  return (
    <ScrollView refreshControl={
      <RefreshControl
        refreshing={refresh} 
        onRefresh={onRefresh}
      />     
    }
    style={styles.root}
    >
      <View>       
        <Image
          source={HeaderImage}
          resizeMode='stretch'
          style={{width: '100%', height: Dimensions.get('screen').height * 0.15}}
          alt='Header Image'
        />
      </View>
      <View style={styles.categoryBtn}>
        <Pressable
          onPress={()=>{setSelectedCategory('Appetizer')}}
          style={[styles.category,selectedCategory === 'Appetizer' && styles.selectedCategory]}
        ><Text style={[styles.text, selectedCategory === 'Appetizer' && styles.selectedText]}>Appetizer</Text></Pressable>
        <Pressable
          onPress={()=>{setSelectedCategory('Main Dish')}}
          style={[styles.category,selectedCategory === 'Main Dish' && styles.selectedCategory]}
        ><Text style={[styles.text, selectedCategory === 'Main Dish' && styles.selectedText]}>Main Dish</Text></Pressable>
        <Pressable
          onPress={()=>{setSelectedCategory('Dessert')}}
          style={[styles.category,selectedCategory === 'Dessert' && styles.selectedCategory]}
        ><Text style={[styles.text, selectedCategory === 'Dessert' && styles.selectedText]}>Desserts</Text></Pressable>
        <Pressable
          onPress={()=>{setSelectedCategory('Drinks')}}
          style={[styles.category, selectedCategory === 'Drinks' && styles.selectedCategory]}
        ><Text style={[styles.text, selectedCategory === 'Drinks' && styles.selectedText]}>Drinks</Text></Pressable>
      </View>
      <View style={styles.categoryBestSellerTextContainer}>
        <Text style={styles.categoryText}>{selectedCategory}</Text>
        <TouchableOpacity onPress={()=>{navigation.navigate('BestSellerScreen', {selectedCategory: selectedCategory, filteredMenuItems: filteredMenuItems })}}>
          <Text style={[styles.categoryText,styles.bestsellerText]}>Best Seller</Text>
        </TouchableOpacity>
        
      </View>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={[styles.container]}> 
          {renderMenuItems()}
        </View>
      </ScrollView>
      {selectedItem &&
      <Dialog visible={visible} onBackdropPress={toggleDialog}>
        <View style={styles.dialogImageTitlePriceContainer}>
          <Image
              resizeMode='cover'
              style={styles.image}
              source={{uri: selectedItem ? selectedItem.imgUrl : Breakfast}}
            />
          <View>
            <Dialog.Title title={selectedItem.name}/>
            <Text style={styles.price}>₱ {selectedItem.price}</Text>
          </View>
        </View>
        <Divider />
        <Text style={styles.dialogPrice}>{selectedItem.description}</Text>
        <TouchableOpacity onPress={() => handleAddToCart(selectedItem)} style={styles.dialogAddtocart}>
            <Text style={styles.dialogAddtocartText}>Add to Cart</Text>
          </TouchableOpacity>
      </Dialog>
      }
    </ScrollView>
  )
}

export default MenuScreen

const styles = StyleSheet.create({
  root:{
    backgroundColor: '#fff',
    height: Dimensions.get('screen').height,
  },
  scrollView:{

  },
  categoryBestSellerTextContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 5,
  },
  categoryText:{
    marginHorizontal: 10,
    fontWeight: "700",
    fontSize: 12,
  },
  container: {
    flex: 1,
    padding: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems:'center',
    justifyContent: 'center',
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
  selectedCategory:{
    padding: 10,
    backgroundColor:'red',
    borderRadius: 50,
    width: Dimensions.get('screen').width * 0.2,
    color: 'white',
  },
  text:{
    fontSize: 10,
    textAlign: 'center',
    color: 'black',
  },
  selectedText:{
    fontSize: 10,
    textAlign: 'center',
    color: 'white',
  },
  dialogImageTitlePriceContainer:{
    flexDirection: 'row',
  },
  dialogAddtocart:{
  
    padding: 5,
    width: '100%',
    backgroundColor: '#10B981',
    
  },
  dialogAddtocartText:{
    textAlign: 'center',
    color: 'white',
  },
  dialogPrice:{
    marginVertical: 10,
    textAlign: 'justify',
  }
})