import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import StackNavigator from "./navigations/stackNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { LikeContextProvider, userContext } from "./Context/context";
import { useState } from "react";
export default function App() {
	const [userData, setUserData] = useState({});
	const [token, setToken] = useState("");
	return (
		<LikeContextProvider>
			<userContext.Provider value={{ userData, setUserData, token, setToken }}>
				<NavigationContainer>
					<StatusBar style="light" />
					<StackNavigator />
				</NavigationContainer>
			</userContext.Provider>
		</LikeContextProvider>
	);
}
