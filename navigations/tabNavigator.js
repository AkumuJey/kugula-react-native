import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/home";
import Cart from "../screens/cart";
import Search from "../screens/search";
import Notifications from "../screens/notifications";
import Profile from "../screens/profile";
import { View } from "react-native";
import { AntDesign, Ionicons, EvilIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useState, useCallback } from "react";
import { useFonts } from "expo-font";
import Salalula from "../screens/salaula";
import Amasampo from "../screens/amasampo";
import AdScreen from "../screens/ad";
const Tab = createBottomTabNavigator();

export default function TabNav() {
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
		<Tab.Navigator
			screenOptions={{
				tabBarStyle: {
					height: 70,
					borderTopEndRadius: 28,
					borderTopLeftRadius: 28,
					elevation: 0,
					backgroundColor: "white",
				},
				tabBarShowLabel: false,
				tabBarHideOnKeyboard: true,
				tabBarActiveTintColor: "#DE1738",
			}}
			backBehavior="none"
			initialRouteName="Home"
			detachInactiveScreens>
			<Tab.Screen
				name="Home"
				component={HomeScreen}
				options={{
					tabBarIcon: ({ focused }) => (
						<View>
							<AntDesign
								style={{ alignSelf: "center", top: focused ? -5 : "" }}
								name="home"
								size={focused ? 30 : 24}
								color={focused ? "#DE1738" : "#FB6B82"}
							/>
						</View>
					),
					headerStyle: {
						backgroundColor: "#DE1738",
						height: 120,
					},
					// headerTitleStyle: { color: "white", fontFamily: "Nunito" },
					// headerShadowVisible: false,
					// headerTitle: "Cart",
					headerShown: false,
				}}
			/>
			<Tab.Screen
				name="search"
				component={Search}
				options={{
					tabBarIcon: ({ focused }) => (
						<View style={{ alignSelf: "center", top: focused ? -5 : "" }}>
							<EvilIcons
								name="search"
								size={focused ? 30 : 24}
								color={focused ? "#DE1738" : "#FB6B82"}
							/>
						</View>
					),
					headerStyle: {
						backgroundColor: "#DE1738",
						height: 120,
					},
					headerTitleStyle: { color: "white", fontFamily: "Nunito" },
					headerShadowVisible: false,
					headerTitle: "Search",
				}}
			/>

			<Tab.Screen
				name="add"
				component={AdScreen}
				options={{
					tabBarIcon: ({ focused, color }) => (
						<View
							style={{
								bottom: 30,
								backgroundColor: "#DE1738",
								width: 73,
								height: 73,

								borderRadius: 24,
								elevation: 10,
							}}>
							<AntDesign
								style={{ alignSelf: "center", top: 20 }}
								name="plus"
								size={focused ? 30 : 24}
								color={"white"}
							/>
						</View>
					),
					headerShown: false,
				}}
			/>
			<Tab.Screen
				name="notifications"
				component={Notifications}
				options={{
					tabBarIcon: ({ focused }) => (
						<View style={{ alignSelf: "center", top: focused ? -5 : "" }}>
							<Ionicons
								name="notifications"
								size={focused ? 30 : 24}
								color={focused ? "#DE1738" : "#FB6B82"}
							/>
						</View>
					),
					headerStyle: {
						backgroundColor: "#DE1738",
						height: 120,
					},
					headerTitleStyle: { color: "white", fontFamily: "Nunito" },
					headerShadowVisible: false,
					tabBarBadge: 0,
					tabBarBadgeStyle: { backgroundColor: "#DE1738", top: 10 },
					headerTitle: "Notifications",
				}}
			/>
			<Tab.Screen
				options={{
					tabBarIcon: ({ focused }) => (
						<View style={{ alignSelf: "center", top: focused ? -5 : "" }}>
							<AntDesign
								name="user"
								size={focused ? 30 : 24}
								color={focused ? "#DE1738" : "#FB6B82"}
							/>
						</View>
					),
					headerStyle: {
						backgroundColor: "#DE1738",
						height: 120,
					},
					headerTitleStyle: { color: "white", fontFamily: "Nunito" },
					headerShadowVisible: false,

					headerTitle: "Profile",
				}}
				name="profile"
				component={Profile}
			/>
		</Tab.Navigator>
	);
}
