import React, { useContext, useEffect } from "react";
import {
	Text,
	View,
	StyleSheet,
	ScrollView,
	FlatList,
	Image,
	useWindowDimensions,
	TouchableOpacity,
	Pressable,
	ActivityIndicator,
	ToastAndroid,
} from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useState, useCallback } from "react";
import Animated, {
	FadeIn,
	FadeInUp,
	Layout,
	SlideInUp,
	ZoomInUp,
} from "react-native-reanimated";
import { TextInput, PaperProvider, Card } from "react-native-paper";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { userContext } from "../Context/context";
import axios from "axios";
import { API_URL } from "../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Search({ navigation }) {
	const { token, userData } = useContext(userContext);
	const height = useWindowDimensions().height;
	const [searchWord, setSearchWord] = useState("");
	const [searching, setSearching] = useState(false);
	const [searchHistory, setSearchHistory] = useState("");
	const fetchSearcHistory = async () => {
		await AsyncStorage.getItem("search").then(async (value) => {
			if (value === null) {
				console.log("No data found");
			} else {
				setSearchHistory(value);
				console.log("history", value);
			}
		});
	};
	useEffect(() => {
		fetchSearcHistory();
	}, []);
	const fetchData = async () => {
		await AsyncStorage.setItem("search", searchWord);
		fetchSearcHistory();
		setSearching(true);
		if (!searchWord) {
			setSearching(false);
			return ToastAndroid.show(
				"No data found, Input at least one letter",
				ToastAndroid.CENTER,
				ToastAndroid.SHORT
			);
		}
		try {
			// Fetch data from your API
			const response = await fetch(
				`${API_URL}/posts/all/search/${searchWord}`,
				{
					headers: {
						Authorization: `Bearer ${userData.accessToken}`,
					},
				}
			);
			const { message } = await response.json();
			setData((prev) => [
				...message?.items?.map((item) => item),
				...message?.jobs?.map((job) => job),
				...message?.houses?.map((house) => house),
				...message?.vehicles?.map((vehicle) => vehicle),
			]);
			setSearching(false);
		} catch (error) {
			console.error("Error fetching data:", error);
			setSearching(false);
		}
	};

	const [data, setData] = useState([]);
	useEffect(() => {
		async function GetItems() {
			await axios
				.get("http://137.184.237.55:8080/kugula/posts/all", {
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				})
				.then((data) => {
					const { message } = data.data;
					console.log(message);
					setData(() => [
						...message[0]?.map((res) => res),
						...message[1]?.map((res) => res),
						...message[2]?.map((res) => res),
						...message[3]?.map((res) => res),
					]);
				})
				.catch((err) => {
					console.log(err);
				});
		}
		GetItems();
	}, [searchWord != "" ? "" : true]);
	useEffect(() => {
		async function FilterSearch() {
			await axios
				.get(
					`http://137.184.237.55:8080/kugula/posts/all/search/${searchWord}`,
					{
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
					}
				)
				.then((data) => {
					setData(data.data.message[0]);
					console.log("searchData", data.data);
				})
				.catch((err) => {
					console.log(err);
				});
		}
		FilterSearch();
	}, [searchWord]);
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
			<View style={styles.content}>
				<View style={[styles.contentWrapper]}>
					<ScrollView>
						<PaperProvider
							settings={{
								icon: (props) => <AntDesign {...props} />,
							}}>
							<View
								style={{
									flexDirection: "row",
									justifyContent: "space-between",
								}}>
								<TextInput
									placeholder="search"
									style={[styles.search, { fontFamily: "Nunito" }]}
									mode="outlined"
									left={<TextInput.Icon icon="search1" />}
									outlineColor="#DE1738"
									activeOutlineColor="#DE1738"
									autoComplete="name"
									value={searchWord}
									onChangeText={(val) => setSearchWord(val)}
								/>
								<Pressable
									disabled={searching}
									style={styles.button}
									onPress={fetchData}>
									{searching ? (
										<ActivityIndicator color={"white"} />
									) : (
										<>
											<FontAwesome name="search" color={"white"} size={18} />
											<Text style={{ color: "white", fontFamily: "Sans" }}>
												Search
											</Text>
										</>
									)}
								</Pressable>
							</View>
						</PaperProvider>
					</ScrollView>

					<View style={{ top: 5, height: height }}>
						<Text style={[styles.text, { fontFamily: "Sans" }]}>
							Recent Keyword
						</Text>
						<View
							style={{
								flexDirection: "row",
								columnGap: 5,
								paddingHorizontal: 20,
							}}>
							<Text style={styles.recent}>{searchHistory}</Text>
						</View>
						<Text style={[styles.text, { fontFamily: "Sans" }]}>
							Suggested Products
						</Text>
						<View style={{ height: 360 }}>
							<FlatList
								data={data}
								style={{ backgroundColor: "white" }}
								scrollEnabled={true}
								showsVerticalScrollIndicator={false}
								keyExtractor={(item) => item.description}
								renderItem={({ item }) => (
									<TouchableOpacity
										key={item.id}
										onPress={() =>
											navigation.navigate("details", {
												item,
											})
										}>
										<Card style={styles.card}>
											<Card.Content
												style={{ flexDirection: "row", columnGap: 5 }}>
												<Image
													source={{ uri: `${API_URL}/file/${item.urls[0]}` }}
													style={{ borderRadius: 10 }}
													height={50}
													width={60}
												/>
												<View>
													<Text
														style={{ color: "black", fontFamily: "Nunito" }}>
														{item.title}
													</Text>
													<View style={{ flexDirection: "row", columnGap: 2 }}>
														<FontAwesome name="star" size={18} color="orange" />
														<Text style={{ fontFamily: "Nunito" }}>
															{/* {item.rating} */}4.4
														</Text>
													</View>
												</View>
											</Card.Content>
										</Card>
									</TouchableOpacity>
								)}
							/>
						</View>
					</View>
				</View>
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
	search: {
		borderRadius: 3,
		backgroundColor: "white",
		borderColor: "white",
		marginHorizontal: 20,
		borderWidth: 1,
		borderColor: "#DE1738",
		width: "70%",
		padding: 5,
	},
	text: {
		fontSize: 20,
		lineHeight: 26.04,
		color: "#32343E",
		paddingVertical: 20,
		paddingHorizontal: 20,
	},
	recent: {
		borderWidth: 1,
		borderRadius: 20,
		padding: 10,
		borderColor: "gray",
	},
	contentWrapper: {
		paddingVertical: 20,
	},
	card: {
		backgroundColor: "white",
		marginBottom: 5,
		marginHorizontal: 10,
	},
	button: {
		backgroundColor: "#DE1738",
		width: 70,
		borderRadius: 5,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		marginRight: 10,
	},
});
