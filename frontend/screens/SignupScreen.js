import {
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../utils/theme";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import Button from "../components/Button";
import logo from "../assets/logp.png";
import axios from 'axios'
import { base_url } from "../utils/constants";

const Signup = ({ navigation }) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isConfirmPasswordShown, setIsConfirmPasswordShown] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [passwordConfirm,setPasswordConfirm] = useState("");

  const handleSignUp = async () => {
    console.log("pressed");
    const user = {
      name: name,
      email: email,
      password: password,
      passwordConfirm: passwordConfirm,
    }
    // console.log(`${base_url}/users/signup`);
    await axios({
      method: 'get',
      url: 'http://localhost:3000/api/v1/users/getAll',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(async function (response) {
        // const data = await response.json();
        console.log(response);
      }).catch(function (error) {
        console.log(error);
      });

  }

  console.log(name);
  console.log(email);
  console.log(password);
  console.log(passwordConfirm);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.COLORS.white }}>
      <ScrollView>
        <View style={{ flex: 1, marginHorizontal: 22 }}>
          {/* <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={logo}
              style={{ width: 400, height: 150, resizeMode: "contain" }}
            ></Image>
          </View> */}
          <View style={{ marginVertical: 22 }}>
            <Text
              style={{
                fontSize: 30,
                fontWeight: "bold",
                color: theme.COLORS.black,
              }}
            >
              Create Account
            </Text>

            <Text
              style={{
                fontSize: 16,
                marginVertical: 4,
                color: theme.COLORS.black,
              }}
            >
              Join Academia Alert today!
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
              Name
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
                paddingLeft: 22,
              }}
            >
              <TextInput
                placeholder="Enter your name"
                placeholderTextColor={theme.COLORS.black}
                keyboardType="name"
                value={name}
                onChangeText={text => setName(text)}
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
                paddingLeft: 22,
              }}
            >
              <TextInput
                placeholder="Enter your email address"
                placeholderTextColor={theme.COLORS.black}
                keyboardType="email"
                value={email}
                onChangeText={text => setEmail(text)}
                style={{
                  width: "100%",
                }}
              />
            </View>
          </View>

          {/* <View style={{ marginBottom: 12 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "400",
              marginVertical: 8,
            }}
          >
            Mobile Number
          </Text>

          <View
            style={{
              width: "100%",
              height: 48,
              borderColor: theme.COLORS.black,
              borderWidth: 1,
              borderRadius: 8,
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingLeft: 22,
            }}
          >
            <TextInput
              placeholder="+91"
              placeholderTextColor={theme.COLORS.black}
              keyboardType="numeric"
              style={{
                width: "12%",
                borderRightWidth: 1,
                borderLeftColor: theme.COLORS.gray,
                height: "100%",
              }}
            />

            <TextInput
              placeholder="Enter your phone number"
              placeholderTextColor={theme.COLORS.black}
              keyboardType="numeric"
              style={{
                width: "80%",
              }}
            />
          </View>
        </View> */}

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
                paddingLeft: 22,
              }}
            >
              <TextInput
                placeholder="Enter your password"
                placeholderTextColor={theme.COLORS.black}
                secureTextEntry={isPasswordShown}
                value={password}
                onChangeText={text => setPassword(text)}
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
                  <Ionicons
                    name="eye-off"
                    size={24}
                    color={theme.COLORS.black}
                  />
                ) : (
                  <Ionicons name="eye" size={24} color={theme.COLORS.black} />
                )}
              </TouchableOpacity>
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
              Confirm Password
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
                paddingLeft: 22,
              }}
            >
              <TextInput
                placeholder="Re-Enter your password"
                placeholderTextColor={theme.COLORS.black}
                secureTextEntry={isConfirmPasswordShown}
                value={passwordConfirm}
                onChangeText={text => setPasswordConfirm(text)}
                style={{
                  width: "100%",
                }}
              />

              <TouchableOpacity
                onPress={() =>
                  setIsConfirmPasswordShown(!isConfirmPasswordShown)
                }
                style={{
                  position: "absolute",
                  right: 12,
                }}
              >
                {isConfirmPasswordShown == true ? (
                  <Ionicons
                    name="eye-off"
                    size={24}
                    color={theme.COLORS.black}
                  />
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
            }}
          >
            <Checkbox
              style={{ marginRight: 8 }}
              value={isChecked}
              onValueChange={setIsChecked}
              color={isChecked ? theme.COLORS.primary : undefined}
            />

            <Text>I agree to the terms and conditions</Text>
          </View>

          <Button
            title="Sign Up"
            filled
            style={{
              marginTop: 18,
              marginBottom: 4,
            }}
            onPress={handleSignUp}
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
            <Text style={{ fontSize: 14 }}>Or Sign up with</Text>
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
              Already have an account ?{" "}
            </Text>
            <Pressable onPress={() => navigation.navigate("Welcome")}>
              <Text
                style={{
                  fontSize: 16,
                  color: theme.COLORS.primary,
                  fontWeight: "bold",
                }}
              >
                Login
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signup;
