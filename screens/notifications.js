import React from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useState, useCallback } from "react";
import Animated, { FadeIn, FadeInUp, Layout } from "react-native-reanimated";
import { StatusBar } from "expo-status-bar";
export default function Notifications() {
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
      <StatusBar backgroundColor="#DE1738" style="light" />
      <View style={styles.content}>
        <ScrollView style={styles.body}>
          <View>
            <Text
              style={{
                fontSize: 20,
                letterSpacing: -0.24,
                lineHeight: 27.28,
                fontFamily: "Nunito",
                color: "black",
              }}
            >
              Today
            </Text>
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
  },
  body: {
    top: 40,
    left: 24,
  },
});
