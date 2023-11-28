import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  Linking,
  ScrollView,
} from "react-native";
import React from "react";
import { theme } from "../utils/theme";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import Button from "../components/Button";
import logo from "../assets/images/kemal.jpg";

const EventScreen = ({ route, navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator="false">
        <View style={styles.imgContainer}>
          <Image
            resizeMode="cover"
            source={route.params.data.img}
            style={styles.eventImage}
          />
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.eventTitle}>{route.params.data.title}</Text>
          <Text style={styles.eventDesc}>{route.params.data.desc}</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "start",
              alignItems: "center",
              marginBottom: 4,
            }}
          >
            <MaterialIcons
              name="date-range"
              size={24}
              color="black"
              style={{ paddingRight: 2 }}
            />
            <Text
              style={{
                marginLeft: 7,
                fontSize: theme.SIZES.medium,
                color: theme.COLORS.primary,
              }}
            >
              {route.params.data.date}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "start",
              alignItems: "center",
              marginBottom: 4,
            }}
          >
            <FontAwesome
              name="clock-o"
              size={24}
              color="black"
              style={{ marginLeft: 2 }}
            />
            <Text
              style={{
                marginLeft: 10,
                fontSize: theme.SIZES.medium,
                color: theme.COLORS.primary,
              }}
            >
              {route.params.data.time}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "start",
              alignItems: "center",
            }}
          >
            <FontAwesome
              name="map-marker"
              size={28}
              color="black"
              style={{ marginLeft: 4 }}
            />
            <Text
              style={{
                marginLeft: 14,
                fontSize: theme.SIZES.medium,
                color: theme.COLORS.primary,
              }}
            >
              {route.params.data.venue}
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Button
              filled
              title="Register"
              style={{
                marginTop: 18,
                marginBottom: 4,
                flex: 1,
                borderWidth: 1,
                borderColor: theme.COLORS.secondary,
                backgroundColor: theme.COLORS.secondary,
              }}
              onPress={() => {
                Linking.openURL(route.params.data.link);
              }}
            ></Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EventScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    flex: 1,
    borderRadius: 12,
    backgroundColor: theme.COLORS.white,
  },
  contentContainer: {
    width: "100%",
    padding: theme.SIZES.xLarge,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  imgContainer: {
    paddingTop: theme.SIZES.xxLarge,
    justifyContent: "center",
    alignItems: "center",
  },
  eventImage: {
    width: 370,
    height: 370,
    borderRadius: 4,
  },
  eventTitle: {
    fontSize: theme.SIZES.xxLarge,
    color: theme.COLORS.secondary,
    fontWeight: "bold",
  },
  eventDesc: {
    fontSize: theme.SIZES.medium,
    color: theme.COLORS.gray,
    marginVertical: theme.SIZES.large,
  },
});
