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
  TouchableOpacity,
  Linking,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import {
  useState,
  useCallback,
  createContext,
  useContext,
  useEffect,
} from "react";
import { useWindowDimensions } from "react-native";
import { AntDesign } from "@expo/vector-icons/build/Icons";
import { userContext } from "../Context/context";
import { ActivityIndicator } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_URL } from "../constants";
export default function Login({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUserData } = useContext(userContext);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { token, setToken } = useContext(userContext);

  const handleSubmit = async () => {
    setLoading(true);
    setError(false);
    await axios
      .post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAl16vKbx9K6xksCIOBkXUs9x1v_i57BrQ`,
        {
          username,
          password: password,
        }
      )
      .then((response) => {
        console.log(response.data);
        setUserData(response.data);
        navigation.replace("home");
        setToken(response.data.accessToken);
        AsyncStorage.setItem("token", response.data.accessToken);
        AsyncStorage.setItem("user", JSON.stringify(response.data));
        console.log(response.data);
      })
      .catch((err) => {
        setError(true);
        setLoading(false);
        console.log(err);
      });
  };

  const width = useWindowDimensions().width;
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
      onLayout={onLayoutRootView}
    >
      <StatusBar style="light" backgroundColor="#DE1738" />
      <Image
        width={100}
        height={100}
        style={styles.userLogo}
        source={require("../assets/user-logo.png")}
      />
      <ImageBackground
        width={10}
        style={styles.imageBg}
        source={require("../assets/background.png")}
      >
        <View style={styles.innerContainer}>
          <Text
            style={{ fontSize: 28, lineHeight: 42, fontFamily: "Poppins-Reg" }}
          >
            SignIn
          </Text>
          <Text
            style={{
              textAlign: "center",
              width: width - 50,
              fontFamily: "Poppins-Reg",
              color: "gray",
              lineHeight: 22,
            }}
          >
            Login into kugula and find amazing offers at affordable prices{" "}
          </Text>
          {error ? (
            <Text
              style={{
                color: "#DE1738",
                fontFamily: "Poppins-Reg",
                paddingTop: 10,
              }}
            >
              Wrong Username or Password
            </Text>
          ) : (
            ""
          )}
          <View style={styles.input}>
            <View style={styles.icon}>
              <AntDesign name="user" color={"white"} size={24} />
            </View>
            <TextInput
              onChangeText={(val) => setUsername(val)}
              placeholder="username"
              style={[styles.inputField, { fontFamily: "Poppins-Reg" }]}
            />
          </View>

          <View style={styles.input}>
            <View style={styles.icon}>
              <AntDesign name="user" color={"white"} size={24} />
            </View>
            <TextInput
              onChangeText={(val) => setPassword(val)}
              secureTextEntry
              placeholder="password"
              style={[styles.inputField, { fontFamily: "Poppins-Reg" }]}
            />
            {/* ()=>navigation.navigate('home')} */}
          </View>
          {/* Trial */}
          <Pressable
            onPress={() => {
              navigation.navigate("home");
              console.log("clicked");
            }}
            style={[
              {
                paddingVertical: 10,
                paddingHorizontal: 20,
                marginVertical: 5,
                backgroundColor: "#DE1738",
                borderRadius: 5,
              },
            ]}
          >
            <Text>Home</Text>
          </Pressable>

          <Pressable
            onPress={() => {
              navigation.navigate("details");
              console.log("clicked onBoarding");
            }}
            style={{
              backgroundColor: "green",
              paddingVertical: 5,
              paddingHorizontal: 10,
              fontFamily: "Poppins-Reg",
              fontSize: 16,
              borderRadius: 5,
            }}
          >
            <Text>Product Details</Text>
          </Pressable>
          {/* end */}
          <Pressable
            onPress={handleSubmit}
            style={[styles.signInBtn, { width: width - 50 }]}
          >
            <Text
              style={{
                color: "white",
                fontFamily: "Poppins-Reg",
                fontSize: 16,
              }}
            >
              {isLoading ? (
                <ActivityIndicator size={18} color="white" />
              ) : (
                "Signin"
              )}
            </Text>
          </Pressable>
          <Text
            style={{
              fontFamily: "Poppins-Reg",
              color: "#505050",
              paddingVertical: 10,
            }}
          >
            or signin with
          </Text>
          <View style={styles.socials}>
            <TouchableOpacity>
              <Image
                source={require("../assets/google.png")}
                width={100}
                height={100}
              />
            </TouchableOpacity>

            <Image
              source={require("../assets/apple.png")}
              width={100}
              height={100}
            />
            <Image
              source={require("../assets/twitter.png")}
              width={100}
              height={100}
            />
            <Image
              source={require("../assets/facebook.png")}
              width={100}
              height={100}
            />
          </View>
          <View style={{ flexDirection: "row", paddingVertical: 15 }}>
            <Text style={{ fontFamily: "Poppins-Reg" }}>
              Don't Have an Account?
            </Text>
            <Pressable onPress={() => navigation.navigate("signup")}>
              <Text
                style={{
                  fontFamily: "Poppins-Reg",
                  paddingLeft: 5,
                  textDecorationLine: "underline",
                }}
              >
                Signup
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
    flex: 1,
  },
  userLogo: {
    alignSelf: "center",
    top: 60,
    position: "relative",
  },
  innerContainer: {
    alignItems: "center",
    paddingVertical: 150,
  },
  input: {
    flexDirection: "row",
    marginTop: 30,
  },
  inputField: {
    borderWidth: 2,
    width: 319,
    height: 60,
    paddingBottom: 2,
    paddingLeft: 60,
    borderRadius: 10,
    borderColor: "#E6E6E6",
  },
  icon: {
    backgroundColor: "#DE1738",
    padding: 12,
    position: "absolute",
    borderRadius: 10,
    left: 6,
    top: 6,
  },
  signInBtn: {
    backgroundColor: "#DE1738",
    padding: 20,
    borderRadius: 15,
    marginTop: 20,
    alignSelf: "center",
    alignItems: "center",
  },
  socials: {
    flexDirection: "row",
    gap: 15,
  },
});
