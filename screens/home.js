import {
	Text,
	View,
	StyleSheet,
	useWindowDimensions,
	Pressable,
	TextInput,
	TouchableOpacity,
	FlatList,
	PanResponder,
	Animated,
	Alert,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
	Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { AntDesign, EvilIcons, MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import _ from "lodash";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React, {
	useState,
	useCallback,
	useRef,
	useEffect,
	useContext,
} from "react";
import {
	FadeIn,
	FadeInLeft,
	FadeInUp,
	FadeOutDown,
	Layout,
} from "react-native-reanimated";

import Interests from "../components/interests";
import { ActivityIndicator, Button, Card } from "react-native-paper";
import Slider from "@react-native-community/slider";
import { useLikeContext, userContext } from "../Context/context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
import { API_URL } from "../constants";
import { Image } from "expo-image";
export default function HomeScreen({ navigation }) {
	const { userData, token, setToken } = useContext(userContext);
	const [products, setProducts] = useState([]);
	const mounted = useRef(true);
	const [activeTab, setActiveTab] = useState(0);
	const [body, setBody] = useState("");
	// const height = useWindowDimensions().height;
	const width = useWindowDimensions().width;
	const [interestState, setInterestState] = useState(false);
	const [loading, setLoading] = useState(true);
	const [sliderValue, setSliderValue] = useState(0);
	const [error, setError] = useState(false);
	const [refreshing, setRefreshing] = useState(false);
	const [time, setTime] = useState(new Date());
	const [greeting, setGreeting] = useState("");
	const [expanded, setExpanded] = useState(false);
	const [pressed, setPressed] = useState(false);
	const { likeState } = useLikeContext();
	const [searchWord, setSearchWord] = useState("");
	const [housePage,setHousePage] = useState(0)

	const [dynamicHeight, setDynamicHeight] = useState(290);

	const handleSearch = async () => {
		try {
			const response = await fetch(
				`${API_URL}/posts/all/search/${searchWord}`,
				{
					headers: {
						Authorization: `Bearer ${userData.accessToken}`,
					},
				}
			);
			if (response.ok) {
				const data = await response.json();
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

	const [colors, setColors] = useState([
		{
			id: 1,
			color: "#D5A7F2",
		},
		{
			id: 2,
			color: "#F2D9AB",
		},
		{
			id: 3,
			color: "#F2B6C1",
		},
		{
			id: 4,
			color: "#F2F0C5",
		},
		{
			id: 5,
			color: "#F26100",
		},
		{
			id: 6,
			color: "#00F2F2",
		},
		{
			id: 7,
			color: "#F20000",
		},
		{
			id: 8,
			color: "#E3E300",
		},
	]);
	const [tabs, setTabs] = useState([
		{
			id: 4,
			displayName: "Vehicles",
			name: "car",
			icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMgF_FBDwnnRtXGXjjdVmdEXtzQXhiOY5jsg&usqp=CAU",
		},
		{
			id: 1,
			name: "Real Estate",
			displayName: "Real Estate",
			icon: "https://img.freepik.com/premium-vector/vector-house-icon-outline-house-home-page-icon-clip-art-svg_769314-401.jpg",
		},
		{
			id: 3,
			name: "Electronics",
			displayName: "Electronics",
			icon: "https://static.vecteezy.com/system/resources/previews/006/296/915/non_2x/electric-plug-icon-illustration-eps-10-free-vector.jpg",
		},
		{
			id: 2,
			name: "Job Offers",
			displayName: "Job Offers",
			icon: "https://image.shutterstock.com/image-vector/portfolio-vector-thin-line-icon-260nw-1719212350.jpg",
		},
		{
			id: 5,
			name: "Amasampo",
			displayName: "Amasampo",
			icon: "https://cdn4.vectorstock.com/i/1000x1000/73/28/red-geometric-gradient-letter-a-logo-symbol-vector-9437328.jpg",
		},
		{
			id: 6,
			name: "Salaula",
			displayName: "Salaula",
			icon: "https://st2.depositphotos.com/3867453/7605/v/950/depositphotos_76055207-stock-illustration-letter-s-logo-icon-design.jpg",
		},
	]);

	const [active, setActive] = useState(1);
	const handleActiveTab = (id) => {
		
		setActive(id);
	};
	const [liked, setLiked] = useState(false);
	const scrollY = useRef(new Animated.Value(0)).current;
	// const isTabBarVisible = useIsFocused() && scrollY < 100;
	// navigation.setOptions({ tabBarVisible: isTabBarVisible });
	const isFocused = useIsFocused(); // Check if the screen is focused

	// ...

	const handlePaginationFetch=async(posttype)=>{
		setHousePage(housePage+1)
		await fetchByCategory(posttype)
	}
	const handleReload=async(posttype)=>{
		setHousePage(0)
		await fetchByCategory(posttype)
	}

	useEffect(() => {
		let isScrolling = false;

		const handleScroll = Animated.event(
			[{ nativeEvent: { contentOffset: { y: scrollY } } }],
			{
				useNativeDriver: false,
				listener: (event) => {
					const currentOffset = event.nativeEvent.contentOffset.y;

					if (currentOffset > 0 && !isScrolling) {
						// Scrolling down, hide the tabBar
						isScrolling = true;
						navigation.setOptions({ tabBarVisible: false });
					} else if (currentOffset <= 0 && isScrolling) {
						// Scrolling up or at the top, show the tabBar
						isScrolling = false;
						navigation.setOptions({ tabBarVisible: true });
					}
				},
			}
		);

		// Attach the scroll event listener
		const scrollListener = scrollY.addListener(handleScroll);

		return () => {
			// Remove the scroll event listener when the component is unmounted
			scrollY.removeListener(scrollListener);
		};
	}, [scrollY, navigation, isFocused]);

	// Bottom Sheet Code/Logic
	const translateY = useRef(new Animated.Value(600)).current;
	const panResponder = useRef(
		PanResponder.create({
			onStartShouldSetPanResponder: () => true,
			onPanResponderMove: Animated.event([null, { dy: translateY }], {
				useNativeDriver: false,
			}),
			onPanResponderRelease: (_, gestureState) => {
				if (gestureState.dy > 0 && gestureState.vy > 0.5) {
					// If dragged down with enough velocity, close the bottom sheet
					Animated.timing(translateY, {
						toValue: 600,
						duration: 300,
						useNativeDriver: false,
					}).start();
				} else {
					// Snap back to the open position
					Animated.spring(translateY, {
						toValue: 0,
						useNativeDriver: false,
					}).start();
				}
			},
		})
	).current;

	const openBottomSheet = () => {
		Animated.spring(translateY, {
			toValue: 0,
			useNativeDriver: false,
		}).start();
	};

	const closeBottomSheet = () => {
		Animated.timing(translateY, {
			toValue: 600,
			duration: 300,
			useNativeDriver: false,
		}).start();
	};

	useEffect(() => {
		let counter = 0;

		const timer = setInterval(() => {
			// Check if state updates are necessary
			if (counter % 60 === 0) {
				// Update every 60 seconds
				const date = new Date();
				setGreeting(getGreeting(date.getHours()));
				setTime(date);
			}

			counter += 1;
		}, 1000);

		return () => {
			clearInterval(timer);
		};
	}, []);

	// Utility function to get the greeting based on the hour
	const getGreeting = (hour) => {
		if (hour < 12) {
			return "Good Morning";
		} else if (hour < 18) {
			return "Good Afternoon";
		} else {
			return "Good Evening";
		}
	};
	const handleExpanded = () => {
		setExpanded(!expanded);
	};

	async function Clear() {
		await AsyncStorage.removeItem("token");
		await AsyncStorage.removeItem("user");
		setToken("");
	}

	// const hadleLogout=async()=>{
		
	// }

	const fetchData = async () => {
		try {
			const response = await fetch(
				`${API_URL}/posts/all`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				}
			);
			if (response.ok) {
				const data = await response.json();
				const info = data.message[0];
				console.log("Fetched info", info);

				setProducts((prev) => [
					...data?.message[0]?.map((data) => data),
					...data?.message[1]?.map((data) => data),
					...data?.message[2]?.map((data) => data),
					...data?.message[3]?.map((data) => data),
				]);
				setLoading(false);
			}
			if (!response.ok) {
				
				await Clear();
				setLoading(false);
				navigation.navigate("Login")
			}

			// data.message.map((item) => {

			// });

			// setLoading(false);
		} catch (error) {
			setLoading(false);
			console.log(error);
		}
	};
	// Fetch data on Component mount

	const handleRefreshing = () => {
		setHousePage(0)
		setRefreshing(true);
		setActiveTab(0);
		fetchData();
		setRefreshing(false);
	};
	// const handleRefreshingCategory=()=>{
	//   setRefreshing(true)
	//   fetchByCategory()
	//   setRefreshing(false)
	// }

	useEffect(() => {
		fetchData();
	}, [likeState]);

	const fetchFilteredPrice = async () => {
		try {
			const response = await fetch(
				`${API_URL}/items/filter?maxPrice=${sliderValue}`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				}
			);
			const flteredData = await response.json();
			console.log("filteredData", flteredData);
			setProducts(flteredData.message);
			setLoading(false);
			closeBottomSheet();
		} catch (error) {
			console.log(error);
		}
	};
	// useEffect(() => {
	// 	async function Clear() {
	// 		await AsyncStorage.removeItem("token");
	// 		await AsyncStorage.removeItem("user");
	// 		setToken("");
	// 	}

	// 	Clear();
	// }, []);
	const handleAdNavigate = () => {
		navigation.navigate("ad");
		console.log("clicked by namycodes");
	};

	const handleInterestPress = () => {
		navigation.navigate("fav");
	};
	const handleTabPress = async (item) => {
		setHousePage(0)
		setActiveTab(item.id);
		setBody(item);
		// console.log('Body name', item.name)
		await fetchByCategory(item.id);
	};
	useEffect(() => {
		if (body) {
			
			fetchByCategory(body.id);
		}
	}, [body]);

	const fetchByCategory = async (id) => {
		
		setProducts([]);
		setLoading(true);
		setError(false);
		if (id === 3) {
			try {
				const response = await fetch(
					`${API_URL}/posts/search/items/Electronics?page=${housePage}&size=10`,
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${userData.accessToken}`,
						},
					}
				);

				if (!response.ok) {
					setProducts([]);
					setError(true);
					setLoading(false);
					throw new Error(`HTTP error! Status: ${response.status}`);
				}

				const data = await response.json();
				setProducts(data.message  );
				console.log("Filtered Category: ", data.message);

				// Check if the component is still mounted before updating state
				if (!mounted.current) {
					return;
				}

				setLoading(false);
			} catch (error) {
				setError(true);
				setProducts([]);
				console.log(error);
			}
		}
		if (id === 5) {
			try {
				const response = await fetch(
					`${API_URL}/posts/search/items/Amasampo?page=${housePage}&size=10`,
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${userData.accessToken}`,
						},
					}
				);

				if (!response.ok) {
					setProducts([]);
					setError(true);
					setLoading(false);
					throw new Error(`HTTP error! Status: ${response.status}`);
				}
				if (response.ok) {
					const data = await response.json();
					setProducts(data.message);
					console.log("Filtered Amasampo: ", data);
				}

				// Check if the component is still mounted before updating state
				if (!mounted.current) {
					return;
				}

				setLoading(false);
			} catch (error) {
				setError(true);
				setProducts([]);
				console.log(error);
			}
		}
		if (id === 6) {
			try {
				const response = await fetch(
					`${API_URL}/posts/search/items/Salaula?page=${housePage}&size=10`,
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${userData.accessToken}`,
						},
					}
				);

				if (!response.ok) {
					setProducts([]);
					setError(true);
					setLoading(false);
					throw new Error(`HTTP error! Status: ${response.status}`);
				}
				if (response.ok) {
					const data = await response.json();
					console.log("Filtered Salaula: ", data);
					setProducts(data.message);
				}

				// Check if the component is still mounted before updating state
				if (!mounted.current) {
					return;
				}
				// if (body.id === 1) {
				// 	setProducts(data.message);
				// } else {

				// }

				setLoading(false);
			} catch (error) {
				setError(true);
				setProducts([]);
				console.log(error);
			}
		}
		if (id !== 5 && id !== 6 && id !== 3) {
			
			
			try {
				
				const response = await fetch(
					`${API_URL}/posts/search/${id}?page=${housePage}&size=10`,
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${userData.accessToken}`,
						},
					}
				);

				if (!response.ok) {
					setProducts([]);
					setError(true);
					setLoading(false);
					throw new Error(`HTTP error! Status: ${response.status}`);
				}

				const data = await response.json();
				console.log("Filtered other category: ", data);

				// Check if the component is still mounted before updating state
				if (!mounted.current) {
					return;
				}
				
				if (body.id === 1) {
					setProducts(data.message);
				} else {
					setProducts(data.message);
				}

				setLoading(false);
			} catch (error) {
				setError(true);
				setProducts([]);
				console.log(error);
			}
		}
	};

	console.log('current num is', housePage)
	// console.log(userData);
	const handleKeyboardDismiss = () => {
		Keyboard.dismiss();
		setDynamicHeight(290); // Update height after dismissing keyboard
	};

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
		<TouchableWithoutFeedback onPress={handleKeyboardDismiss}>
			<SafeAreaView
				style={[styles.container, { width: width }]}
				onLayout={onLayoutRootView}>
				<StatusBar backgroundColor="#DE1738" style="light" />
				{/* Header Section */}

				<Animated.View
					entering={FadeInLeft}
					layout={Layout.duration(1000)}
					style={[styles.headerStyles, { paddingHorizontal: 20 }]}>
					<View style={{ flexDirection: "row", gap: 4 }}>
						<Image
							source={`${API_URL}/profile/download/${userData.id}`}
							cachePolicy={"none"}
							width={45}
							height={45}
							style={{ borderRadius: 45 }}
						/>

						<View style={{ flexBasis: width > 768 ? 600 : 230 }}>
							<Text
								style={{
									color: "white",
									fontSize: 14,

									lineHeight: 15.62,
									fontFamily: "DM-sans",
								}}>
								{userData?.username}
							</Text>
							<Text
								style={{
									color: "white",
									fontSize: 14,
									fontWeight: 400,
									lineHeight: 18.23,
									fontFamily: "DM-sans",
								}}>
								{userData?.email}
							</Text>
						</View>
					</View>

					<View
						style={{
							top: 5,
							left: 320,
							position: "absolute",
						}}>
						<Pressable
							style={{
								backgroundColor: "#FB6B82",
								height: 44,
								width: 44,
								borderRadius: 44,
								marginBottom: 55,
							}}
							onPress={handleInterestPress}>
							<EvilIcons
								style={{ textAlign: "center", paddingVertical: 10 }}
								name="heart"
								size={24}
								color="white"
							/>
						</Pressable>
					</View>
				</Animated.View>
				{/* section text */}

				<View style={[styles.section, { paddingLeft: 15, top: 15 }]}>
					{/* <ScrollView> */}
					<Text
						style={{
							color: "white",
							fontWeight: 500,
							fontSize: 16,
							lineHeight: 26,
							fontFamily: "DM-sans",
						}}>
						Hey {userData?.username}, {greeting}!{"  "}
						{greeting === "Good Evening" ? (
							<Ionicons name="cloudy-night-outline" size={24} color="white" />
						) : greeting === "Good Morning" ? (
							<Ionicons name="md-partly-sunny" size={24} color="white" />
						) : greeting === "Good Afternoon" ? (
							<Feather name="sun" size={24} color="white" />
						) : (
							""
						)}
					</Text>

					<Animated.View entering={FadeInUp} layout={Layout.duration(1000)}>
						<View
							style={{
								flexDirection: "row",
								justifyContent: "space-between",
								paddingRight: 20,
							}}>
							<Text
								style={{
									fontSize: 24,
									// fontWeight: 700,
									width: 240,
									lineHeight: 31.25,
									height: 62,
									color: "white",
									fontFamily: "DM-sans",
								}}>
								Find Amazing Products On KUGULA
							</Text>
						</View>

						<View
							style={{
								width: 350,
								top: 30,
								flexDirection: "row",
								gap: 4,
							}}>
							<TextInput
								onTouchStart={() => navigation.navigate("searchItems")}
								placeholder="Search Real estate, Cars or Electronics"
								style={[styles.search, { fontFamily: "DM-sans" }]}
							/>
						</View>

						{interestState ? (
							<Interests />
						) : (
							<FlatList
								data={tabs}
								horizontal={true}
								showsHorizontalScrollIndicator={false}
								style={{ top: 60, height: "100%", width: 350 }}
								keyExtractor={(item) => item?.id}
								extraData={activeTab}
								renderItem={({ item }) => (
									<TouchableOpacity
										key={item?.id}
										onPress={() => handleTabPress(item)}>
										<Animated.View
											entering={FadeIn}
											style={{
												color: activeTab === item?.id ? "white" : "white",
												textAlign: "center",
												alignItems: "center",
												backgroundColor:
													activeTab === item?.id ? "#FB6B82" : "transparent",
												// top: 20,
												height: 84,
												width: 84,
												borderRadius: 5,
												// paddingVertical: 5,
												marginHorizontal: 6,
											}}>
											<Image
												source={{ uri: `${item?.icon}` }}
												width={56}
												height={56}
												borderRadius={56}
											/>
											<Text style={{ color: "white", fontFamily: "DM-sans" }}>
												{item?.displayName}
											</Text>
											{/*  */}
										</Animated.View>
									</TouchableOpacity>
								)}
							/>
						)}
					</Animated.View>
				</View>

				<Animated.View
					layout={Layout.duration(800)}
					entering={FadeInUp}
					exiting={FadeOutDown}
					style={[styles.content, { height: expanded ? 1000 : dynamicHeight }]}>
					{/* Tab View */}
					<View
						style={[
							{
								paddingVertical: 20,
								paddingHorizontal: 15,
								flexDirection: "row",
								justifyContent: "space-between",
							},
						]}>
						<Text
							style={{
								color: "black",

								fontSize: 20,
								lineHeight: 22,
								fontFamily: "DM-sans",
							}}>
							{activeTab === 0 ? "Featured Products" : body.displayName}
						</Text>
						{/* Filter components/ buttons */}
						<View style={{ flexDirection: "row", columnGap: 10 }}>
							<Ionicons
								onPress={openBottomSheet}
								name="filter-outline"
								size={24}
								color="black"
							/>
							<Octicons name="sort-desc" size={24} color="black" />
							{expanded ? (
								<MaterialIcons
									onPress={handleExpanded}
									name="fullscreen-exit"
									size={24}
									color="black"
								/>
							) : (
								<MaterialIcons
									onPress={handleExpanded}
									name="fullscreen"
									size={24}
									color="black"
								/>
							)}
						</View>
					</View>
					{loading ? (
						<ActivityIndicator animating={true} color={"#DE1738"} />
					) : (
						<FlatList
							showsVerticalScrollIndicator={false}
							onRefresh={handleRefreshing}
							refreshing={refreshing}
							numColumns={2}
							removeClippedSubviews={true}
							contentContainerStyle={{
								rowGap: 10,
								width: "100%",
								justifyContent: "space-between",
								paddingHorizontal: 15,
								paddingBottom: expanded ? 500 : 50,
							}}
							ListFooterComponent={
								<View style={{paddingVertical:10}}>
										{/* button */}
										{
										 products.length > 0 &&(
											<Pressable style={{flexDirection:'row',justifyContent:"center", alignItems:'center',alignContent:"center"}} onPress={()=>handlePaginationFetch(body.id)}><Text style={{  textAlign:'center',fontFamily: "DM-sans",color:'black' }}>Click To Load New Posts</Text></Pressable>
										)
										}
									</View>
							}
							data={products}
							ListEmptyComponent={
								<View>
									<Text style={{ textAlign: "center", fontFamily: "DM-sans" }}>
									No Data for category {body.name}
								</Text>
								<View style={{flexDirection:'row', justifyContent:"center", paddingVertical:10}}>
									<Pressable style={{backgroundColor:'#DE1738', padding:2, width:100, height:30, borderRadius:5, flexDirection:"row", alignItems:"center", justifyContent:"center"}} onPress={()=>handleReload(Number(body.id))}>
									<Text style={{ textAlign: "center", fontFamily: "DM-sans", textDecorationStyle:'dashed', color:"white" }}>Reload</Text>
								</Pressable>
								</View>
								
								</View>
								
							}
							
							
							keyExtractor={(item) => item?.description?.toString()}
							renderItem={({ item, index}) => {
								return (
									<View>
									<View
										style={{
											justifyContent: "space-between",
											flexDirection: "row",
											paddingHorizontal: 15,
										}}>
										<Card style={styles.card} key={item?.id}>
											<TouchableOpacity
												onPress={() =>
													navigation.navigate("details", { item })
												}>
												<Card.Cover
													style={{ height: 100 }}
													// source={{
													// 	uri:
													// 		item.url === null || undefined
													// 			? "https://source.unsplash.com/210x222/"
													// 			: item.url,
													// }}
													// source={{
													// 	uri: `https://source.unsplash.com/210x222/?${item.id}`,
													// }}
													source={{
														uri: `${API_URL}/file/${item?.urls[0]}`,
													}}
												/>
											</TouchableOpacity>

											{activeTab !== 0 ? (
												<View style={{}}>
													{/* <Card.Title title={body.category} /> */}

													<Card.Content
														style={{
															height: "auto",
															flexDirection: "column",
															gap: 10,
														}}>
														<Text
															style={{
																color: "#32343E",
																fontFamily: "DM-sans",
																fontSize: 15,
																textTransform: "capitalize",
															}}>
															{item?.title}
														</Text>

														{item?.posttype?.posttype === 2 ? (
															""
														) : (
															<View
																style={{
																	flexDirection: "row",
																	gap: 20,
																}}>
																<Text
																	style={{
																		color: "#F3A845",
																		fontFamily: "DM-sans",
																	}}>
																	<AntDesign name="star" size={14} />
																	4.8
																</Text>
																<Text style={{ fontFamily: "DM-sans" }}>
																	K{item?.formattedPrice}
																</Text>
															</View>
														)}
														{/* </View> */}
													</Card.Content>
													
												</View>
											) : (
												<View>
													<Card.Content style={{ height: "auto" }}>
														<Text
															style={{
																color: "#32343E",
																fontFamily: "DM-sans",
																fontSize: 15,
																textTransform: "capitalize",
															}}>
															{item?.title}
														</Text>

														<View
															style={{
																flexDirection: "row",
																justifyContent: "space-between",
															}}>
															<Text
																style={{
																	color: "#F3A845",
																	fontFamily: "DM-sans",
																}}>
																<AntDesign name="star" size={14} />
																4.8
															</Text>
															<Text style={{ fontFamily: "DM-sans" }}>
																K{item?.formattedPrice}
															</Text>
														</View>
													</Card.Content>
												</View>
											)}
											<Card.Actions style={{ paddingBottom: 30 }}>
												<View
													style={{
														flexDirection: "row",
														justifyContent: "space-between",
														width: "100%",
													}}>
													<Pressable
														style={{
															flexDirection: "row",
															position: "relative",
															top: 15,
															paddingHorizontal: 12,
															gap: 5,
														}}>
														<Text>
															<AntDesign
																name="like1"
																size={18}
																color="#DE1738"
															/>
														</Text>
														<Text style={{ fontFamily: "DM-sans" }}>
															{item?.likes}
														</Text>
													</Pressable>
													<Pressable
														style={{
															flexDirection: "row",
															position: "relative",
															top: 15,
															paddingHorizontal: 12,
															gap: 5,
														}}>
														<Text>
															<AntDesign
																name="eyeo"
																size={18}
																color="#DE1738"
															/>
														</Text>
														<Text style={{ fontFamily: "DM-sans" }}>
															{item?.views}
														</Text>
													</Pressable>
												</View>
											</Card.Actions>
										</Card>
										
									</View>
									
									</View>
								);
							}}
						/>
					)}
					<Animated.View
						{...panResponder.panHandlers}
						style={[
							styles.bottomSheet,
							{ zIndex: 20 },
							{ transform: [{ translateY }] },
						]}>
						<View
							style={{ flexDirection: "row", justifyContent: "space-between" }}>
							<TouchableOpacity
								style={{ flexDirection: "row" }}
								onPress={closeBottomSheet}>
								<MaterialIcons name="arrow-back-ios" size={18} />
							</TouchableOpacity>
							<Text
								style={{
									fontFamily: "DM-sans",
									fontSize: 20,
									color: "#2F2F2F",
								}}>
								Filter By
							</Text>
							<View style={{ width: 50, paddingRight: 10 }}>
								<Button
									onPress={fetchFilteredPrice}
									buttonColor="#DE1738"
									textColor="white">
									<Text
										style={{
											fontFamily: "DM-sans",
											textTransform: "capitalize",
										}}>
										filter
									</Text>
								</Button>
							</View>
						</View>

						{/* Content of the Bottom Sheet */}
						<View style={styles.contentSheet}>
							{/* Brand Filter Section */}
							<View style={{ paddingVertical: 15 }}>
								<Text style={{ fontFamily: "DM-sans", fontSize: 20 }}>
									Brand
								</Text>
								<View
									style={{
										flexDirection: "row",
										justifyContent: "space-around",
									}}>
									<Pressable
										style={{
											backgroundColor: "#EFF1F5",
											padding: 10,
											borderRadius: 16,
										}}>
										<Text style={{ fontFamily: "DM-sans" }}>Zara</Text>
									</Pressable>
									<Pressable
										style={{
											backgroundColor: "#EFF1F5",
											padding: 10,
											borderRadius: 16,
										}}>
										<Text style={{ fontFamily: "DM-sans" }}>ELO</Text>
									</Pressable>
									<Pressable
										style={{
											backgroundColor: "#EFF1F5",
											padding: 10,
											borderRadius: 16,
										}}>
										<Text style={{ fontFamily: "DM-sans" }}>Fitters</Text>
									</Pressable>
									<Pressable
										style={{
											backgroundColor: "#EFF1F5",
											padding: 10,
											borderRadius: 16,
										}}>
										<Text style={{ fontFamily: "DM-sans" }}>Cleo</Text>
									</Pressable>
								</View>
							</View>

							{/* Size Filter Content */}
							<View style={{ paddingVertical: 2 }}>
								<Text style={{ fontFamily: "DM-sans", fontSize: 20 }}>
									Size
								</Text>
								<View
									style={{ flexDirection: "row", justifyContent: "center" }}>
									<Button
										buttonColor={active === 1 ? "#FFBB5C" : "white"}
										onPress={() => handleActiveTab(1)}
										textColor={active === 1 ? "white" : "#989EAE"}>
										<Text style={{ fontFamily: "DM-sans" }}>S</Text>
									</Button>
									<Button
										buttonColor={active === 2 ? "#FFBB5C" : "white"}
										onPress={() => handleActiveTab(2)}
										textColor={active === 2 ? "white" : "#989EAE"}>
										<Text style={{ fontFamily: "DM-sans" }}>M</Text>
									</Button>
									<Button
										buttonColor={active === 3 ? "#FFBB5C" : "white"}
										onPress={() => handleActiveTab(3)}
										textColor={active === 3 ? "white" : "#989EAE"}>
										<Text style={{ fontFamily: "DM-sans" }}>L</Text>
									</Button>
									<Button
										buttonColor={active === 4 ? "#FFBB5C" : "white"}
										onPress={() => handleActiveTab(4)}
										textColor={active === 4 ? "white" : "#989EAE"}>
										<Text style={{ fontFamily: "DM-sans" }}>XL</Text>
									</Button>
								</View>
							</View>
							{/* Color filter content */}
							<View style={{ paddingVertical: 2 }}>
								<Text style={{ fontFamily: "DM-sans", fontSize: 20 }}>
									Colors
								</Text>

								<FlatList
									data={colors}
									horizontal
									contentContainerStyle={{ paddingHorizontal: 10, gap: 15 }}
									renderItem={({ item }) => (
										<View key={item.id}>
											<Pressable
												style={{
													backgroundColor: item.color,
													padding: 14,
													borderRadius: 16,
												}}></Pressable>
										</View>
									)}
								/>
							</View>

							<View style={{ paddingBottom: 20 }}>
								<Text style={{ fontFamily: "DM-sans", fontSize: 20 }}>
									Price K0-K{sliderValue}
								</Text>
								<View
									style={{
										flexDirection: "row",
										justifyContent: "space-around",
									}}>
									<Slider
										onValueChange={(val) => setSliderValue(val)}
										style={{ width: 200, height: 40 }}
										minimumValue={0}
										maximumValue={1000}
										thumbTintColor="#DE1738"
										minimumTrackTintColor="#DE1738"
										maximumTrackTintColor="#DE1738"
									/>
								</View>
							</View>
						</View>
					</Animated.View>
				</Animated.View>
			</SafeAreaView>
		</TouchableWithoutFeedback>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#DE1738",
	},
	content: {
		backgroundColor: "white",
		borderTopStartRadius: 25,
		borderTopEndRadius: 25,
		zIndex: 10,
	},
	headerStyles: {
		flexDirection: "row",
		// left: 24,
		top: 44,
		paddingBottom: 50,
		paddingLeft: 15,
		justifyContent: "space-between",
	},
	section: {
		flex: 2,
		height: "100%",
	},
	search: {
		borderWidth: 1,
		borderColor: "white",
		paddingVertical: 8,
		backgroundColor: "white",
		borderRadius: 10,
		width: 315,
		paddingLeft: 40,
		// position: "absolute",
	},
	tabButton: {
		width: 56,
		height: 56,
		borderRadius: 56,
	},
	card: {
		// elevation: 2,
		height: "auto",
		width: 147,
		borderRadius: 10,
		backgroundColor: "white",
		paddingHorizontal: 2,
		flexDirection: "column",
		gap: 0,
	},
	seperator: {
		width: 20,
	},

	containerModal: {
		flex: 3,
		padding: 24,
		justifyContent: "center",
		backgroundColor: "gray",
	},
	contentContainer: {
		flex: 3,
		alignItems: "center",
		backgroundColor: "red",
	},
	modal: {
		backgroundColor: "white",
		borderTopLeftRadius: 15,
		borderTopRightRadius: 15,
		zIndex: 50,
	},
	containerSheet: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	bottomSheet: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		height: 350,
		backgroundColor: "white",
		borderTopLeftRadius: 25,
		borderTopRightRadius: 25,
		padding: 16,
		justifyContent: "space-between",
	},
	contentSheet: {},
});
