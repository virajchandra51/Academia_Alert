import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "./screens/WelcomeScreen.js";
import OnboardingScreen from "./screens/OnboardingScreen.js";
import { getItem } from "./utils/asyncStorage.js";
import LoginScreen from "./screens/LoginScreen.js";
import SignupScreen from "./screens/SignupScreen.js";

const Stack = createNativeStackNavigator();

const App = () => {
  const [showOnboarding, setShowOnboarding] = useState(null);
  useEffect(() => {
    checkIfAlreadyOnboarded();
  }, []);

  const checkIfAlreadyOnboarded = async () => {
    let onboarded = await getItem("onboarded");
    if (onboarded == 1) {
      // hide onboarding
      setShowOnboarding(false);
    } else {
      // show onboarding
      setShowOnboarding(true);
    }
  };

  if (showOnboarding == null) {
    return null;
  }

    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={`${showOnboarding}` ? `Onboarding` : `Home`}>
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
            name="Login"
            options={{ headerShown: false, presentation: 'modal' }}
            component={LoginScreen}
          />
          <Stack.Screen
            name="Signup"
            options={{ headerShown: false, presentation: 'modal' }}
            component={SignupScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
};

export default App;
