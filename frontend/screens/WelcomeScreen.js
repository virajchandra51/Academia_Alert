import {
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../utils/theme";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import { removeItem } from "../utils/asyncStorage";
import Button from "../components/Button";
import { base_url } from "../utils/constants";
import { setItem } from "../utils/asyncStorage";

const WelcomeScreen = ({ navigation }) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 
  const handleLogin = async () => {
    console.log("pressed");
    const user = {
      email: email,
      password: password,
    };
    await fetch(`${base_url}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then(async (response) => {
        const data = await response.json();
        console.log(data);
        if(data.status_code === 200)
        {
          Alert.alert(
            "Woohhoo! Login Successful",
            "Welcome to Academia Alert!"
          );
          // setEmail("");
          // setPassword("");
          navigation.navigate("Home")
          if(isChecked)
          setItem("authToken", data.token);
        }
        else
        {
          Alert.alert(
            "Oops! Login Unsuccessful",
            data.status_msg
          );
        }
      })
      .catch((err) => {
        console.log(err);
        Alert.alert(
          "Oops! Login Unsuccessful",
          "Please check your internet"
        );
      });
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.COLORS.white }}>
      <View style={{ flex: 1, marginHorizontal: 22 }}>
        <View style={{ marginVertical: 22 }}>
          <Text
            style={{
              fontSize: 30,
              fontWeight: "bold",
              marginVertical: 12,
              color: theme.COLORS.black,
            }}
          >
            Hi, Welcome Back ! 👋
          </Text>

          <Text
            style={{
              fontSize: 16,
              color: theme.COLORS.black,
            }}
          >
            Catch up with the campus buzz!
          </Text>
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "400",
              marginVertical: 8,
            }}
          >
            Email Address
          </Text>

          <View
            style={{
              width: "100%",
              height: 48,
              borderColor: theme.COLORS.black,
              borderWidth: 1,
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: 16,
            }}
          >
            <TextInput
              placeholder="Enter your email address"
              placeholderTextColor={theme.COLORS.black}
              keyboardType="email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={{
                width: "100%",
              }}
            />
          </View>
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "400",
              marginVertical: 8,
            }}
          >
            Password
          </Text>

          <View
            style={{
              width: "100%",
              height: 48,
              borderColor: theme.COLORS.black,
              borderWidth: 1,
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: 16,
            }}
          >
            <TextInput
              placeholder="Enter your password"
              placeholderTextColor={theme.COLORS.black}
              secureTextEntry={isPasswordShown}
              value={password}
              onChangeText={(text) => setPassword(text)}
              style={{
                width: "100%",
              }}
            />

            <TouchableOpacity
              onPress={() => setIsPasswordShown(!isPasswordShown)}
              style={{
                position: "absolute",
                right: 12,
              }}
            >
              {isPasswordShown == true ? (
                <Ionicons name="eye-off" size={24} color={theme.COLORS.black} />
              ) : (
                <Ionicons name="eye" size={24} color={theme.COLORS.black} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            marginVertical: 6,
            alignItems: "center",
          }}
        >
          <Checkbox
            style={{ marginRight: 8 }}
            value={isChecked}
            onValueChange={setIsChecked}
            color={isChecked ? theme.COLORS.primary : undefined}
          />

          <Text>Remember Me</Text>
        </View>

        <Button
          title="Login"
          filled
          onPress={handleLogin}
          style={{
            marginTop: 18,
            marginBottom: 4,
          }}
        />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 20,
          }}
        >
          <View
            style={{
              flex: 1,
              height: 1,
              backgroundColor: theme.COLORS.gray,
              marginHorizontal: 10,
            }}
          />
          <Text style={{ fontSize: 14 }}>Or Login with</Text>
          <View
            style={{
              flex: 1,
              height: 1,
              backgroundColor: theme.COLORS.gray,
              marginHorizontal: 10,
            }}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
          }}
        >

          <TouchableOpacity
            onPress={() => console.log("Pressed")}
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              height: 52,
              borderWidth: 1,
              borderColor: theme.COLORS.gray,
              marginRight: 4,
              borderRadius: 10,
            }}
          >
            <Image
              source={require("../assets/icons/google.png")}
              style={{
                height: 36,
                width: 36,
                marginRight: 8,
              }}
              resizeMode="contain"
            />

            <Text>Google</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginVertical: 22,
          }}
        >
          <Text style={{ fontSize: 16, color: theme.COLORS.black }}>
            Don't have an account ?{" "}
          </Text>
          <Pressable onPress={() => navigation.navigate("Signup")}>
            <Text
              style={{
                fontSize: 16,
                color: theme.COLORS.primary,
                fontWeight: "bold",
              }}
            >
              Register Now
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
