import React, { useEffect } from "react";
import { Text, View, StyleSheet, Pressable, ToastAndroid } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useState, useCallback, useContext } from "react";
import Animated, { FadeInUp, Layout } from "react-native-reanimated";
import { ActivityIndicator } from "react-native-paper";
import {
	AntDesign,
	Entypo,
	FontAwesome5,
	SimpleLineIcons,
	MaterialIcons,
	FontAwesome,
	MaterialCommunityIcons,
} from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { userContext } from "../Context/context";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../constants";
import { Image } from "expo-image";
export default function Profile({ navigation }) {
	const [isLoading, setIsLoading] = useState(false);
	const { userData, token, setToken } = useContext(userContext);
	const [uploading, setUploading] = useState(false);

	const profileData = new FormData();
	const handleImagePicker = async () => {
		setUploading(true);
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});
		if (!result.canceled) {
			profileData.append("file", {
				uri: result.assets[0].uri,
				type: "image/png",
				name: "file.png",
			});
			try {
				const response = await fetch(
					`${API_URL}/profile/upload/${userData.id}`,
					{
						method: "POST",
						headers: {
							Authorization: `Bearer ${userData.accessToken}`,
						},
						body: profileData,
					}
				);
				if (response.ok) {
					const data = await response.json();
					ToastAndroid.show(
						"Updated Profile Successfully",
						ToastAndroid.BOTTOM,
						ToastAndroid.LONG
					);
					setUploading(false);

					console.log(data);
				}
				if (!response.ok) {
					const data = await response.json();
					console.log(data);
					setUploading(false);
					ToastAndroid.show(
						"Error occured while updating profile!",
						ToastAndroid.BOTTOM,
						ToastAndroid.LONG
					);
				}
			} catch (error) {
				console.log(error);
				ToastAndroid.show(
					"Error occured while updating profile!",
					ToastAndroid.BOTTOM,
					ToastAndroid.LONG
				);
				setUploading(false);
			}
		}
		if (result.canceled) {
			setUploading(false);
		}
	};

	const handleLogOut = async () => {
		setIsLoading(true);
		try {
			const response = await fetch(
				`http://137.184.237.55:8080/kugula/signout`,
				{
					method: "POST",
					headers: {
						Authorization: `Bearer ${userData.accessToken}`,
					},
				}
			);
			if (response.ok) {
				await AsyncStorage.removeItem("token");
				await AsyncStorage.removeItem("user");
				setToken("");
				navigation.replace("Login");
				setIsLoading(false);
			}
			if (!response.ok) {
				const data = await response.json();
				console.log(data);
				setIsLoading(false);
			}
		} catch (error) {
			console.log("An error occured while logging user out", error);
			setIsLoading(false);
		}
	};
	console.log("user data", userData);
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
		<Animated.View
			layout={Layout.duration(1000)}
			entering={FadeInUp}
			style={styles.container}
			onLayout={onLayoutRootView}>
			<StatusBar backgroundColor="#DE1738" style="light" />
			{isLoading ? (
				<View
					style={{
						flexDirection: "row",
						width: "100%",
						height: "100%",
						justifyContent: "center",
						alignItems: "center",
						backgroundColor: "white",
					}}>
					<ActivityIndicator size={20} color="#DE1738" />
				</View>
			) : (
				<View style={styles.content}>
					<View
						style={{
							flexDirection: "row",
							left: 24,
							top: 25,
							justifyContent: "space-between",
						}}>
						<View>
							<Text
								style={{
									fontFamily: "Nunito",
									color: "#808080",
									fontSize: 14,
									lineHeight: 19.1,
									letterSpacing: -0.24,
								}}>
								{userData.email}
							</Text>
							<Text
								style={{
									fontFamily: "Nunito",
									fontSize: 24,
									lineHeight: 32.74,
									letterSpacing: -0.24,
								}}>
								{userData.username}
							</Text>
							<Text
								style={{
									fontFamily: "Nunito",
									color: "#DE1738",
									fontSize: 16,
									lineHeight: 21.82,
									letterSpacing: -0.24,
								}}>
								{userData.roles[0]}
							</Text>
						</View>

						<View
							style={{
								right: 40,
								borderWidth: 1,
								borderColor: "#DE1738",
								borderRadius: 28,
								padding: 5,
							}}>
							{uploading ? (
								<View
									style={{
										height: 92,
										width: 92,
										justifyContent: "center",
										alignContent: "center",
									}}>
									<ActivityIndicator color="#DE1738" />
								</View>
							) : (
								<Image
									source={`${API_URL}/profile/download/${userData.id}`}
									height={92}
									width={92}
									cachePolicy={"none"}
									style={{
										borderRadius: 30,
										paddingHorizontal: 20,
									}}
								/>
							)}

							<Pressable
								onPress={handleImagePicker}
								icon="plus"
								mode="contained"
								style={{
									backgroundColor: "#DE1738",
									width: 42,
									height: 42,
									position: "absolute",
									borderRadius: 10,
									top: 70,
									elevation: 5,
								}}>
								<Entypo
									name="plus"
									size={24}
									color="white"
									style={{ textAlign: "center", top: 10 }}
								/>
							</Pressable>
						</View>
					</View>
					<View style={{ paddingHorizontal: 24, top: 25 }}>
						<Text
							style={{
								fontFamily: "Nunito",
								fontSize: 16,
								lineHeight: 21.82,
								letterSpacing: -0.24,
							}}>
							About us
						</Text>
						<Text
							style={{
								fontFamily: "Nunito",
								color: "#808080",
								lineHeight: 20,
								fontSize: 14,
								textAlign: "justify",
							}}>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
							sum sit ematons ectetur adipiscing elit, sed do sum sit emat
						</Text>
					</View>
					<View
						style={{
							paddingHorizontal: 24,
							top: 25,
							paddingVertical: 20,
							flexDirection: "column",
							gap: 10,
						}}>
						<Text
							style={{
								fontFamily: "Nunito",
								fontSize: 16,
								lineHeight: 21.82,
								letterSpacing: -0.24,
								color: "black",
							}}>
							Settings
						</Text>
						<Pressable
							style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
							<FontAwesome5 name="user" size={24} color="black" />
							<Text
								style={{
									fontSize: 14,
									lineHeight: 19.1,
									color: "#808080",
									fontFamily: "Nunito",
								}}>
								Account
							</Text>
						</Pressable>
						<Pressable
							style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
							<SimpleLineIcons name="lock" size={24} color="black" />
							<Text
								style={{
									fontSize: 14,
									lineHeight: 19.1,
									color: "#808080",
									fontFamily: "Nunito",
								}}>
								Privacy & Security
							</Text>
						</Pressable>
						<Pressable
							style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
							<MaterialIcons name="support-agent" size={24} color="black" />
							<Text
								style={{
									fontSize: 14,
									lineHeight: 19.1,
									color: "#808080",
									fontFamily: "Nunito",
								}}>
								Help and Support
							</Text>
						</Pressable>
						<Pressable
							style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
							<MaterialIcons name="error-outline" size={24} color="black" />
							<Text
								style={{
									fontSize: 14,
									lineHeight: 19.1,
									color: "#808080",
									fontFamily: "Nunito",
								}}>
								About
							</Text>
						</Pressable>
						<Pressable
							style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
							<FontAwesome name="language" size={24} color="black" />
							<Text
								style={{
									fontSize: 14,
									lineHeight: 19.1,
									color: "#808080",
									fontFamily: "Nunito",
								}}>
								Language
							</Text>
						</Pressable>
						<Pressable
							onPress={handleLogOut}
							style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
							<MaterialCommunityIcons name="logout" size={24} color="black" />
							<Text
								style={{
									fontSize: 14,
									lineHeight: 19.1,
									color: "#808080",
									fontFamily: "Nunito",
								}}>
								Logout
							</Text>
						</Pressable>
					</View>
				</View>
			)}
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
});
