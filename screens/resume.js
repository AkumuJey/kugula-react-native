import React from "react";
import { Text, View, StyleSheet, ScrollView, Image,FlatList, Pressable } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useState, useCallback } from "react";
import Animated, { FadeIn, FadeInUp, Layout } from "react-native-reanimated";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from '@expo/vector-icons';
export default function Resume({navigation}) {
  
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
      <View>
      <View style={styles.header}>
        {/* <Text>Product Details</Text>
        <Text>{params.item.name}</Text> */}
        <Ionicons
          name="chevron-back-outline"
          onPress={() => navigation.navigate("Home")}
          size={24}
          color="#DE1738"
          style={styles.icon}
        />
        <Text style={[styles.title, { fontFamily: "Nunito" }]}>
          Resume
        </Text>
        
      </View>
      <View style={{
        backgroundColor:'#DE1738',
        borderRadius:120,
        height:280,
        marginHorizontal:10,
        top:1}}>
        <Image 
        style={{
        alignSelf:'center',
        
    }} 
    source={require("../assets/g8.png")}
     />
      </View>
      
      <View style={styles.body}>
      
      <Text style={{alignSelf:'center',fontSize:20,color:'#2F2F2F',fontFamily:'Nunito'}}>Time To Upload Your CV</Text>
      <Text style={{alignSelf:'center',fontSize:14,textAlign:'center',color:'#808080',fontFamily:'Nunito',paddingHorizontal:20}}>Upload your CV or resume to apply the job vacancy in our application</Text>
      <View style={styles.attach}>
        <Pressable style={{alignSelf:'center',flexDirection:'row',gap:5}}>
        <FontAwesome5 style={{textAlignVertical:'center',top:50}} name="file" size={24} color="#DE1738" />
            <Text style={{alignSelf:'center',textAlignVertical:'center',top:50,fontFamily:'Nunito',color:'#DE1738'}}>Attach File</Text>
        </Pressable>
      </View>
      <Pressable style={styles.button}>
        <Text style={{alignSelf:'center',textAlignVertical:'center',top:20,fontFamily:'Nunito',color:'#FFFFFF'}}>Upload CV</Text>
    </Pressable>
    </View>
    
      </View>
      <StatusBar backgroundColor="#DE1738" style="light" />
      
      
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
  button:{
    width:327,
    height: 62,
    borderRadius:12,
    alignSelf:'center',
   backgroundColor:'#DE1738',
   marginVertical:50
   
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
  
  body:{
    backgroundColor:'white',
    borderTopLeftRadius:30,
    borderTopRightRadius:30,
    height:'100%',
    zIndex:-1,
    top:-30,
    paddingVertical:50
  },
  attach:{
    borderStyle:'dotted',
    borderWidth:1,
    height:141,
    width:313,
    alignSelf:'center',
    marginTop:10,
    borderRadius:10,
    borderColor:'#DE1738'
  }
});
