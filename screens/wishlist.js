import React from "react";
import { Text, View, StyleSheet, FlatList, Image, Pressable } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useState, useCallback } from "react";
import Animated, { FadeIn, FadeInUp, Layout } from "react-native-reanimated";
import { StatusBar } from "expo-status-bar";
import {  Feather, Ionicons,FontAwesome, AntDesign } from "@expo/vector-icons";
import { Divider, Card } from "react-native-paper";
export default function WishList({navigation}) {
    const [data, setData] = useState([
        {
          id: 1,
          name: "Blue Shirt",
          rating: 3.5,
          uri: "https://media.istockphoto.com/id/1311574382/photo/blue-t-shirt-isolated-on-white-background.webp?b=1&s=170667a&w=0&k=20&c=3aHoYgSUnlX8MaEtQ__mO7mInI_kCst10kfBYmpJf48=",
          category: "clothes",
        },
        {
          id: 2,
          name: "Cargo pants",
          rating: 5,
          uri: "https://ae01.alicdn.com/kf/S2b303ff6209c4526a297fc6c2a05e4c9A/Cargo-Pants-Men-Ankle-Length-Streetwear-Casual-Pants-Men-Military-Style-Slim-Fit-Pure-Cotton-Trouser.jpg",
          category: "clothes",
        },
        {
            id: 3,
            name: "Blue Shirt",
            rating: 3.5,
            uri: "https://media.istockphoto.com/id/1311574382/photo/blue-t-shirt-isolated-on-white-background.webp?b=1&s=170667a&w=0&k=20&c=3aHoYgSUnlX8MaEtQ__mO7mInI_kCst10kfBYmpJf48=",
            category: "clothes",
          },
          {
            id: 4,
            name: "Cargo pants",
            rating: 5,
            uri: "https://ae01.alicdn.com/kf/S2b303ff6209c4526a297fc6c2a05e4c9A/Cargo-Pants-Men-Ankle-Length-Streetwear-Casual-Pants-Men-Military-Style-Slim-Fit-Pure-Cotton-Trouser.jpg",
            category: "clothes",
          },
          {
            id: 5,
            name: "Blue Shirt",
            rating: 3.5,
            uri: "https://media.istockphoto.com/id/1311574382/photo/blue-t-shirt-isolated-on-white-background.webp?b=1&s=170667a&w=0&k=20&c=3aHoYgSUnlX8MaEtQ__mO7mInI_kCst10kfBYmpJf48=",
            category: "clothes",
          },
          {
            id: 6,
            name: "Cargo pants",
            rating: 5,
            uri: "https://ae01.alicdn.com/kf/S2b303ff6209c4526a297fc6c2a05e4c9A/Cargo-Pants-Men-Ankle-Length-Streetwear-Casual-Pants-Men-Military-Style-Slim-Fit-Pure-Cotton-Trouser.jpg",
            category: "clothes",
          },
        
       
      ]);
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
        <Ionicons
          name="chevron-back-outline"
          onPress={() => navigation.navigate("Home")}
          size={24}
          color="#DE1738"
          style={styles.icon}
        />
        <Text style={[styles.title, { fontFamily: "Nunito" }]}>
         WishList
        </Text>
      </View>
      <StatusBar backgroundColor="#DE1738" style="light" />
      
      <View style={styles.content}>
        
          <View>
            <Text
              style={{
                fontSize: 16,
                letterSpacing: -0.24,
                lineHeight: 27.28,
                fontFamily: "Nunito",
                color: "black",
              }}
            >
              Clothes
            </Text>
          </View>
          <FlatList
                data={data}
                style={{ backgroundColor: "white" }}
                scrollEnabled={true}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  
                    <Card style={styles.card}>
                      <Card.Content
                        style={{ flexDirection: "row", columnGap: 5 }}
                      >
                        <Image
                          source={{ uri: item.uri }}
                          style={{ borderRadius: 10 }}
                          height={80}
                          width={70}
                        />

                        <View>
                          <Text
                            style={{ color: "black", fontFamily: "Nunito" }}
                          >
                            {item.name}
                          </Text>
                          <View style={{ flexDirection: "row", columnGap: 10, }}>
                            
                            <Text style={{ fontFamily: "Nunito" }}>
                              Size
                            </Text>
                            <Text style={{ fontFamily: "Nunito",fontSize:14,color:'#808080' }}>
                              Small
                            </Text>
                            <View style={{paddingHorizontal:30}}></View>
                            <Pressable style={styles.cartBtn}>
                                <Text style={{color:'#F3A845',fontFamily:'Nunito'}}>Add to Cart</Text>
                            </Pressable>
                          </View>

                          <View style={{flexDirection:'row',columnGap:10}}>
                            <Text style={{ fontFamily: "Nunito" }}>$10</Text>

                            <View style={{flexDirection:'row',columnGap:5}}>
                                <AntDesign style={styles.icons} name="minus" size={10} color={"#808080"}/>
                                 <Text style={{ fontFamily: "Nunito",fontSize:10 }}>01</Text>
                                 <AntDesign style={styles.icons} name="plus" size={10} color={"#808080"}/>
                            </View>
                            
                          </View>
                          
                        </View>
                      </Card.Content>
                    </Card>
                  
                )}
              />
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
    flex: 2,
    borderTopEndRadius: 25,
    borderTopStartRadius: 25,
    paddingVertical:20,
    paddingHorizontal:7
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
  input:{
    backgroundColor:'#FBFBFB'
  },
  uploadBox:{
    borderWidth:1,
    height:101,
    width:111,
    borderRadius:10,
    borderStyle:'dotted',
    backgroundColor:'#FBFBFB',
   elevation:1
  },
  BoxContent:{
    flexDirection:'column-reverse',
    alignItems:'center',
    paddingVertical:17
  },
  selectDetails:{
    flexDirection:'row',
    justifyContent:'space-between'
  },
  dropDown:{
    borderColor:'#E6E6E6',
    backgroundColor:'#FBFBFB',
    borderRadius:10,
    borderWidth:1,
    height:58
  },
  dateBox:{
    borderWidth:1,
    flexDirection:'row',
    padding:10,
    borderColor:'#E6E6E6',
    borderRadius:10,
    columnGap:5
  },
  estimatedCost:{
    flexDirection:'row',
    justifyContent:'space-between',
    paddingVertical:5
  },
  estimatedCostContainer:{
    paddingHorizontal:20
  },
  button:{
    width:327,
    height: 62,
    borderRadius:12,
    alignSelf:'center',
   backgroundColor:'#DE1738'
  },
  icons:{
    borderWidth:1,
    borderColor:'#808080',
    borderRadius:5,
    textAlign:'center',
   height:15,
   paddingTop:2
  },
  cartBtn:{
    borderWidth:1,
    padding:5,
    borderRadius:10,
    borderColor:'#F3A845',
    textAlign:'center',
  },
  card:{
    backgroundColor:'white',
    marginHorizontal:4,
    marginVertical:10
  }
});
