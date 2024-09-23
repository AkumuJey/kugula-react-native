import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  Platform,
  Image,
  ScrollView,
} from "react-native";
import { Ionicons, EvilIcons, AntDesign } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useState, useCallback } from "react";
import { Button, Card, PaperProvider } from "react-native-paper";
import { useRoute } from "@react-navigation/native";
export default function Checkout({ navigation }) {
  const route = useRoute()
  const price = route.params?.price
  const [activeTab, setActiveTab] = useState(0);
  const handleTabPress = (id) => {
    setActiveTab(id);
  };
  const [fontsLoaded] = useFonts({
    Sans: require("../assets/fonts/DMSans_24pt-Regular.ttf"),
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
    <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
      {/* Header */}
      <View style={styles.header}>
        {/* <Text>Product Details</Text>
        <Text>{params.item.name}</Text> */}
        <Ionicons
          name="chevron-back-outline"
          onPress={() => navigation.goBack()}
          size={24}
          color="#DE1738"
          style={styles.icon}
        />
        <Text style={[styles.title, { fontFamily: "Sans" }]}>Checkout</Text>
      </View>

      <View style={styles.content}>
        {/* Tab View */}
        <ScrollView scrollEnabled>
          <View style={styles.section1}>
            <Text
              style={{
                fontFamily: "Sans",
                letterSpacing: 1,
                lineHeight: 20.83,
                fontSize: 16,
                paddingVertical: 15,
              }}
            >
              Shipping Address
            </Text>
            <Card>
              <Card.Content style={styles.card}>
                <EvilIcons name="location" size={24} color="#FFBB5C" />
                <Text style={{fontFamily:'Sans',color:'#808080'}}>672 Manchester Dr.Brownsburg, IN 46112</Text>
              </Card.Content>
            </Card>
            <Text
              style={{
                fontFamily: "Sans",
                letterSpacing: 1,
                lineHeight: 20.83,
                fontSize: 16,
                paddingVertical: 15,
              }}
            >
              Payment Options
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              columnGap: 5,
              rowGap: 15,
              paddingHorizontal: 10,
            }}
          >
            <Card
              style={
                activeTab === 1 ? styles.selectedAirtel : styles.unselected
              }
              //   "#FFBB5C" : "white"}
              onPress={() => handleTabPress(1)}
              //   textColor={activeTab === 1 ? "white" : "#989EAE"}
            >
             
              <Card.Content>
                <Image
                  source={{
                    uri: "https://logowik.com/content/uploads/images/593_airtel.jpg",
                  }}
                  height={94}
                  width={85}
                />
              </Card.Content>
            </Card>
            <Card
              style={activeTab === 2 ? styles.selectedMtn : styles.unselected}
              //   "#FFBB5C" : "white"}
              onPress={() => handleTabPress(2)}
              //   textColor={activeTab === 1 ? "white" : "#989EAE"}
            >
              <Card.Content>
                <Image
                  source={{
                    uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/MTN_Logo.svg/2048px-MTN_Logo.svg.png",
                  }}
                  height={94}
                  width={85}
                />
              </Card.Content>
            </Card>
            <Card
              style={
                activeTab === 3 ? styles.selectedZamtel : styles.unselected
              }
              //   "#FFBB5C" : "white"}
              onPress={() => handleTabPress(3)}
              //   textColor={activeTab === 1 ? "white" : "#989EAE"}
            >
              <Card.Content>
                <Image
                  source={{
                    uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkHrzr06eal4Gwv1EdXy64ZMG32nDhMqTElN7DAg1Fpw&s",
                  }}
                  height={94}
                  width={85}
                />
              </Card.Content>
            </Card>
          </View>
          {
            activeTab === 0 ? (
              <View
              style={{
              paddingVertical:20,
              paddingHorizontal:30
                
              }}
            >
                
              <Card style={styles.card1}>
                <Card.Content>
                  <View>
                    <Image
                    source={require("../assets/card.png")}
                    style={{alignSelf:'center'}}
                  />
                  <Text style={{ color: "black",fontSize:16,fontFamily:'Sans',textAlign:'center',paddingVertical:10 }}>No Card Added</Text>
                  <Text  style={{ color: "#808080",fontSize:16,fontFamily:'Sans',textAlign:'center',paddingVertical:2 }}>You can add a Credit/Debit card and save it for later</Text>
                  </View>
                </Card.Content>
                
              </Card>
              <Button
            mode="outlined"
            style={{
              paddingVertical: 5,
              borderRadius: 5,
              borderColor: "#E6E6E6",
              marginTop:12
             
            }}
            buttonColor="white"
            textColor="#FFAA33"
          >
            <AntDesign name="plus" size={20} color={"#FFAA33"}/>
            <Text style={{ fontFamily:'Sans'}}>Add New</Text>
          </Button>
            </View>
            ) : (
              <View style={{paddingVertical:10}}>
                <Card style={{backgroundColor:'#F4F5F7',marginHorizontal:10}}>
                  <Card.Content>
                    {
                      activeTab === 1 ? (
                        <View>
                          <Text style={{fontFamily:'Sans'}}>Airtel</Text>
                          <View style={styles.logo}>
                          <Image
                  source={{
                    uri: "https://logowik.com/content/uploads/images/593_airtel.jpg",
                  }}
                  height={28}
                  width={28}
                />
                <Text style={{fontFamily:'Sans'}}><Text style={{color:'#808080'}}>*********</Text>56</Text>
                          </View>
                        </View>
                      
                      ) : activeTab === 2 ? (
                        <View>
                        <Text style={{fontFamily:'Sans'}}>MTN</Text>
                        <View style={styles.logo}>
                        <Image
                source={{
                  uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/MTN_Logo.svg/2048px-MTN_Logo.svg.png",
                }}
                height={28}
                width={28}
              />
              <Text style={{fontFamily:'Sans'}}><Text style={{color:'#808080'}}>*********</Text>56</Text>
                        </View>
                      </View>
                      ) : activeTab === 3 ? (
                        <View>
                        <Text style={{fontFamily:'Sans'}}>Zamtel</Text>
                        <View style={styles.logo}>
                        <Image
                source={{
                  uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkHrzr06eal4Gwv1EdXy64ZMG32nDhMqTElN7DAg1Fpw&s",
                }}
                height={28}
                width={28}
              />
              <Text style={{fontFamily:'Sans'}}><Text style={{color:'#808080'}}>*********</Text>56</Text>
                        </View>
                      </View>
                      ) : ""
                    }
                  </Card.Content>
                </Card>
              </View>
            )
          }
          

         
            <View style={{marginHorizontal: 20,}}>
            
          <Text style={{color:'black',fontFamily:'Sans',fontSize:24,lineHeight:31.25,paddingVertical:20}}>
            <Text style={{color:'#808080',lineHeight:24,fontSize:14}}>TOTAL:</Text> ${price}</Text>
            <Button
            mode="outlined"
            style={{
              paddingVertical: 10,
              borderRadius: 5,
              borderColor: "#E6E6E6",
              marginBottom:20
            }}
            buttonColor="#DE1738"
            textColor="white"
          >
            <Text style={{ fontFamily:'Sans',textTransform:'uppercase'}}>Checkout</Text>
          </Button>
            </View>
         
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DE1738",
  },
  header: {
    top: Platform.OS === "android" ? 15 : 58,
    left: 24,
    flexDirection: "row",
    columnGap: 10,
    flex: 1,
  },
  icon: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 45,
    height:45,
    top: Platform.OS === "android" ? 35 : 58,
  },
  section1: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    color: "white",
    textAlign: "center",
    textAlignVertical: "center",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#FBFBFB",
    borderWidth: 1,
    borderColor: "#E6E6E6",
    borderRadius: 10,
  },
  images: {
    flexDirection: "row",
    columnGap: 20,
  },
  button: {
    position: "absolute",
    top: -180,
    left: 35,
    backgroundColor: "#FFFFFF",
    elevation: 10,
  },
  content: {
    backgroundColor: "#FFFFFF",
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
    flex: 6,
    // top: 120,
  },
  unselected: {
    backgroundColor: "white",
  },
  selectedAirtel: {
    borderWidth: 1,
    borderColor: "red",

    backgroundColor: "white",
  },
  selectedMtn: {
    borderWidth: 1,
    borderColor: "yellow",

    backgroundColor: "white",
  },
  selectedZamtel: {
    borderWidth: 1,
    borderColor: "green",

    backgroundColor: "white",
  },
  card1: {
    height: 257,
    width: 327,

    alignItems: "center",
    backgroundColor: "white",
  },
  logo:{
    paddingTop:5,
    flexDirection:'row',
    columnGap:4
  }

});
