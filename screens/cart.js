import React from "react";
import { Text, View, StyleSheet, ScrollView, Image,FlatList, Pressable } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useState, useCallback } from "react";
import Animated, { FadeIn, FadeInUp, Layout } from "react-native-reanimated";
import { StatusBar } from "expo-status-bar";
import { AntDesign, Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
export default function Cart({navigation}) {
  const [data, setData] = useState([
    {
      id: 1,
      name: "Blue Shirt",
      price: 10,
      uri: "https://media.istockphoto.com/id/1311574382/photo/blue-t-shirt-isolated-on-white-background.webp?b=1&s=170667a&w=0&k=20&c=3aHoYgSUnlX8MaEtQ__mO7mInI_kCst10kfBYmpJf48=",
      category: "clothes",
      size:'small'
    },
    {
      id: 2,
      name: "Cargo pants",
      price: 52,
      uri: "https://ae01.alicdn.com/kf/S2b303ff6209c4526a297fc6c2a05e4c9A/Cargo-Pants-Men-Ankle-Length-Streetwear-Casual-Pants-Men-Military-Style-Slim-Fit-Pure-Cotton-Trouser.jpg",
      category: "clothes",
      size:'XL'
    },
    
    
   
  ]);
  function calculateTotalPrice(items) {
    // Use the reduce function to sum up the prices
    const totalPrice = items.reduce((total, item) => total + item.price, 0);
    return totalPrice;
  }
  const total = calculateTotalPrice(data);
  const [fontsLoaded] = useFonts({
    Nunito: require("../assets/fonts/NunitoSans_7pt-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <Animated.View
      layout={Layout.duration(1000)}
      entering={FadeInUp}
      style={styles.container}
      onLayout={onLayoutRootView}
    >
      {/* Header */}
      <View style={styles.header}>
        {/* <Text>Product Details</Text>
        <Text>{params.item.name}</Text> */}
        {/* <Ionicons
          name="chevron-back-outline"
          onPress={() => navigation.navigate('Home')}
          size={24}
          color="#DE1738"
          style={styles.icon}
        /> */}
        <Text style={[styles.title, { fontFamily: "Nunito" }]}>
          Cart
        </Text>
      </View>
      <StatusBar backgroundColor="#DE1738" style="light" />
      
      <View style={styles.content}>
          <FlatList
          data={data}
          style={{height:200}}
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
          renderItem={({item})=>(
          <View style={styles.body}>
                      <Text
                        style={{
                          fontSize: 16,
                          letterSpacing: -0.24,
                          lineHeight: 27.28,
                          fontFamily: "Nunito",
                          color: "black",
                        }}
                      >
                        {item.category}
                      </Text>
                      <View style={{borderBottomWidth:1,marginRight:50,paddingTop:10,borderColor:"#EEF2F6"}}>
                      </View>
                      <View style={styles.innerContent}>
                        <Image style={{borderRadius:10}} height={71} width={71} source={{uri: item.uri}}/>
                        <View>
                          <View style={{flexDirection:'row',columnGap:150}}>
                             <Text style={{fontFamily:'Nunito'}}>{item.name}</Text>
                             <Feather name="edit" size={16} color="#808080"/>
                          </View>
                       
                        <Text style={{fontFamily:'Nunito'}}>Size <Text style={{color:"#808080"}}>{item.size}</Text></Text>
                        <Text style={{fontFamily:'Nunito'}}>${item.price}</Text>
                        </View>
                        
                      </View>
                      <Pressable style={styles.button}>
                        <Text style={{color:'#F3A845',fontFamily:'Nunito',textAlign:'center',top:5}}>Cancel</Text>
                      </Pressable>
                      
                    </View>
          )}
          />
          <View style={{flex:1,paddingBottom:10}}>
          <Text style={{fontSize:16,fontFamily:'Nunito',lineHeight:24}}>
            Order Summary
          </Text>
          <View>
            {
              data.map(item=>(
                
                   <View style={styles.cartList} scrollEnabled={true} key={item.id}>
                  <Text style={{color:'#808080',lineHeight:18,fontFamily:'Nunito',fontSize:12}}>1x {item.name}</Text>
                 <Text style={{color:'#808080',lineHeight:18,fontFamily:'Nunito',fontSize:12}}>${item.price}</Text>
                 
                </View>
              ))
            }
            <View style={{borderBottomWidth:1,borderBottomColor:'#E6E6E6'}}></View>
            <View style={styles.cartList}>
              <Text style={{color:'#808080',lineHeight:18,fontFamily:'Nunito',fontSize:12}}>Subtotal</Text>
              <Text style={{color:'#808080',lineHeight:18,fontFamily:'Nunito',fontSize:12}}>${total}</Text>
            </View>
            <View style={styles.cartList}>
              <Text style={{color:"#2E2E2E",lineHeight:24,fontFamily:'Nunito',fontSize:12}}>Total</Text>
              <Text style={{color:'#2E2E2E',lineHeight:24,fontFamily:'Nunito',fontSize:12}}>${total}</Text>
            </View>
          </View>
          <Pressable style={styles.confirm}>
            <Text style={{textTransform:'uppercase',fontFamily:'Nunito',textAlign:'center',top:20,color:"white"}}>Confirm</Text>
          </Pressable>
          </View>
         
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DE1738",
  },
  content: {
    backgroundColor: "white",
    flex: 1,
    borderTopEndRadius: 25,
    borderTopStartRadius: 25,
    paddingHorizontal:20,
    paddingVertical:20
    
  },
  innerContent:{
    flexDirection:'row',
    columnGap:10,
    
  },
  button:{
    borderWidth:1,
    width:90,
    height:32,
    borderRadius:5,
    borderColor:"#F3A845",
    alignSelf:'center',
   
  },
  header: {
    flexDirection: "row",
    columnGap: 10,
    marginVertical:50,
    paddingHorizontal:10
  },
  title:{
    fontSize: 20,
    color: "white",
    textAlign: "center",
    textAlignVertical: "center",
  },
  icon:{
    backgroundColor: "white",
    padding: 10,
    borderRadius: 45,
  },
  cartList:{
    paddingHorizontal:20,
    flexDirection:'row',
    justifyContent:'space-between'
  },
  confirm:{
    width:327,
    height: 62,
    borderRadius:12,
    alignSelf:'center',
   backgroundColor:'#DE1738'
  },
});
