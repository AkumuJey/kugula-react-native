import React, { useState, useCallback, useContext } from "react";
import {
	View,
	Text,
	FlatList,
	TextInput,
	Pressable,
	StyleSheet,
	TouchableOpacity,
	Image,
	ActivityIndicator,
} from "react-native";
import { API_URL } from "../constants";
import { userContext } from "../Context/context";
import { FontAwesome } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { PaperProvider, Card } from "react-native-paper";
const ItemsSearch = ({ navigation }) => {
	const [data, setData] = useState();
	const [searchWord, setSearchWord] = useState("");
	const [compiledData, setCompiledData] = useState([]);
	const { userData } = useContext(userContext);
	const [searching, setSearching] = useState(false);

	// useEffect(() => {
	// 	// Assuming you fetch the data from your API
	// 	fetchData();
	// }, []);

	const fetchData = async () => {
		setSearching(true);
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
			console.log(message);
			setData(message);
			setCompiledData((prev) => [
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
	// console.log("Compiled Data", compiledData);
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
		<View
			onLayout={onLayoutRootView}
			style={{
				flex: 1,
				backgroundColor: "white",
			}}>
			<View style={{ flexDirection: "row", paddingVertical: 15 }}>
				<TextInput
					style={styles.search}
					value={searchWord}
					placeholder="search"
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
							<Text style={{ color: "white", fontFamily: "Sans" }}>Search</Text>
						</>
					)}
				</Pressable>
			</View>
			<Text
				style={{
					fontSize: 18,
					paddingHorizontal: 10,
					paddingVertical: 10,
					fontFamily: "Sans",
				}}>
				Search Results
			</Text>
			<FlatList
				data={compiledData}
				showsVerticalScrollIndicator={false}
				ListEmptyComponent={
					<Text
						style={{ textAlign: "center", fontFamily: "Sans", fontSize: 10 }}>
						No results
					</Text>
				}
				renderItem={({ item }) => (
					<TouchableOpacity
						onPress={() =>
							navigation.navigate("details", {
								item,
							})
						}>
						<Card style={styles.card}>
							<Card.Content style={{ flexDirection: "row", columnGap: 5 }}>
								<Image
									source={{ uri: `${API_URL}/file/${item.urls[0]}` }}
									style={{ borderRadius: 10 }}
									height={50}
									width={60}
								/>
								<View>
									<Text style={{ color: "black", fontFamily: "Nunito" }}>
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
	);
};

export default ItemsSearch;

const styles = StyleSheet.create({
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
	button: {
		backgroundColor: "#DE1738",
		width: 70,
		borderRadius: 5,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	card: {
		backgroundColor: "white",
		marginBottom: 5,
		marginHorizontal: 10,
	},
});
