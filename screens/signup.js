import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TextInput,
  Pressable,
  ScrollView,
  TouchableOpacity,
  Alert,
  ToastAndroid,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useState, useCallback, useEffect } from "react";
import { useWindowDimensions } from "react-native";
import { AntDesign } from "@expo/vector-icons/build/Icons";
import { ActivityIndicator, Checkbox, List } from "react-native-paper";
import { CountryPicker } from "react-native-country-codes-picker";
import { ErrorMessage, Formik } from "formik";
import axios from "axios";
import * as Yup from "yup";
export default function SignUp({ navigation }) {
  const [expanded, setExpanded] = useState(false);
  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState("");
  const [loading, setLoading] = useState(false);
  const initialValues = {
    username: "",
    email: "",
    phonenumber: "",
    location: "",

    password: "",
  };
  const onSubmit = async (values) => {
    console.log(values);
    setLoading(true);

    await axios
      .post("http://137.184.237.55:8080/kugula/auth/register", {
        username: values.username,
        email: values.email,

        code: countryCode,
        phonenumber: values.phonenumber,
        location: values.location,
        password: values.password,
        active: 1,
        nrc: "1111/11/1",
      })
      .then((res) => {
        navigation.navigate("Login");
        console.log(res);
        setLoading(false);
        ToastAndroid.show(
          "Created Account Successfully!",
          ToastAndroid.BOTTOM,
          ToastAndroid.LONG
        );
      })
      .catch((err) => {
        console.log("Error: ", err);
        setLoading(false);
        Alert.alert(
          "Check Your Credentials and Try Again",
          "Do not use the same Username or Email"
        );
      });
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    email: Yup.string()
      .required("Email is required")
      .email("Enter a valid Email Address"),
    password: Yup.string()
      .required("Password is requireed")
      .min(8, "Password should be 8 characters and above")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain, One Uppercase, Lowercase, Number and Special Case Character"
      ),
    phonenumber: Yup.string()
      .required("Phone number is required")
      .min(8, "Too short")
      .max(9, "Too long"),
    location: Yup.string().required("Location is required"),
  });

  const handlePress = () => setExpanded(!expanded);
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
      onLayoutRootView={onLayoutRootView}
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
            SignUp
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
            Signup to browse amazing products on kugula at affordable prices{" "}
          </Text>
          {/* <View>
						<FirebaseRecaptchaVerifierModal
							firebaseConfig={firebaseConfig}
							ref={recaptureRef}
						/>
					</View> */}

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <View>
                <View style={styles.input}>
                  <View style={styles.icon}>
                    <AntDesign name="user" color={"white"} size={24} />
                  </View>
                  <View>
                    <TextInput
                      onChangeText={handleChange("username")}
                      onBlur={handleBlur("username")}
                      value={values.username}
                      placeholder="username"
                      style={[styles.inputField, { fontFamily: "Poppins-Reg" }]}
                    />
                    <ErrorMessage name="username">
                      {(msg) => (
                        <Text
                          style={{
                            fontFamily: "Poppins-Reg",
                            color: "red",
                            fontSize: 10,
                          }}
                        >
                          *{msg}
                        </Text>
                      )}
                    </ErrorMessage>
                  </View>
                </View>
                <View style={styles.input}>
                  <View style={styles.icon}>
                    <AntDesign name="mail" color={"white"} size={24} />
                  </View>
                  <View>
                    <TextInput
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      value={values.email}
                      placeholder="Enter email"
                      style={[styles.inputField, { fontFamily: "Poppins-Reg" }]}
                    />
                    <ErrorMessage name="email">
                      {(msg) => (
                        <Text
                          style={{
                            fontFamily: "Poppins-Reg",
                            color: "red",
                            fontSize: 10,
                          }}
                        >
                          *{msg}
                        </Text>
                      )}
                    </ErrorMessage>
                  </View>
                </View>
                <View style={styles.input}>
                  <View style={styles.icon}>
                    <AntDesign name="lock" color={"white"} size={24} />
                  </View>
                  <View>
                    <TextInput
                      onChangeText={handleChange("password")}
                      onBlur={handleBlur("password")}
                      value={values.password}
                      secureTextEntry
                      placeholder="password"
                      style={[styles.inputField, { fontFamily: "Poppins-Reg" }]}
                    />
                    <ErrorMessage name="password">
                      {(msg) => (
                        <Text
                          style={{
                            fontFamily: "Poppins-Reg",
                            color: "red",
                            fontSize: 10,
                            width: 300,
                          }}
                        >
                          *{msg}
                        </Text>
                      )}
                    </ErrorMessage>
                  </View>
                </View>
                <View style={[styles.input]}>
                  <TouchableOpacity
                    onPress={() => setShow(true)}
                    style={[
                      styles.icon,
                      { zIndex: 100, flexDirection: "row", gap: 2 },
                    ]}
                  >
                    <AntDesign name="phone" color={"white"} size={24} />
                    <Text style={{ color: "white", fontFamily: "Poppins-Reg" }}>
                      {countryCode ? countryCode : "+000"}
                    </Text>
                  </TouchableOpacity>
                  <View>
                    <TextInput
                      onChangeText={handleChange("phonenumber")}
                      onBlur={handleBlur("phonenumber")}
                      placeholder="093xxxxxxx"
                      keyboardType="numeric"
                      value={values.phonenumber}
                      style={[
                        styles.inputField,
                        { fontFamily: "Poppins-Reg", paddingLeft: 100 },
                      ]}
                    />
                    <ErrorMessage name="phonenumber">
                      {(msg) => (
                        <Text
                          style={{
                            fontFamily: "Poppins-Reg",
                            color: "red",
                            fontSize: 10,
                          }}
                        >
                          *{msg}
                        </Text>
                      )}
                    </ErrorMessage>
                  </View>

                  <CountryPicker
                    show={show}
                    onBackdropPress={() => setShow(false)}
                    // when picker button press you will get the country object with dial code
                    pickerButtonOnPress={(item) => {
                      setCountryCode(item.dial_code);
                      setShow(false);
                    }}
                    style={{
                      modal: {
                        height: 200,
                      },
                    }}
                  />
                </View>

                <View style={styles.input}>
                  <View
                    style={{
                      padding: 1,
                      position: "absolute",
                      borderRadius: 10,
                      left: 6,
                      top: 6,
                    }}
                  >
                    <Image
                      source={require("../assets/location.png")}
                      width={100}
                      height={100}
                    />
                  </View>
                  <View>
                    <TextInput
                      onChangeText={handleChange("location")}
                      onBlur={handleBlur("location")}
                      value={values.location}
                      placeholder="enter location"
                      style={[styles.inputField, { fontFamily: "Poppins-Reg" }]}
                    />
                    <ErrorMessage name="location">
                      {(msg) => (
                        <Text
                          style={{
                            fontFamily: "Poppins-Reg",
                            color: "red",
                            fontSize: 10,
                          }}
                        >
                          *{msg}
                        </Text>
                      )}
                    </ErrorMessage>
                  </View>
                </View>

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
                    {loading ? <ActivityIndicator color="white" /> : "Signup"}
                  </Text>
                </Pressable>
              </View>
            )}
          </Formik>
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
    top: 200,
    paddingBottom: 210,
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
  dropDown: {
    borderColor: "#E6E6E6",
    backgroundColor: "#FBFBFB",
    borderRadius: 10,
    borderWidth: 1,
    height: 58,
  },
});
