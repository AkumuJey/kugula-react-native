import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnBoarding from "../screens/onBoarding";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect, useMemo, useContext } from "react";
import HomeScreen from "../screens/home";
import TabNav from "./tabNavigator";
import ProductDetails from "../screens/productDetails";
import Checkout from "../screens/checkout";
import ProductUpload from "../screens/productUpload";
import WishList from "../screens/wishlist";
import Resume from "../screens/resume";
import Login from "../screens/login";
import SignUp from "../screens/signup";
import OTP from "../screens/otp";
const StackScreens = createNativeStackNavigator();
import { userContext } from "../Context/context";
import base64 from "react-native-base64";
import AdScreen from "../screens/ad";
import AdPayout from "../screens/adPayout";
import Favourites from "../screens/favourites";
import ItemsSearch from "../screens/itemsSearch";
function StackNavigator() {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  const { token, setToken, setUserData } = useContext(userContext);
  const [isAvailable, setIsAvailable] = useState(false);
  useEffect(() => {
    async function GetToken() {
      try {
        await AsyncStorage.getItem("token").then((value) => {
          if (value !== null) {
            setToken(value);
            setIsAvailable(true);
            console.log("Values Data,", value);
          } else {
            setIsAvailable(false);
          }
        });
        await AsyncStorage.getItem("user").then(async (value) => {
          if (value !== null) {
            const userData = await JSON.parse(value);
            setUserData(userData);
            console.log(value);
          } else {
            setUserData({});
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
    GetToken();
  }, []);
  useEffect(() => {
    AsyncStorage.getItem("openScreen").then((value) => {
      if (value === null) {
        AsyncStorage.setItem("openScreen", "true");
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    });
  }, []);

  if (isFirstLaunch === null) {
    return null;
  } else if (isFirstLaunch === true) {
    return (
      <StackScreens.Navigator>
        <StackScreens.Screen
          name="onBoarding"
          component={OnBoarding}
          options={{
            headerShown: false,
          }}
        />
        {
          <StackScreens.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
            }}
          />
        }

        <StackScreens.Screen
          name="signup"
          component={SignUp}
          options={{
            headerShown: false,
          }}
        />
        <StackScreens.Screen
          name="otp"
          component={OTP}
          options={{
            headerShown: false,
          }}
        />
        <StackScreens.Screen
          name="home"
          component={TabNav}
          options={{
            headerShown: false,
          }}
        />
        <StackScreens.Screen
          name="details"
          component={ProductDetails}
          options={{
            headerShown: false,
          }}
        />
        <StackScreens.Screen
          name="checkout-1"
          component={Checkout}
          options={{
            headerShown: false,
          }}
        />
        <StackScreens.Screen
          name="adPayout"
          component={AdPayout}
          options={{
            headerShown: false,
          }}
        />
        <StackScreens.Screen
          name="upload"
          options={{
            headerShown: false,
          }}
          component={ProductUpload}
        />
        <StackScreens.Screen
          name="wishlist"
          component={WishList}
          options={{
            headerShown: false,
          }}
        />
        <StackScreens.Screen
          name="resume"
          component={Resume}
          options={{
            headerShown: false,
          }}
        />
        <StackScreens.Screen
          name="ad"
          component={AdScreen}
          options={{
            headerShown: false,
          }}
        />
        <StackScreens.Screen
          options={{
            headerStyle: {
              backgroundColor: "#DE1738",
              height: 120,
            },
            headerTitleStyle: { color: "white", fontFamily: "Nunito" },
            headerShadowVisible: false,
            tabBarBadge: 0,
            tabBarBadgeStyle: { backgroundColor: "#DE1738", top: 10 },
            headerTitle: "Favourites",
          }}
          name="fav"
          component={Favourites}
        />
        <StackScreens.Screen
          options={{
            headerStyle: {
              backgroundColor: "#DE1738",
              height: 120,
            },
            headerTitleStyle: { color: "white", fontFamily: "Nunito" },
            headerShadowVisible: false,
            tabBarBadge: 0,
            tabBarBadgeStyle: { backgroundColor: "#DE1738", top: 10 },
            headerTitle: "Search",
          }}
          name="searchItems"
          component={ItemsSearch}
        />
      </StackScreens.Navigator>
    );
  } else {
    return (
      <StackScreens.Navigator initialRouteName={isAvailable ? "home" : "Login"}>
        <StackScreens.Screen
          name="home"
          component={TabNav}
          options={{
            headerShown: false,
          }}
        />
        <StackScreens.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <StackScreens.Screen
          name="signup"
          component={SignUp}
          options={{
            headerShown: false,
          }}
        />

        <StackScreens.Screen
          name="otp"
          component={OTP}
          options={{
            headerShown: false,
          }}
        />

        <StackScreens.Screen
          name="details"
          component={ProductDetails}
          options={{
            headerShown: false,
          }}
        />
        <StackScreens.Screen
          name="checkout-1"
          component={Checkout}
          options={{
            headerShown: false,
          }}
        />
        <StackScreens.Screen
          name="adPayout"
          component={AdPayout}
          options={{
            headerShown: false,
          }}
        />
        <StackScreens.Screen
          name="upload"
          options={{
            headerShown: false,
          }}
          component={ProductUpload}
        />
        <StackScreens.Screen
          name="wishlist"
          component={WishList}
          options={{
            headerShown: false,
          }}
        />
        <StackScreens.Screen
          name="resume"
          component={Resume}
          options={{
            headerShown: false,
          }}
        />
        <StackScreens.Screen
          name="ad"
          component={AdScreen}
          options={{
            headerShown: false,
          }}
        />
        <StackScreens.Screen
          options={{
            headerStyle: {
              backgroundColor: "#DE1738",
              height: 120,
            },
            headerTitleStyle: { color: "white", fontFamily: "Nunito" },
            headerShadowVisible: false,
            tabBarBadge: 0,
            tabBarBadgeStyle: { backgroundColor: "#DE1738", top: 10 },
            headerTitle: "Favourites",
          }}
          name="fav"
          component={Favourites}
        />
        <StackScreens.Screen
          options={{
            headerStyle: {
              backgroundColor: "#DE1738",
              height: 120,
            },
            headerTitleStyle: { color: "white", fontFamily: "Nunito" },
            headerShadowVisible: false,
            tabBarBadge: 0,
            tabBarBadgeStyle: { backgroundColor: "#DE1738", top: 10 },
            headerTitle: "Search",
          }}
          name="searchItems"
          component={ItemsSearch}
        />
      </StackScreens.Navigator>
    );
  }
}

export default StackNavigator;
