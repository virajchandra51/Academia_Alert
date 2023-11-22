import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnboardingScreen from "./screens/OnboardingScreen.js";
import { getItem, removeItem } from "./utils/asyncStorage.js";
import WelcomeScreen from "./screens/WelcomeScreen.js";
import SignupScreen from "./screens/SignupScreen.js";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import NewsScreen from "./screens/NewsScreen.js";
import ProfileScreen from "./screens/ProfileScreen.js";
import AdminScreen from "./screens/AdminScreen.js";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { View } from "react-native";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Home = () => {
  return (
    <Tab.Navigator
      initialRouteName="News"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "Profile")
            return (
              <FontAwesome
                name="user"
                size={24}
                color={focused ? "black" : "gray"}
              />
            );
          else if (route.name === "News")
            return (
              <FontAwesome
                name="newspaper-o"
                size={24}
                color={focused ? "black" : "gray"}
              />
            );
          return (
            <MaterialIcons
              name="admin-panel-settings"
              size={24}
              color={focused ? "black" : "gray"}
            />
          );
        },
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="News" component={NewsScreen} />
      <Tab.Screen name="Admin" component={AdminScreen} />
    </Tab.Navigator>
  );
};

const App = () => {
  const [showOnboarding, setShowOnboarding] = useState(null);
  const [loggedIn, setLoggedIn] = useState(null);

  useEffect(() => {
    checkInitial();
  }, []);

  const checkInitial = async () => {
    let token = await getItem("authToken");
    let onboarded = await getItem("onboarded");
    console.log(token, onboarded);
    if (token) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
    if (onboarded) {
      setShowOnboarding(false);
    } else {
      setShowOnboarding(true);
    }
    console.log("Token is", loggedIn);
    console.log("Onboadding in is", showOnboarding);
  };

  if (showOnboarding) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Onboarding">
          <Stack.Screen
            name="Onboarding"
            options={{ headerShown: false }}
            component={OnboardingScreen}
          />
          <Stack.Screen
            name="Welcome"
            options={{ headerShown: false }}
            component={WelcomeScreen}
          />
          <Stack.Screen
            name="Signup"
            options={{ headerShown: false }}
            component={SignupScreen}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else if (loggedIn) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Onboarding"
            options={{ headerShown: false }}
            component={OnboardingScreen}
          />
          <Stack.Screen
            name="Welcome"
            options={{ headerShown: false }}
            component={WelcomeScreen}
          />
          <Stack.Screen
            name="Signup"
            options={{ headerShown: false }}
            component={SignupScreen}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen
            name="Onboarding"
            options={{ headerShown: false }}
            component={OnboardingScreen}
          />
          <Stack.Screen
            name="Welcome"
            options={{ headerShown: false }}
            component={WelcomeScreen}
          />
          <Stack.Screen
            name="Signup"
            options={{ headerShown: false }}
            component={SignupScreen}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
};

export default App;
