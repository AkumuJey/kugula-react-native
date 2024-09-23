import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { useState, useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";

// SplashScreen.preventAutoHideAsync();
export default function OnBoarding({ navigation }) {
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
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
      <StatusBar style="light" backgroundColor="#DE1738" />
      <View style={styles.main}>
        <Image
          source={require("../assets/onboard.png")}
          width={50}
          height={50}
        />
        <Text
          style={{
            color: "white",
            fontFamily: "Poppins-Regular",
            lineHeight: 36,
            fontSize: 24,
            fontWeight: 600,
            textAlign: "center",
            position: "relative",
            top: 15,
          }}
        >
          Welcome To KUGULA
        </Text>
        <Text
          style={{
            textAlign: "center",
            color: "white",
            lineHeight: 18,
            fontFamily: "Poppins-Regular",
            fontSize: 12,
            fontWeight: 500,
            position: "relative",
            top: 15,
          }}
        >
          Discover, Shop, and Explore: Your Ultimate Marketplace Experience!
        </Text>
        <Pressable
          style={{
            width: 240,
            height: 48,
            borderRadius: 30,
            backgroundColor: "#FB6B82",
            top: 50,
            position: "relative",
          }}
          onPress={() => navigation.navigate("Login")}
        >
          <Text
            style={{
              fontFamily: "Poppins-Regular",
              fontSize: 16,
              fontWeight: 500,
              color: "white",
              textAlign: "center",
              paddingVertical: 10,
              lineHeight: 24,
            }}
          >
            Continue
          </Text>
        </Pressable>
        <Image
          source={require("../assets/blob-small.png")}
          width={35}
          height={46}
          style={{ top: 389, position: "absolute", left: 21 }}
        />
        <Image
          source={require("../assets/blob.png")}
          width={35}
          height={46}
          style={{ top: 514, position: "absolute", left: 316 }}
        />
        <Image
          source={require("../assets/person.png")}
          width={100}
          height={100}
          style={{ top: 149 }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DE1738",
  },
  main: {
    alignItems: "center",
    paddingVertical: 100,
  },
});
