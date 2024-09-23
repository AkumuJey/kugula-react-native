import { useContext, useEffect, useState, useCallback } from "react";
import { API_URL } from "../constants";
import { userContext } from "../Context/context";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
	AntDesign,
	Feather,
	FontAwesome,
	FontAwesome5,
} from "@expo/vector-icons";
import {
	Text,
	View,
	StyleSheet,
	ScrollView,
	FlatList,
	useWindowDimensions,
	Image,
	Pressable,
	ToastAndroid,
} from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import Animated, { FadeIn, FadeInUp, Layout } from "react-native-reanimated";
import { Card } from "react-native-paper";
export default function Favourites() {
	const { userData } = useContext(userContext);
	const [favs, setFavs] = useState([]);
	const windowWidth = useWindowDimensions().width;

	const removeFav = async (item) => {
		try {
			const response = await fetch(`${API_URL}/favourites/${item.listingid}`, {
				method: "PATCH",
				headers: {
					Authorization: `Bearer ${userData.accessToken}`,
					"Content-type": "application/json",
				},
				body: JSON.stringify({
					posttype: Number(item.posttype),
					userid: Number(userData.id),
					action: "remove",
				}),
			});
			if (response.ok) {
				const data = await response.json();
				console.log(data);
				ToastAndroid.show(
					data.message,
					ToastAndroid.BOTTOM,
					ToastAndroid.SHORT
				);
			}
			if (!response.ok) {
				const data = await response.json();
				console.log(data);
			}
		} catch (error) {
			console.log(error);
		}
	};
	const getFavs = async () => {
		try {
			const response = await fetch(
				`${API_URL}/posts/users/${userData.id}/favourites/view`,
				{
					headers: {
						Authorization: `Bearer ${userData.accessToken}`,
					},
				}
			);
			if (response.ok) {
				const data = await response.json();
				setFavs(data.message);
				console.log(data);
			}
			if (!response.ok) {
				const data = await response.json();
				console.log(data);
			}
		} catch (error) {
			console.log(error);
		}
	};
	// Fetch Favs on component mount
	useEffect(() => {
		getFavs();
	}, []);
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
			onLayout={onLayoutRootView}>
			<StatusBar backgroundColor="#DE1738" style="light" />
			<View style={styles.content}>
				<View style={styles.body}>
					<FlatList
						data={favs}
						showsVerticalScrollIndicator={false}
						ListEmptyComponent={
							<Text
								style={{
									fontFamily: "Nunito",
									textAlign: "center",
									textAlignVertical: "center",
								}}>
								No Favourites yet
							</Text>
						}
						contentContainerStyle={{
							justifyContent: "space-between",
							gap: 20,
						}}
						keyExtractor={(item) => item?.listingid.toString()} // Ensure the key is a string
						renderItem={({ item }) => (
							<View
								style={{
									paddingHorizontal: 15,
									flexDirection: "column",

									flex: 1,
								}}>
								{/* Adjusted width to accommodate space between items */}
								<Card>
									{/* <Card.Cover
										style={{ height: 100 }}
										source={{
											uri: `${API_URL}/file/${item?.urls[0]}`,
										}}
									/> */}
									<Card.Content
										style={{
											backgroundColor: "white",
											borderRadius: 10,
											elevation: 1,
											flexDirection: "row",
											alignItems: "center",
											gap: 10,
										}}>
										<Image
											source={{
												uri: `${API_URL}/file/${item?.urls[0]}`,
											}}
											height={70}
											width={70}
											style={{ borderRadius: 10 }}
										/>
										{item.posttype === 1 ? (
											<View
												style={{
													flexDirection: "row-reverse",
													alignItems: "center",
												}}>
												<AntDesign name="home" size={18} color="#DE1738" />
												<Text style={{ fontFamily: "Nunito", fontSize: 15 }}>
													Real Estate
												</Text>
											</View>
										) : item.posttype === 4 ? (
											<View
												style={{
													flexDirection: "row-reverse",

													alignItems: "center",
												}}>
												<FontAwesome5
													name="car-side"
													size={18}
													color="#DE1738"
												/>
												<Text style={{ fontFamily: "Nunito", fontSize: 15 }}>
													Vehicle
												</Text>
											</View>
										) : item.posttype === 3 ? (
											<View
												style={{ flexDirection: "row", alignItems: "center" }}>
												<Text style={{ fontFamily: "Nunito", fontSize: 16 }}>
													Electronics
												</Text>
												<Feather name="smartphone" size={10} color="#DE1738" />
											</View>
										) : item.posttype === 2 ? (
											<View
												style={{
													flexDirection: "row-reverse",

													alignItems: "center",
												}}>
												<FontAwesome5
													name="people-carry"
													size={18}
													color="#DE1738"
												/>
												<Text style={{ fontFamily: "Nunito", fontSize: 15 }}>
													Job Offer
												</Text>
											</View>
										) : (
											""
										)}
										<Pressable
											onPress={() => removeFav(item)}
											style={{
												left: "100%",
												width: 40,
												height: 40,
												borderRadius: 10,
												backgroundColor: "white",
												elevation: 10,
											}}>
											<Text
												style={{ alignContent: "center", left: 10, top: 10 }}>
												<FontAwesome name="heart" size={18} color="#DE1738" />
											</Text>
										</Pressable>
									</Card.Content>
								</Card>
							</View>
						)}
					/>
				</View>
			</View>
		</Animated.View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#DE1738",
		width: "100%",
	},
	content: {
		backgroundColor: "white",
		flex: 2,
		borderTopEndRadius: 25,
		borderTopStartRadius: 25,
	},
	body: {
		paddingHorizontal: 10,
		paddingVertical: 10,
		height: "100%",
	},
});
