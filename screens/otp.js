import {
	View,
	Text,
	StyleSheet,
	ImageBackground,
	Image,
	TextInput,
	Pressable,
	KeyboardAvoidingView,
	ScrollView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useState, useCallback } from "react";
import { useWindowDimensions } from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons/build/Icons";
import { useRoute } from "@react-navigation/native";
import OTPTextView from "react-native-otp-textinput";
import { ActivityIndicator } from "react-native-paper";
export default function OTP({ navigation }) {
	const width = useWindowDimensions().width;
	const height = useWindowDimensions().height;
	const [codes, setCodes] = useState("");
	const [code, setCode] = useState("");
	const [loading, setLoading] = useState(false);

	const route = useRoute();
	const verificationId = route.params?.verificationId;
	const id = route.params?.id;
	console.log("id here", verificationId, id);

	const verifyCode = async () => {};

	const [fontsLoaded] = useFonts({
		"Poppins-Reg": require("../assets/fonts/Poppins-Regular.ttf"),
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
		<ScrollView
			showsVerticalScrollIndicator={false}
			style={styles.container}
			onLayoutRootView={onLayoutRootView}>
			<StatusBar style="light" backgroundColor="#DE1738" />
			<Image
				width={100}
				height={100}
				style={styles.userLogo}
				source={require("../assets/user-logo.png")}
			/>
			<ImageBackground
				width={10}
				style={[styles.imageBg, { height: height }]}
				source={require("../assets/background.png")}>
				<View style={styles.innerContainer}>
					<Text
						style={{ fontSize: 28, lineHeight: 42, fontFamily: "Poppins-Reg" }}>
						ENTER OTP
					</Text>
					<View style={{ flexDirection: "row", gap: 2 }}>
						{/* <TextInput
							onChangeText={(num) => setCodes(num)}
							keyboardType="numeric"
							style={[styles.inputField, { fontFamily: "Poppins-Reg" }]}
						/> */}
						<OTPTextView
							inputCount={6}
							defaultValue=""
							handleTextChange={(val) => setCodes(val)}
						/>
					</View>
					<View style={{ flexDirection: "row", columnGap: 5 }}>
						<Pressable
							onPress={() => navigation.goBack()}
							style={[
								styles.arrowBtn,
								{ width: 60, backgroundColor: "#505050", marginLeft: 50 },
							]}>
							<MaterialIcons name="arrow-back-ios" size={24} color={"white"} />
						</Pressable>

						<Pressable
							onPress={verifyCode}
							disabled={codes !== "" ? false : true}
							style={[
								styles.signInComplete,
								{
									width: width - 130,
									backgroundColor: codes !== "" ? `#DE1738` : `#C9C9C9`,
									marginRight: 50,
								},
							]}>
							<Text
								style={{
									color: "white",
									fontFamily: "Poppins-Reg",
									fontSize: 16,
									textTransform: "uppercase",
								}}>
								{loading ? <ActivityIndicator color="white" /> : "Complete"}
							</Text>
						</Pressable>
					</View>
					<View style={{ flexDirection: "row", paddingVertical: 15 }}>
						<Text style={{ fontFamily: "Poppins-Reg" }}>
							Didn't receive any code?
						</Text>
						<Pressable onPress={() => navigation.navigate("signup")}>
							<Text
								style={{
									fontFamily: "Poppins-Reg",
									paddingLeft: 5,
									textDecorationLine: "underline",
									color: "#DE1738",
								}}>
								Resend
							</Text>
						</Pressable>
					</View>
				</View>
			</ImageBackground>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#DE1738",
		flex: 1,
		width: "100%",
	},
	imageBg: {
		// flex:1,
		overflow: "hidden",
	},
	userLogo: {
		alignSelf: "center",
		top: 60,
		position: "relative",
	},
	innerContainer: {
		alignItems: "center",
		paddingVertical: 180,
	},
	input: {
		flexDirection: "row",
		marginTop: 30,
	},
	inputField: {
		borderWidth: 2,
		width: 75.75,
		height: 60.57,
		paddingBottom: 2,
		borderRadius: 10,
		borderColor: "#E6E6E6",
		textAlign: "center",
	},
	signInBtn: {
		backgroundColor: "#DE1738",
		padding: 20,
		borderRadius: 15,
		marginTop: 20,
		alignSelf: "center",
		alignItems: "center",
	},
	signInComplete: {
		padding: 20,
		borderRadius: 15,
		marginTop: 20,
		alignSelf: "center",
		alignItems: "center",
	},
	arrowBtn: {
		padding: 20,
		borderRadius: 15,
		marginTop: 20,
		alignSelf: "center",
		alignItems: "center",
	},
});
