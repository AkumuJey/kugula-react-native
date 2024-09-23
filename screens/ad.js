import React, { useContext, useRef } from "react";
import {
	Text,
	View,
	StyleSheet,
	ScrollView,
	Pressable,
	Image,
	Alert,
	TouchableOpacity,
	Modal,
	useWindowDimensions,
} from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useState, useCallback } from "react";
import Animated, { FadeInUp, Layout } from "react-native-reanimated";
import { StatusBar } from "expo-status-bar";
import { Fontisto, Ionicons } from "@expo/vector-icons";
import {
	ActivityIndicator,
	Button,
	Checkbox,
	List,
	TextInput,
} from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { Video, ResizeMode } from "expo-av";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";
import { userContext } from "../Context/context";
import { EvilIcons } from "@expo/vector-icons";
import { provinces } from "../static/cities";
import { Bodies } from "../static/carBodies";
export default function AdScreen({ navigation }) {
	const [expanded, setExpanded] = React.useState(false);
	const [image0, setImage0] = useState(null);
	const [image1, setImage1] = useState(null);
	const [image2, setImage2] = useState(null);
	const [image3, setImage3] = useState(null);
	const [video, setVideo] = useState(null);
	const vid = React.useRef(null);
	const [date, setDate] = useState(new Date());
	const [date0, setDate0] = useState(new Date());
	const [mode, setMode] = useState("date");
	const [show, setShow] = useState(false);
	const [mode0, setMode0] = useState("date");
	const [show0, setShow0] = useState(false);
	const [description, setDescription] = useState("");
	const [adName, setAdName] = useState("");
	const [error, setError] = useState(false);
	const { userData } = useContext(userContext);
	const [model, setModel] = useState("");
	const [chassis, setChassis] = useState("");
	const [code, setCode] = useState(0);
	const [formData, setFormData] = useState(null);
	const [mileage, setMileage] = useState("");
	const [price, setPrice] = useState("");
	const [company, setCompany] = useState("");
	const [city, setCity] = useState("Choose below...");
	const [propertyType, setPropertyType] = useState(0);
	const [amenities, setAmenities] = useState("");
	const [bedrooms, setBedrooms] = useState("");
	const [address, setAddress] = useState("");
	const [loading, setLoading] = useState(false);
	const [modalVisible, setModalVisible] = useState(false);
	const height = useWindowDimensions().height;
	const [imageUrl, setImageUrl] = useState("");
	const [checkedCommercial, setCheckedCommercial] = useState(false);
	// const [selectionCategory, setSelectionCategory] = useState("");
	const [purpose, setPurpose] = useState(0);
	const [checkedSell, setCheckedSell] = useState(false);
	const [checkedRent, setCheckedRent] = useState(false);
	const [checkedResidential, setCheckedResidential] = useState(false);
	const [gearbox, setGearBox] = useState("");
	const [make, setMake] = useState("");
	const [modelyear, setModelYear] = useState("");
	const [bodytype, setBodyType] = useState("Choose below...");
	const [currency, setCurrency] = useState("");
	const [colour, setColour] = useState("");
	const [isExpanded, setIsExpanded] = useState(false);
	const [isExpandedPurpose, setIsExpandedPurpose] = useState(false);
	const [category, setCategory] = useState("");
	const [quantity, setQuantity] = useState("");
	const [condition, setCondition] = useState("");
	const [postImage0, setPostImage0] = useState(null);
	const [url, setUrl] = useState();
	const [gearCode, setGearCode] = useState(0);
	const [conditionExpanded, setConditionExpanded] = useState(false);
	const [cityExpanded, setCityExpanded] = useState(false);
	const [bodyTypeExpanded, setBodyTypeExpanded] = useState(false);
	const containerStyle = { backgroundColor: "white", padding: 20 };
	const onChange = (event, selectedDate) => {
		const currentDate = selectedDate;
		setShow(false);
		setDate(currentDate);
	};

	const showMode = (currentMode) => {
		setShow(true);
		setMode(currentMode);
	};

	const showDatepicker = () => {
		showMode("date");
	};

	const onChange0 = (event, selectedDate) => {
		const currentDate = selectedDate;
		setShow0(false);
		setDate0(currentDate);
	};

	const showMode0 = (currentMode) => {
		setShow0(true);
		setMode0(currentMode);
	};

	const showDatePicker0 = () => {
		showMode0("date");
	};

	const pickImage0 = async () => {
		// No permissions request is necessary for launching the image library
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});
		if (!result.canceled) {
			setPostImage0(result.assets[0]);
			console.log(result.assets[0]);
			setImage0(result.assets[0].uri);
		}
	};
	const pickImage1 = async () => {
		// No permissions request is necessary for launching the image library
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});
		if (!result.canceled) {
			setImage1(result.assets[0].uri);
		}
	};
	const pickImage2 = async () => {
		// No permissions request is necessary for launching the image library
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});
		if (!result.canceled) {
			setImage2(result.assets[0].uri);
		}
	};

	const pickImage3 = async () => {
		// No permissions request is necessary for launching the image library
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});
		if (!result.canceled) {
			setImage3(result.assets[0].uri);
		}
	};
	const pickVideo = async () => {
		// No permissions request is necessary for launching the image library
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Videos,
			allowsEditing: true,
			quality: 1,
		});
		if (!result.canceled) {
			setVideo(result.assets[0].uri);
		}
	};
	const imageData = new FormData();
	imageData.append("files", {
		uri: image0,
		type: "image/png",
		name: "file.png",
	});
	imageData.append("files", {
		uri: image1,
		type: "image/png",
		name: "file.png",
	});
	imageData.append("files", {
		uri: image2,
		type: "image/png",
		name: "file.png",
	});
	imageData.append("files", {
		uri: image3,
		type: "image/png",
		name: "file.png",
	});
	const handleImageUpload = async (id) => {
		if (image0 || image1 || image2 || image3) {
			try {
				// Upload image and get URL
				console.log("......uploading......");

				const uploadResponse = await fetch(
					`http://137.184.237.55:8080/kugula/upload/${id}`,
					{
						method: "POST",
						headers: {
							Authorization: `Bearer ${userData.accessToken}`,
						},
						body: imageData,
					}
				);

				if (uploadResponse.ok) {
					const uploadData = await uploadResponse.json();
					console.log("Upload successful:", uploadData);

					// Fetch uploaded images
					const imageResponse = await fetch(
						`http://137.184.237.55:8080/kugula/files/${id}`,
						{
							method: "GET",
							headers: {
								Authorization: `Bearer ${userData.accessToken}`,
							},
						}
					);

					if (imageResponse.ok) {
						const imageData = await imageResponse.json();
						console.log("Image data:", imageData);
					}
					if (!imageResponse.ok) {
						const imageData = await imageResponse.json();
						console.log("Image data:", imageData);
					}
				}
				if (!uploadResponse.ok) {
					const data = await uploadResponse.json();
					console.log(data);
					Alert.alert(
						"An Error occurred",
						"An Error Occured while uploading image, try again"
					);
					return;
				}
			} catch (error) {
				console.error("An unexpected error occurred:", error);
			}
		} else {
			// Show a message
			Alert.alert("Please pick an image first.");
		}
	};

	const handlePress = () => setExpanded(!expanded);

	const handlePressCondition = () => setConditionExpanded(!conditionExpanded);

	const [fontsLoaded] = useFonts({
		Nunito: require("../assets/fonts/NunitoSans_7pt-Regular.ttf"),
	});

	const setForm = async () => {};

	const formSubmit = async () => {
		setLoading(true);
		await setForm();

		console.log("starting");
		// Append each image or video file

		try {
			// Check if the image uri exists
			if (code === 2) {
				//jobs
				await axios
					.post(
						`http://137.184.237.55:8080/kugula/posts/add`,
						{
							userid: userData.id,
							listingstatusid: 1,
							listingid: null,
							startdate: date,
							enddate: date0,
							categoryid: code,
							title: adName,
							description: description,
							company: company,
						},
						{
							headers: {
								"Content-Type": "application/json",
								Authorization: `Bearer ${userData.accessToken}`,
							},
						}
					)
					.then((res) => {
						const { Postid } = res.data;
						console.log(Postid);
						console.log(res.data);
						Alert.alert("Post uploaded successfully.");
						setLoading(false);
						setAdName("");
						setCompany("");
						setDescription("");
						navigation.navigate("Home");
					})
					.catch((err) => {
						console.log("Error Occured is: ", err);
						setLoading(false);
						setFormData(null);
					});
			} else {
				if (code === 1) {
					//real estate data
					await axios
						.post(
							`http://137.184.237.55:8080/kugula/posts/add`,
							{
								title: adName,
								userid: userData.id,
								listingstatusid: 1,
								listingid: null,
								startdate: date,
								enddate: date0,
								categoryid: code,
								address: address,
								price: price,
								description: description,
								bedrooms: bedrooms,
								amenities: amenities,
								propertyType: propertyType,
								leasetype: purpose,
								longitude: "",
								latitude: "",
								city: city,
								url: url,
							},
							{
								headers: {
									"Content-Type": "application/json",
									Authorization: `Bearer ${userData.accessToken}`,
								},
							}
						)
						.then(async (res) => {
							console.log(res.data);
							const { postid } = res.data.message;
							console.log(postid);
							await handleImageUpload(postid);
							Alert.alert("Post uploaded successfully.");
							setLoading(false);
							setAdName("");
							setAddress("");
							setPrice("");
							setDescription("");
							setBedrooms("");
							setAmenities("");
							setPropertyType("");
							setCity("");
							setImage0(null);
							setImage1(null);
							setImage2(null);
							setImage3(null);
							navigation.navigate("Home");
						})
						.catch((err) => {
							console.log("Error Occured is: ", err);
							setLoading(false);
							setFormData(null);
						});
				} else if (code === 4) {
					await axios
						.post(
							`http://137.184.237.55:8080/kugula/posts/add`,
							{
								userid: userData.id,
								listingstatusid: 1,
								listingid: null,
								startdate: date,
								enddate: date0,
								categoryid: code,
								vehiclelistingsid: null,
								title: adName,
								make: make,
								bodytype: bodytype,
								gearbox: gearbox,
								model: model,
								modelyear: Number(modelyear),
								currency: currency,
								colour: colour,
								chassis: chassis,
								mileage: Number(mileage),
								price: Number(price),
								description: description,
								city: city,
								// url: url,
							},
							{
								headers: {
									"Content-Type": "application/json",
									Authorization: `Bearer ${userData.accessToken}`,
								},
							}
						)
						.then(async (res) => {
							console.log(res.data);
							const { postid } = res.data.message;
							console.log(postid);
							await handleImageUpload(postid);
							Alert.alert("Post uploaded successfully.");
							setLoading(false);
							setFormData(null);
							setAdName("");
							setAddress("");
							setPrice("");
							setDescription("");
							setImage0(null);

							setImage1(null);
							setImage2(null);
							setImage3(null);
							setChassis("");
							setMileage("");
							setModel("");
							navigation.navigate("Home");
						})
						.catch((err) => {
							console.log("Error Occured is: ", err);
							Alert.alert("An Error Occured While Uploading");
							setLoading(false);
							setFormData(null);
						});
					//vehicle
				} else if (code === 3) {
					await axios
						.post(
							"http://137.184.237.55:8080/kugula/posts/add",
							{
								userid: userData.id,
								listingstatusid: 1,
								listingid: null,
								startdate: date,
								enddate: date0,
								categoryid: code,
								title: adName,
								description: description,
								price: Number(price),
								itemCondition: condition,
								itemCategory: category,
								availability: 1,
								city: city,
								quantity: Number(quantity),
							},
							{
								headers: {
									"Content-Type": "application/json",
									Authorization: `Bearer ${userData.accessToken}`,
								},
							}
						)
						.then(async (res) => {
							console.log(res.data);
							const { postid } = res.data.message;
							console.log(postid);
							await handleImageUpload(postid);
							Alert.alert("Post uploaded successfully.");
							setLoading(false);
							setFormData(null);
							setAdName("");
							setAddress("");
							setPrice("");
							setDescription("");

							setImage0(null);
							setImage1(null);
							setImage2(null);
							setImage3(null);
							setCondition("");
							setQuantity("");
							setCategory("");
							navigation.navigate("Home");
						})
						.catch((err) => {
							console.log("Error Occured is: ", err);
							Alert.alert("An Error Occured While Uploading");
							setLoading(false);
							setFormData(null);
						});
				}
			}
		} catch (error) {
			// Handle the error
			console.error("Error:", error);
			Alert.alert("Something went wrong. Please try again.");
		}
	};

	const handleRealEstatePress = () => {
		setCode(1);
		setExpanded(false);
	};
	const handleJobsPress = () => {
		setCode(2);
		setExpanded(false);
	};

	const handleVehiclesPress = () => {
		setCode(4);
		setExpanded(false);
	};

	const handleModalVisible = (image) => {
		setModalVisible(true);
		setImageUrl(image);
	};
	const handlePropertyType = (type) => {
		if (type === "Residential") {
			setCheckedResidential(true);
			setCheckedCommercial(false);
			setPropertyType(1);
			setIsExpanded(false);
		}
		if (type === "Commercial") {
			setCheckedCommercial(true);
			setCheckedResidential(false);
			setPropertyType(2);
			setIsExpanded(false);
		}
		// setChecked(!checked);
	};

	const handleExpandend = () => {
		setIsExpanded(true);
	};

	const handlePurpose = (type) => {
		if (type === "sell") {
			setCheckedSell(true);
			setCheckedRent(false);
			setPurpose(1);
			setIsExpandedPurpose(false);
		}
		if (type === "rent") {
			setCheckedRent(true);
			setCheckedSell(false);
			setPurpose(2);
			setIsExpandedPurpose(false);
		}
		// setChecked(!checked);
	};

	const handleItemsPress = (name) => {
		if (name === "Salaula") {
			setCode(3);
			setExpanded(false);
			setCategory("Salaula");
		}
		if (name === "Amasampo") {
			setExpanded(false);
			setCode(3);
			setCategory("Amasampo");
		}
		if (name === "Electronics") {
			setExpanded(false);
			setCode(3);
			setCategory("Electronics");
		}
	};

	const handleGearBox = (name) => {
		if (name === "Manual") {
			setExpanded(false);
			setGearCode(1);
			setGearBox("Salaula");
		}
		if (name === "Automatic") {
			setExpanded(false);
			setGearCode(2);
			setCategory("Automatic");
		}
	};
	const handleCurrency = (name) => {
		if (name === "Kwacha") {
			setExpanded(false);

			setCurrency("Kwacha");
		}
		if (name === "Dollar") {
			setExpanded(false);

			setCurrency("Dollar");
		}
		if (name === "Pound") {
			setExpanded(false);

			setCurrency("Pound");
		}
		if (name === "Rand") {
			setExpanded(false);

			setCurrency("Rand");
		}
	};

	const handleExpandendPurpose = () => {
		setIsExpandedPurpose(true);
	};

	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded) {
			await SplashScreen.hideAsync();
		}
	}, [fontsLoaded]);

	if (!fontsLoaded) {
		return null;
	}
	if (error) {
		Alert.alert(
			"All Fields are Required",
			"Please Add at least 1 image or video",
			[
				{
					text: "Okay",
					onPress: () => setError(false),
				},
			]
		);
	}

	return (
		<Animated.View
			layout={Layout.duration(1000)}
			entering={FadeInUp}
			style={styles.container}
			onLayout={onLayoutRootView}>
			{/* Header */}
			<View style={styles.header}>
				<Ionicons
					name="chevron-back-outline"
					onPress={() => navigation.navigate("Home")}
					size={24}
					color="#DE1738"
					style={styles.icon}
				/>
				<Text style={[styles.title, { fontFamily: "Nunito" }]}>Post Ad</Text>
			</View>

			<StatusBar backgroundColor="#DE1738" style="light" />

			<View style={styles.content}>
				<ScrollView showsVerticalScrollIndicator={false}>
					<View>
						<Text
							style={{
								fontSize: 16,
								letterSpacing: -0.24,
								lineHeight: 27.28,
								fontFamily: "Nunito",
								color: "black",
							}}>
							Ad Name
						</Text>
						<TextInput
							maxLength={15}
							value={adName}
							onChangeText={(val) => setAdName(val)}
							placeholder="Hyundai Kona"
							placeholderTextColor={"#C4C4C4"}
							style={[styles.input, { fontFamily: "Nunito" }]}
							mode="outlined"
							outlineColor="#E6E6E6"
							outlineStyle={{ borderColor: "#E6E6E6", borderRadius: 15 }}
							cursorColor="#DE1738"
						/>
						<Text
							style={{
								fontSize: 14,
								letterSpacing: -0.24,
								lineHeight: 50,
								fontFamily: "Nunito",
								color: "black",
							}}>
							Description
						</Text>
						<TextInput
							value={description}
							onChangeText={(val) => setDescription(val)}
							multiline
							mode="outlined"
							outlineColor="#E6E6E6"
							outlineStyle={{ borderColor: "#E6E6E6", borderRadius: 10 }}
							cursorColor="#DE1738"
							style={{ backgroundColor: "#FBFBFB", paddingTop: 10 }}
						/>
						<View>
							<Text
								style={{
									fontSize: 14,
									letterSpacing: -0.24,
									lineHeight: 50,
									fontFamily: "Nunito",
									color: "black",
								}}>
								Select category
							</Text>
							<List.Section style={{ bottom: 8 }}>
								<List.Accordion
									style={styles.dropDown}
									title={
										code === 0
											? "Choose.."
											: code === 1
											? "Real Estate"
											: code === 2
											? "Jobs"
											: code === 4
											? "Vehicle"
											: category === "Salaula"
											? "Salaula"
											: category === "Amasampo"
											? "Amasampo"
											: category === "Electronics"
											? "Electronics"
											: ""
									}
									expanded={expanded}
									titleStyle={{ fontFamily: "Nunito", color: "black" }}
									onPress={handlePress}>
									<ScrollView
										showsVerticalScrollIndicator={false}
										style={{
											height: 300,
											elevation: 2,
											backgroundColor: "#FBFBFB",
											borderRadius: 10,
											marginTop: 10,
										}}>
										<List.Item
											onPress={() => handleItemsPress("Salaula")}
											title="Salaula"
											titleStyle={{ fontFamily: "Nunito", color: "black" }}
										/>
										<List.Item
											onPress={() => handleItemsPress("Electronics")}
											title="Electronics"
											titleStyle={{ fontFamily: "Nunito", color: "black" }}
										/>
										<List.Item
											onPress={handleRealEstatePress}
											title="Real Estate"
											titleStyle={{ fontFamily: "Nunito", color: "black" }}
										/>
										<List.Item
											onPress={() => handleItemsPress("Amasampo")}
											title="Amasampo"
											titleStyle={{ fontFamily: "Nunito", color: "black" }}
										/>

										<List.Item
											onPress={handleJobsPress}
											title="Job Offer"
											titleStyle={{ fontFamily: "Nunito", color: "black" }}
										/>
										<List.Item
											title="Vehicle"
											onPress={handleVehiclesPress}
											titleStyle={{ fontFamily: "Nunito", color: "black" }}
										/>
									</ScrollView>
								</List.Accordion>
							</List.Section>
						</View>
						{/* Real Estate Component */}
						{code === 1 ? (
							<View>
								<Text
									style={{
										fontFamily: "Nunito",
										fontSize: 18,
										paddingBottom: 10,
									}}>
									Property Type
								</Text>
								<View style={{ flexDirection: "row" }}>
									<List.Section>
										<List.Accordion
											expanded={isExpanded}
											titleStyle={{ fontFamily: "Nunito" }}
											onPress={handleExpandend}
											title={
												propertyType === ""
													? "Choose Type.."
													: propertyType === 1
													? " Residential"
													: propertyType === 2
													? "Commercial"
													: "Choose Type..."
											}
											style={[styles.dropDown, { width: 340 }]}>
											<List.Item
												onPress={() => handlePropertyType("Commercial")}
												title="Commercial"
												titleStyle={{ fontFamily: "Nunito" }}
											/>
											<List.Item
												onPress={() => handlePropertyType("Residential")}
												title="Residential"
												titleStyle={{ fontFamily: "Nunito" }}
											/>
										</List.Accordion>
									</List.Section>
								</View>
								<View>
									<Text style={{ fontFamily: "Nunito", fontSize: 18 }}>
										Purpose
									</Text>

									<List.Section>
										<List.Accordion
											expanded={isExpandedPurpose}
											titleStyle={{ fontFamily: "Nunito" }}
											onPress={handleExpandendPurpose}
											title={
												purpose === 0
													? "Choose Purpose.."
													: purpose === 1
													? " Sell"
													: purpose === 2
													? "Rent"
													: "Choose Purpose..."
											}
											style={[styles.dropDown, { width: 340 }]}>
											<List.Item
												onPress={() => handlePurpose("sell")}
												title="Sell"
												titleStyle={{ fontFamily: "Nunito" }}
											/>
											<List.Item
												onPress={() => handlePurpose("rent")}
												title="Rent"
												titleStyle={{ fontFamily: "Nunito" }}
											/>
										</List.Accordion>
									</List.Section>
								</View>

								<Text
									style={{
										fontSize: 16,
										letterSpacing: -0.24,
										lineHeight: 27.28,
										fontFamily: "Nunito",
										color: "black",
									}}>
									Amenities
								</Text>
								<TextInput
									value={amenities}
									onChangeText={(val) => setAmenities(val)}
									placeholder="e.g swimming pool"
									placeholderTextColor={"#C4C4C4"}
									style={[styles.input, { fontFamily: "Nunito" }]}
									mode="outlined"
									outlineColor="#E6E6E6"
									outlineStyle={{ borderColor: "#E6E6E6", borderRadius: 15 }}
									cursorColor="#DE1738"
								/>
								<Text
									style={{
										fontSize: 16,
										letterSpacing: -0.24,
										lineHeight: 27.28,
										fontFamily: "Nunito",
										color: "black",
									}}>
									Address
								</Text>
								<TextInput
									value={address}
									onChangeText={(val) => setAddress(val)}
									placeholder="e.g 123 Chibwe street"
									placeholderTextColor={"#C4C4C4"}
									style={[styles.input, { fontFamily: "Nunito" }]}
									mode="outlined"
									outlineColor="#E6E6E6"
									outlineStyle={{ borderColor: "#E6E6E6", borderRadius: 15 }}
									cursorColor="#DE1738"
								/>
								<Text
									style={{
										fontSize: 16,
										letterSpacing: -0.24,
										lineHeight: 27.28,
										fontFamily: "Nunito",
										color: "black",
									}}>
									City
								</Text>
								<List.Section>
									<List.Accordion
										expanded={cityExpanded}
										onPress={() => setCityExpanded(!cityExpanded)}
										title={city}
										style={[styles.dropDown, { width: 340 }]}
										titleStyle={{ fontFamily: "Nunito", color: "black" }}>
										{provinces.map((province) => (
											<List.Item
												onPress={() => {
													setCity(province.name);
													setCityExpanded(!cityExpanded);
												}}
												style={{ color: "black" }}
												key={province.id}
												title={province.name}
												titleStyle={{ fontFamily: "Nunito" }}
											/>
										))}
									</List.Accordion>
								</List.Section>
								<Text
									style={{
										fontSize: 16,
										letterSpacing: -0.24,
										lineHeight: 27.28,
										fontFamily: "Nunito",
										color: "black",
									}}>
									Bedrooms
								</Text>
								<TextInput
									value={bedrooms}
									keyboardType="numeric"
									onChangeText={(val) => setBedrooms(val)}
									placeholder="e.g 3"
									placeholderTextColor={"#C4C4C4"}
									style={[styles.input, { fontFamily: "Nunito" }]}
									mode="outlined"
									outlineColor="#E6E6E6"
									outlineStyle={{ borderColor: "#E6E6E6", borderRadius: 15 }}
									cursorColor="#DE1738"
								/>
								<Text
									style={{
										fontSize: 16,
										letterSpacing: -0.24,
										lineHeight: 27.28,
										fontFamily: "Nunito",
										color: "black",
									}}>
									Price
								</Text>
								<TextInput
									value={price}
									keyboardType="numeric"
									onChangeText={(val) => setPrice(val)}
									placeholder="e.g 200"
									placeholderTextColor={"#C4C4C4"}
									style={[styles.input, { fontFamily: "Nunito" }]}
									mode="outlined"
									outlineColor="#E6E6E6"
									outlineStyle={{ borderColor: "#E6E6E6", borderRadius: 15 }}
									cursorColor="#DE1738"
								/>
							</View>
						) : code === 2 ? (
							<View>
								<Text
									style={{
										fontSize: 16,
										letterSpacing: -0.24,
										lineHeight: 27.28,
										fontFamily: "Nunito",
										color: "black",
									}}>
									Company
								</Text>
								<TextInput
									value={company}
									onChangeText={(val) => setCompany(val)}
									placeholder="e.g Chibolwa LTD"
									placeholderTextColor={"#C4C4C4"}
									style={[styles.input, { fontFamily: "Nunito" }]}
									mode="outlined"
									outlineColor="#E6E6E6"
									outlineStyle={{ borderColor: "#E6E6E6", borderRadius: 15 }}
									cursorColor="#DE1738"
								/>
							</View>
						) : code === 4 ? (
							<View>
								<Text
									style={{
										fontSize: 16,
										letterSpacing: -0.24,
										lineHeight: 27.28,
										fontFamily: "Nunito",
										color: "black",
									}}>
									Make
								</Text>
								<TextInput
									value={make}
									onChangeText={(val) => setMake(val)}
									placeholder="e.g Camry XLE"
									placeholderTextColor={"#C4C4C4"}
									style={[styles.input, { fontFamily: "Nunito" }]}
									mode="outlined"
									outlineColor="#E6E6E6"
									outlineStyle={{ borderColor: "#E6E6E6", borderRadius: 15 }}
									cursorColor="#DE1738"
								/>
								<Text
									style={{
										fontSize: 16,
										letterSpacing: -0.24,
										lineHeight: 27.28,
										fontFamily: "Nunito",
										color: "black",
									}}>
									Model
								</Text>
								<TextInput
									value={model}
									onChangeText={(val) => setModel(val)}
									placeholder="e.g Camry XLE"
									placeholderTextColor={"#C4C4C4"}
									style={[styles.input, { fontFamily: "Nunito" }]}
									mode="outlined"
									outlineColor="#E6E6E6"
									outlineStyle={{ borderColor: "#E6E6E6", borderRadius: 15 }}
									cursorColor="#DE1738"
								/>
								<Text
									style={{
										fontSize: 16,
										letterSpacing: -0.24,
										lineHeight: 27.28,
										fontFamily: "Nunito",
										color: "black",
									}}>
									Model Year
								</Text>
								<TextInput
									keyboardType="numeric"
									value={modelyear}
									onChangeText={(val) => setModelYear(val)}
									placeholder="e.g year of model"
									placeholderTextColor={"#C4C4C4"}
									style={[styles.input, { fontFamily: "Nunito" }]}
									mode="outlined"
									outlineColor="#E6E6E6"
									outlineStyle={{ borderColor: "#E6E6E6", borderRadius: 15 }}
									cursorColor="#DE1738"
								/>
								<Text
									style={{
										fontSize: 16,
										letterSpacing: -0.24,
										lineHeight: 27.28,
										fontFamily: "Nunito",
										color: "black",
									}}>
									Body Type
								</Text>

								<List.Section>
									<List.Accordion
										onPress={() => setBodyTypeExpanded(!bodyTypeExpanded)}
										style={styles.dropDown}
										titleStyle={{ fontFamily: "Nunito" }}
										title={bodytype}>
										{Bodies.map((body) => (
											<List.Item
												titleStyle={{ fontFamily: "Nunito" }}
												key={body.id}
												onPress={() => {
													setBodyType(body.name);
													setBodyTypeExpanded(!setBodyTypeExpanded);
												}}
												title={body.name}
											/>
										))}
									</List.Accordion>
								</List.Section>

								<Text
									style={{
										fontSize: 16,
										letterSpacing: -0.24,
										lineHeight: 27.28,
										fontFamily: "Nunito",
										color: "black",
									}}>
									Colour
								</Text>
								<TextInput
									value={colour}
									onChangeText={(val) => setColour(val)}
									placeholder="e.g Blue"
									placeholderTextColor={"#C4C4C4"}
									style={[styles.input, { fontFamily: "Nunito" }]}
									mode="outlined"
									outlineColor="#E6E6E6"
									outlineStyle={{ borderColor: "#E6E6E6", borderRadius: 15 }}
									cursorColor="#DE1738"
								/>
								<Text
									style={{
										fontSize: 16,
										letterSpacing: -0.24,
										lineHeight: 27.28,
										fontFamily: "Nunito",
										color: "black",
									}}>
									Chassis
								</Text>
								<TextInput
									value={chassis}
									onChangeText={(val) => setChassis(val)}
									placeholder="e.g JT12323232"
									placeholderTextColor={"#C4C4C4"}
									style={[styles.input, { fontFamily: "Nunito" }]}
									mode="outlined"
									outlineColor="#E6E6E6"
									outlineStyle={{ borderColor: "#E6E6E6", borderRadius: 15 }}
									cursorColor="#DE1738"
								/>
								<Text
									style={{
										fontSize: 16,
										letterSpacing: -0.24,
										lineHeight: 27.28,
										fontFamily: "Nunito",
										color: "black",
									}}>
									Gear Box
								</Text>

								<List.Section style={{ bottom: 8 }}>
									<List.Accordion
										style={styles.dropDown}
										expanded={expanded}
										title={
											gearCode === 0
												? "Select type"
												: gearCode === 1
												? "Manual"
												: gearCode === 2
												? "Automatic"
												: ""
										}
										titleStyle={{ fontFamily: "Nunito", color: "black" }}
										onPress={handlePress}>
										<List.Item
											onPress={() => handleGearBox("Manual")}
											title="Manual"
											titleStyle={{ fontFamily: "Nunito", color: "black" }}
										/>
										<List.Item
											onPress={() => handleGearBox("Automatic")}
											title="Automatic"
											titleStyle={{ fontFamily: "Nunito", color: "black" }}
										/>
									</List.Accordion>
								</List.Section>
								<Text
									style={{
										fontSize: 16,
										letterSpacing: -0.24,
										lineHeight: 27.28,
										fontFamily: "Nunito",
										color: "black",
									}}>
									Mileage
								</Text>
								<TextInput
									value={mileage}
									keyboardType="numeric"
									onChangeText={(val) => setMileage(val)}
									placeholder="e.g 2500"
									placeholderTextColor={"#C4C4C4"}
									style={[styles.input, { fontFamily: "Nunito" }]}
									mode="outlined"
									outlineColor="#E6E6E6"
									outlineStyle={{ borderColor: "#E6E6E6", borderRadius: 15 }}
									cursorColor="#DE1738"
								/>
								<Text
									style={{
										fontSize: 16,
										letterSpacing: -0.24,
										lineHeight: 27.28,
										fontFamily: "Nunito",
										color: "black",
									}}>
									Currency
								</Text>
								{/* <TextInput
									value={currency}
									onChangeText={(val) => setCurrency(val)}
									placeholder="e.g K, $"
									placeholderTextColor={"#C4C4C4"}
									style={[styles.input, { fontFamily: "Nunito" }]}
									mode="outlined"
									outlineColor="#E6E6E6"
									outlineStyle={{ borderColor: "#E6E6E6", borderRadius: 15 }}
									cursorColor="#DE1738"
								/> */}
								<List.Section style={{ bottom: 8 }}>
									<List.Accordion
										style={styles.dropDown}
										expanded={expanded}
										title={currency === "" ? "Select Currency" : currency}
										titleStyle={{ fontFamily: "Nunito", color: "black" }}
										onPress={handlePress}>
										<List.Item
											onPress={() => handleCurrency("Kwacha")}
											title="Kwacha"
											titleStyle={{ fontFamily: "Nunito", color: "black" }}
										/>
										<List.Item
											onPress={() => handleCurrency("Dollar")}
											title="Dollar"
											titleStyle={{ fontFamily: "Nunito", color: "black" }}
										/>
										<List.Item
											onPress={() => handleCurrency("Pound")}
											title="Pound"
											titleStyle={{ fontFamily: "Nunito", color: "black" }}
										/>
										<List.Item
											onPress={() => handleCurrency("Rand")}
											title="Rand"
											titleStyle={{ fontFamily: "Nunito", color: "black" }}
										/>
									</List.Accordion>
								</List.Section>

								<Text
									style={{
										fontSize: 16,
										letterSpacing: -0.24,
										lineHeight: 27.28,
										fontFamily: "Nunito",
										color: "black",
									}}>
									Price
								</Text>
								<TextInput
									value={price}
									keyboardType="numeric"
									onChangeText={(val) => setPrice(val)}
									placeholder="e.g 200"
									placeholderTextColor={"#C4C4C4"}
									style={[styles.input, { fontFamily: "Nunito" }]}
									mode="outlined"
									outlineColor="#E6E6E6"
									outlineStyle={{ borderColor: "#E6E6E6", borderRadius: 15 }}
									cursorColor="#DE1738"
								/>
								<Text
									style={{
										fontSize: 16,
										letterSpacing: -0.24,
										lineHeight: 27.28,
										fontFamily: "Nunito",
										color: "black",
									}}>
									City
								</Text>
								<List.Section>
									<List.Accordion
										expanded={cityExpanded}
										onPress={() => setCityExpanded(!cityExpanded)}
										title={city}
										style={[styles.dropDown, { width: 340 }]}
										titleStyle={{ fontFamily: "Nunito", color: "black" }}>
										{provinces.map((province) => (
											<List.Item
												onPress={() => {
													setCity(province.name);
													setCityExpanded(!cityExpanded);
												}}
												style={{ color: "black" }}
												key={province.id}
												title={province.name}
												titleStyle={{ fontFamily: "Nunito" }}
											/>
										))}
									</List.Accordion>
								</List.Section>
							</View>
						) : code === 3 ? (
							<View>
								<Text
									style={{
										fontSize: 16,
										letterSpacing: -0.24,
										lineHeight: 27.28,
										fontFamily: "Nunito",
										color: "black",
									}}>
									Condition
								</Text>
								{/* Condition Logic */}
								<List.Section style={{ bottom: 8 }}>
									<List.Accordion
										style={styles.dropDown}
										expanded={conditionExpanded}
										title={condition === "" ? "Select Condition" : condition}
										titleStyle={{ fontFamily: "Nunito", color: "black" }}
										onPress={handlePressCondition}>
										<List.Item
											onPress={() => {
												setCondition("new");
												setConditionExpanded(!conditionExpanded);
											}}
											title="New"
											titleStyle={{ fontFamily: "Nunito", color: "black" }}
										/>
										<List.Item
											onPress={() => {
												setCondition("used");
												setConditionExpanded(!conditionExpanded);
											}}
											title="Used"
											titleStyle={{ fontFamily: "Nunito", color: "black" }}
										/>
										<List.Item
											onPress={() => {
												setCondition("Old");
												setConditionExpanded(!conditionExpanded);
											}}
											title="Old"
											titleStyle={{ fontFamily: "Nunito", color: "black" }}
										/>
									</List.Accordion>
								</List.Section>
								{/* <TextInput
									value={condition}
									onChangeText={(val) => setCondition(val)}
									placeholder="e.g Good"
									placeholderTextColor={"#C4C4C4"}
									style={[styles.input, { fontFamily: "Nunito" }]}
									mode="outlined"
									outlineColor="#E6E6E6"
									outlineStyle={{ borderColor: "#E6E6E6", borderRadius: 15 }}
									cursorColor="#DE1738"
								/> */}
								<Text
									style={{
										fontSize: 16,
										letterSpacing: -0.24,
										lineHeight: 27.28,
										fontFamily: "Nunito",
										color: "black",
									}}>
									Quantity
								</Text>
								<TextInput
									value={quantity}
									keyboardType="numeric"
									onChangeText={(val) => setQuantity(val)}
									placeholder="e.g 400"
									placeholderTextColor={"#C4C4C4"}
									style={[styles.input, { fontFamily: "Nunito" }]}
									mode="outlined"
									outlineColor="#E6E6E6"
									outlineStyle={{ borderColor: "#E6E6E6", borderRadius: 15 }}
									cursorColor="#DE1738"
								/>
							</View>
						) : (
							""
						)}
					</View>
					{code !== 2 ? (
						<View>
							<Text
								style={{
									fontSize: 14,
									letterSpacing: -0.24,
									lineHeight: 50,
									fontFamily: "Nunito",
									color: "black",
								}}>
								Upload Photo/Video
							</Text>
							<Modal
								animationType="fade"
								visible={modalVisible}
								onRequestClose={() => {
									setModalVisible(!modalVisible);
								}}>
								<Pressable
									onPress={() => setModalVisible(false)}
									style={{ paddingHorizontal: 10, paddingVertical: 10 }}>
									<EvilIcons name="close" size={24} color="black" />
								</Pressable>
								<Image
									source={{ uri: imageUrl }}
									style={{
										height: height - 300,
										objectFit: "contain",
										marginVertical: 120,
										marginHorizontal: 10,
									}}
								/>
							</Modal>
							<View
								style={{
									flexDirection: "row",
									justifyContent: "center",
									alignItems: "center",
									flexWrap: "wrap",
									rowGap: 10,
								}}>
								<View style={styles.uploadBox}>
									{image0 ? (
										<TouchableOpacity
											onPress={() => handleModalVisible(image0)}>
											<Image
												source={{ uri: image0 }}
												style={styles.uploadBox}
											/>
										</TouchableOpacity>
									) : (
										<View style={styles.BoxContent}>
											<Ionicons
												name="images-outline"
												size={20}
												color={"#808080"}
											/>
											<Text style={{ fontFamily: "Nunito", color: "#808080" }}>
												Upload Image
											</Text>
											<Pressable onPress={pickImage0}>
												<Text style={{ fontFamily: "Nunito", color: "blue" }}>
													Browse
												</Text>
											</Pressable>
										</View>
									)}
								</View>

								<View style={{ padding: 10 }}></View>
								<View style={styles.uploadBox}>
									{image1 ? (
										<TouchableOpacity
											onPress={() => handleModalVisible(image1)}>
											<Image
												source={{ uri: image1 }}
												style={styles.uploadBox}
											/>
										</TouchableOpacity>
									) : (
										<View style={styles.BoxContent}>
											<Ionicons
												name="images-outline"
												size={20}
												color={"#808080"}
											/>
											<Text style={{ fontFamily: "Nunito", color: "#808080" }}>
												Upload Image
											</Text>
											<Pressable onPress={pickImage1}>
												<Text style={{ fontFamily: "Nunito", color: "blue" }}>
													Browse
												</Text>
											</Pressable>
										</View>
									)}
								</View>
								<View style={styles.uploadBox}>
									{image2 ? (
										<TouchableOpacity
											onPress={() => handleModalVisible(image2)}>
											<Image
												source={{ uri: image2 }}
												style={styles.uploadBox}
											/>
										</TouchableOpacity>
									) : (
										<View style={styles.BoxContent}>
											<Ionicons
												name="images-outline"
												size={20}
												color={"#808080"}
											/>
											<Text style={{ fontFamily: "Nunito", color: "#808080" }}>
												Upload Image
											</Text>
											<Pressable onPress={pickImage2}>
												<Text style={{ fontFamily: "Nunito", color: "blue" }}>
													Browse
												</Text>
											</Pressable>
										</View>
									)}
								</View>
								<View style={{ padding: 10 }}></View>
								<View style={styles.uploadBox}>
									{image3 ? (
										<TouchableOpacity
											onPress={() => handleModalVisible(image3)}>
											<Image
												source={{ uri: image3 }}
												style={styles.uploadBox}
											/>
										</TouchableOpacity>
									) : (
										<View style={styles.BoxContent}>
											<Ionicons
												name="images-outline"
												size={20}
												color={"#808080"}
											/>
											<Text style={{ fontFamily: "Nunito", color: "#808080" }}>
												Upload Image
											</Text>
											<Pressable onPress={pickImage3}>
												<Text style={{ fontFamily: "Nunito", color: "blue" }}>
													Browse
												</Text>
											</Pressable>
										</View>
									)}
								</View>
							</View>

							{video ? (
								<Video
									ref={vid}
									style={styles.uploadVid}
									source={{
										uri: video,
									}}
									useNativeControls
									resizeMode={ResizeMode.COVER}
									isLooping
									shouldPlay
									// onPlaybackStatusUpdate={status => setStatus(() => status)}
								/>
							) : (
								// <Image  source={{ uri: video}} style={styles.uploadVid}/>
								<View style={styles.uploadVid}>
									<View style={styles.BoxContent}>
										<Pressable disabled onPress={pickVideo}>
											{/* <Text style={{ fontFamily: "Nunito", color: "blue" }}>
										<Text style={{ fontFamily: "Nunito", color: "#808080" }}>
											Upload Your Videos
										</Text>{" "}
										Here
									</Text> */}
											<Text>disabled</Text>
										</Pressable>
										<Text
											style={{
												fontFamily: "Nunito",
												color: "#808080",
												fontSize: 10,
											}}>
											Maximum size: 500mb
										</Text>
									</View>
								</View>
							)}
						</View>
					) : (
						""
					)}

					<View style={styles.selectDetails}></View>

					<View style={{ paddingBottom: 5 }}>
						<View>
							<Text
								style={{
									fontSize: 14,
									letterSpacing: -0.24,
									lineHeight: 50,
									fontFamily: "Nunito",
									color: "black",
								}}>
								Campaign Start
							</Text>
							<View style={{ flexDirection: "row", columnGap: 10 }}>
								<View
									style={{
										backgroundColor: "white",
										borderRadius: 10,
										elevation: 10,
										width: 40,
										height: 40,
										borderColor: "#DE1738",
										borderWidth: 1,
									}}>
									<Fontisto
										name="date"
										size={24}
										style={{ left: 6, top: 4 }}
										color={"black"}
										onPress={showDatepicker}
									/>
								</View>

								<Text style={{ fontFamily: "Nunito", fontSize: 16 }}>
									{date.toDateString()}
								</Text>
								{show && (
									<DateTimePicker
										testID="dateTimePicker"
										value={date}
										mode={mode}
										is24Hour={true}
										onChange={onChange}
									/>
								)}
							</View>
						</View>

						<View>
							<Text
								style={{
									fontSize: 14,
									letterSpacing: -0.24,
									lineHeight: 50,
									fontFamily: "Nunito",
									color: "black",
								}}>
								Campaign End
							</Text>
							<View
								style={{
									flexDirection: "row",
									columnGap: 10,
								}}>
								<View
									style={{
										backgroundColor: "white",
										borderRadius: 10,
										elevation: 10,
										width: 40,
										height: 40,
										borderColor: "#DE1738",
										borderWidth: 1,
									}}>
									<Fontisto
										name="date"
										size={24}
										color={"black"}
										onPress={showDatePicker0}
										style={{ left: 6, top: 4 }}
									/>
								</View>

								<Text style={{ fontFamily: "Nunito", fontSize: 16 }}>
									{date0.toDateString()}
								</Text>
								{show0 && (
									<DateTimePicker
										testID="dateTimePicker"
										value={date0}
										mode={mode0}
										is24Hour={true}
										onChange={onChange0}
									/>
								)}
							</View>
						</View>
					</View>
					<View style={{ paddingBottom: 20 }}>
						<Pressable
							disabled={
								loading || !(image0 || image1 || image2 || image3 || code === 2)
									? true
									: false
							}
							onPress={formSubmit}
							style={[
								styles.button,
								{
									backgroundColor:
										image0 || image1 || image2 || image3 || code === 2
											? "#DE1738"
											: "#d4d4d4",
								},
							]}>
							<Text
								style={{
									fontFamily: "Nunito",
									fontSize: 18,
									color: "#FFFFFF",
									textTransform: "uppercase",
									textAlign: "center",
									top: 15,
								}}>
								{loading ? <ActivityIndicator color="white" /> : "Post Ad"}
							</Text>
						</Pressable>
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
		paddingVertical: 20,
		paddingHorizontal: 20,
	},
	header: {
		flexDirection: "row",
		columnGap: 10,
		marginVertical: 50,
		paddingHorizontal: 10,
	},
	title: {
		fontSize: 20,
		color: "white",
		textAlign: "center",
		textAlignVertical: "center",
	},
	icon: {
		backgroundColor: "white",
		padding: 10,
		borderRadius: 45,
	},
	input: {
		backgroundColor: "#FBFBFB",
	},
	uploadBox: {
		borderWidth: 1,
		height: 130,
		width: 150,
		borderRadius: 10,
		borderStyle: "dotted",
		backgroundColor: "#FBFBFB",
		elevation: 1,
	},
	uploadVid: {
		paddingTop: 5,
		borderWidth: 1,
		height: 130,
		width: "100%",
		borderRadius: 10,
		borderStyle: "dotted",
		backgroundColor: "#FBFBFB",
		elevation: 1,
		marginTop: 5,
	},
	BoxContent: {
		flexDirection: "column",
		alignItems: "center",
		paddingVertical: 17,
	},
	selectDetails: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	dropDown: {
		borderColor: "#E6E6E6",
		backgroundColor: "#FBFBFB",
		borderRadius: 10,
		borderWidth: 1,
		height: 58,
	},
	dateBox: {
		borderWidth: 1,
		flexDirection: "row",
		padding: 10,
		borderColor: "#E6E6E6",
		borderRadius: 10,
		columnGap: 5,
	},
	estimatedCost: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingVertical: 5,
	},
	estimatedCostContainer: {
		paddingHorizontal: 20,
	},
	button: {
		width: 327,
		height: 62,
		borderRadius: 12,
		alignSelf: "center",
	},
});
