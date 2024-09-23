import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React, { useState, useCallback } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Button } from "react-native-paper";
import Animated, { FadeIn } from "react-native-reanimated";
export default function Interests() {
  const [fontsLoaded] = useFonts({
    "DM-sans": require("../assets/fonts/DMSans_24pt-Regular.ttf"),
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
      entering={FadeIn}
      style={styles.container}
      onLayout={onLayoutRootView}
    >
      <View style={{ flexDirection: "row", columnGap: 4 }}>
        <Text style={[styles.text, { fontFamily: "DM-sans" }]}>
          What Sparks your interest?
        </Text>
        <TouchableOpacity>
          <Text
            style={{
              fontFamily: "DM-sans",
              textAlignVertical: "center",
              textAlign: "center",
              color: "white",
              borderBottomColor: "#FB6B82",
              borderBottomWidth: 1,
            }}
          >
            View all
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={[
          styles.outline,
          { flexDirection: "row", justifyContent: "space-between" },
        ]}
      >
        <View
          style={{ flexDirection: "row", paddingHorizontal: 10, columnGap: 5 }}
        >
          <MaterialCommunityIcons
            style={{ textAlignVertical: "center" }}
            name="car-pickup"
            size={24}
            color="white"
          />
          <Text
            style={{
              color: "white",
              textAlignVertical: "center",
              fontFamily: "DM-sans",
            }}
          >
            Vehicle
          </Text>
        </View>
        <Button
          textColor="white"
          buttonColor="#DE1738"
          style={{
            height: 40,
            width: 50,
            marginVertical: 3,
            marginHorizontal: 4,
          }}
          icon="plus"
        >
          <Text style={{ fontFamily: "DM-sans" }}>Add</Text>
        </Button>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    top: 80,
  },
  text: {
    fontSize: 20,
    lineHeight: 20,
    color: "#FFFFFF",
  },
  outline: {
    backgroundColor: "#FB6B82",
    width: 327,
    height: 48,
    borderRadius: 40,
    top: 5,
  },
});
