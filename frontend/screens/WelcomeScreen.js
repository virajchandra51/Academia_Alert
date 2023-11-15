import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { removeItem } from "../utils/asyncStorage";
import { theme } from "../utils/theme";

const { width, height } = Dimensions.get("window");

const WelcomeScreen = () => {
  const navigation = useNavigation();

  const handleReset = async () => {
    await removeItem("onboarded");
    navigation.navigate("Onboarding");
  };
  const handleLogin = async () => {
    await removeItem("onboarded");
    navigation.navigate("Login");
  };
  const handleSignup = async () => {
    await removeItem("onboarded");
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image source={require("../assets/welcome.png")} />
      </View>
      <Text style={styles.text}>Academia Alert</Text>
      <View style={styles.logContainer}>
        <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSignup} style={styles.signupButton}>
          <Text style={styles.signupButtonText}>Signup</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handleReset} style={styles.resetButton}>
        <Text>Reset</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.COLORS.white,
  },
  text: {
    fontSize: width * 0.09,
    marginVertical: 40,
    fontWeight: '600',
  },
  resetButton: {
    backgroundColor: "#34d399",
    padding: 10,
    borderRadius: 10,
    marginVertical: 40,
  },
  loginButton: {
    backgroundColor: theme.COLORS.primary,
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 10,
    width: '40%',
  },
  loginButtonText: {
    color: theme.COLORS.white,
    fontSize: 20,
    textAlign: 'center',

  },
  signupButton: {
    backgroundColor: theme.COLORS.white,
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 10,
    marginLeft: 10,
    width: '40%',
    borderColor: theme.COLORS.primary,
    borderWidth: 1,
  },
  signupButtonText: {
    fontSize: 20,
    textAlign: 'center',
  },
  logContainer:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
  }
});

export default WelcomeScreen;
