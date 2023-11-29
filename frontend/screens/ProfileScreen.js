import {
  View,
  Text,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  FlatList,
  TextInput,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import { theme } from "../utils/theme";
import { FontAwesome } from "@expo/vector-icons";
import man from "../assets/images/kemal.jpg";
import { Ionicons } from "@expo/vector-icons";

const ProfileScreen = () => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.COLORS.white,
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <View>
          <Image
            source={man}
            resizeMode="contain"
            style={{
              height: 155,
              width: 155,
              borderRadius: 999,
              borderColor: theme.COLORS.primary,
              borderWidth: 2,
            }}
          />
          <View
            style={{
              marginTop: -30,
              marginLeft: 120,
              backgroundColor: theme.COLORS.lightgray,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 9999,
              padding: 4,
            }}
          >
            <FontAwesome name="pencil" size={24} color="black" />
          </View>
        </View>

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={{
              width: 124,
              height: 36,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: theme.COLORS.primary,
              borderRadius: 10,
              marginHorizontal: theme.SIZES.small * 2,
            }}
          >
            <Text
              style={{
                color: theme.COLORS.white,
              }}
            >
              Edit Profile
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              width: 124,
              height: 36,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: theme.COLORS.primary,
              borderRadius: 10,
              marginHorizontal: theme.SIZES.small * 2,
            }}
          >
            <Text
              style={{
                color: theme.COLORS.white,
              }}
            >
              Add Friend
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            paddingHorizontal: theme.SIZES.small,
            marginBottom: 12,
            width: "90%",
          }}
        >
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
              paddingLeft: 16,
            }}
          >
            <TextInput
              placeholder="Enter your name"
              placeholderTextColor={theme.COLORS.black}
              keyboardType="name"
              style={{
                width: "100%",
              }}
            />
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: theme.SIZES.small,
            marginBottom: 12,
            width: "90%",
          }}
        >
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
              placeholder="Enter your name"
              placeholderTextColor={theme.COLORS.black}
              keyboardType="name"
              style={{
                width: "100%",
              }}
            />
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: theme.SIZES.small,
            marginBottom: 12,
            width: "90%",
          }}
        >
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
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
