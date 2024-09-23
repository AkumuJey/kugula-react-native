import React from "react";
import { Text, View, StyleSheet, ScrollView, Pressable } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useState, useCallback } from "react";
import Animated, { FadeIn, FadeInUp, Layout } from "react-native-reanimated";
import { StatusBar } from "expo-status-bar";
import {  Feather, Ionicons } from "@expo/vector-icons";
import { Divider, List, TextInput } from "react-native-paper";
export default function ProductUpload({navigation}) {
  const [expanded, setExpanded] = React.useState(false);
  const date  = new Date()

  const handlePress = () => setExpanded(!expanded);
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
          Product Upload
        </Text>
      </View>
      <StatusBar backgroundColor="#DE1738" style="light" />
      
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
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
              Product Name
            </Text>
            <TextInput
             placeholder="Hyundai Kona" 
             placeholderTextColor={"#C4C4C4"}
              style={[styles.input,{fontFamily:'Nunito'}]}
               mode="outlined"
                outlineColor="#E6E6E6"
                outlineStyle={{borderColor:'#E6E6E6',borderRadius:15}}
                cursorColor="#DE1738"
                />
                
          </View>
          <Text
              style={{
                fontSize: 14,
                letterSpacing: -0.24,
                lineHeight: 50,
                fontFamily: "Nunito",
                color: "black",
              }}
            >
              Upload Photo/Video
            </Text>
            <ScrollView horizontal>
                  <View style={styles.uploadBox}>
                    <View style={styles.BoxContent}>
                      <Text style={{fontFamily:'Nunito',color:'#808080'}}>Upload Image</Text>
                      <Feather name="upload" size={20} color={"#808080"}/>
                    </View>
                    
                  </View>
                  <View style={{padding:10}}></View>
                  <View style={styles.uploadBox}>
                  <View style={styles.BoxContent}>
                      <Text style={{fontFamily:'Nunito',color:'#808080'}}>Upload Video</Text>
                      <Feather name="upload" size={20} color={"#808080"}/>
                    </View>
                  </View>
                </ScrollView>
                <View style={styles.selectDetails}>
                  <View>
                    <Text
              style={{
                fontSize: 14,
                letterSpacing: -0.24,
                lineHeight: 50,
                fontFamily: "Nunito",
                color: "black",
              }}
            >
              Product Price
            </Text>
            <TextInput
             placeholder="$21000" 
             placeholderTextColor={"#C4C4C4"}
              style={[styles.input,{fontFamily:'Nunito',width:115}]}
               mode="outlined"
                outlineColor="#E6E6E6"
                outlineStyle={{borderColor:'#E6E6E6',borderRadius:10}}
                cursorColor="#DE1738"/>
                  </View>
                  <View>
                    <Text
              style={{
                fontSize: 14,
                letterSpacing: -0.24,
                lineHeight: 50,
                fontFamily: "Nunito",
                color: "black",
              }}
            >
              Select category
            </Text>
            <List.Section 
            style={{width:130,bottom:8}}
            >
      <List.Accordion
      style={styles.dropDown}
        title="Vehicle"
        expanded={expanded}
        titleStyle={{fontFamily:'Nunito',color:'black'}}
        onPress={handlePress}>
          <ScrollView 
          showsVerticalScrollIndicator={false} 
          scrollEnabled 
          style={{
            height:200,
            elevation:2,
            backgroundColor:'#FBFBFB',
            borderRadius:10,
            marginTop:10}}>
        <List.Item title="Fashion"
        titleStyle={{fontFamily:'Nunito',color:'black'}}
         />
       
        </ScrollView>
      </List.Accordion>
    </List.Section>
                  </View>
                </View>
                <Text
              style={{
                fontSize: 14,
                letterSpacing: -0.24,
                lineHeight: 50,
                fontFamily: "Nunito",
                color: "black",
              }}
            >
              Description
            </Text>
            <TextInput multiline mode="outlined"
             outlineColor="#E6E6E6"
                outlineStyle={{borderColor:'#E6E6E6',borderRadius:10}}
                cursorColor="#DE1738"
                style={{backgroundColor:"#FBFBFB",paddingTop:10}}
                
                />
                 <View style={styles.selectDetails}>
                  <View>
                    <Text
              style={{
                fontSize: 14,
                letterSpacing: -0.24,
                lineHeight: 50,
                fontFamily: "Nunito",
                color: "black",
              }}
            >
              Upload Date
            </Text>
            <View  style={[styles.input,styles.dateBox]}>
            <Feather name="calendar" size={18} color="black"/>
            <Text>{date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear()}</Text>
            </View>
            
                  </View>
                  <View>
                    <Text
              style={{
                fontSize: 14,
                letterSpacing: -0.24,
                lineHeight: 50,
                fontFamily: "Nunito",
                color: "black",
              }}
            >
              Post Deadline
            </Text>
            <View  style={[styles.input,styles.dateBox]}>
            <Feather name="calendar" size={18} color="black"/>
            <Text>{Number(date.getDate()+2) + "/" + date.getMonth() + "/" + date.getFullYear()}</Text>
            </View>
            <Text style={{textTransform:'capitalize',fontSize:10,fontFamily:'Nunito',lineHeight:13.02,color:'#808080'}}>*Note Cost for 1 day is $5</Text>
                  </View>
                </View>

                {/* pricing and totaling */}
                <Text
              style={{
                fontSize: 14,
                letterSpacing: -0.24,
                lineHeight: 50,
                fontFamily: "Nunito",
                color: "black",
              }}
            >
              Estimated Cost
            </Text>
            <View style={styles.estimatedCostContainer}>
              <View style={styles.estimatedCost}>
                <Text style={{fontFamily:"Nunito",color:'#808080',fontSize:12,lineHeight:18}}>Total Days</Text>
                <Text  style={{fontFamily:"Nunito",color:'#808080',fontSize:12,lineHeight:18}}>2</Text>
              </View>
              <View style={styles.estimatedCost}>
                <Text style={{fontFamily:"Nunito",color:'#808080',fontSize:12,lineHeight:18}}>Post Cost</Text>
                <Text  style={{fontFamily:"Nunito",color:'#808080',fontSize:12,lineHeight:18}}>2 x 5</Text>
              </View>
              <Divider/>
              <View style={styles.estimatedCost}>
                <Text style={{fontFamily:"Nunito",color:'#808080',fontSize:12,lineHeight:18}}>Subtotal</Text>
                <Text  style={{fontFamily:"Nunito",color:'#808080',fontSize:12,lineHeight:18}}>$10</Text>
              </View>
              <View style={styles.estimatedCost}>
                <Text style={{fontFamily:"Nunito",color:'#2E2E2E',fontSize:16,lineHeight:18}}>Total</Text>
                <Text  style={{fontFamily:"Nunito",color:'#2E2E2E',fontSize:16,lineHeight:18}}>$10</Text>
              </View>
              <Pressable style={styles.button}>
                <Text style={{fontFamily:'Nunito',fontSize:18,color:'#FFFFFF',textTransform:'uppercase',textAlign:'center',top:15}}>Proceed To Pay</Text>
              </Pressable>
            </View>
        </ScrollView>
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
    paddingHorizontal:20
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
  
  
});
