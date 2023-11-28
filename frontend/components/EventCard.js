import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  Linking,
} from "react-native";
import React from "react";
import { theme } from "../utils/theme";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import Button from "./Button";

const EventCard = (props) => {
  const handleClickInfo = () => {
    console.log(props);
    props.navigation.navigate("Event", { data: props.event });
  };
  const handleClickRegister = () => {
    console.log(props);
    props.navigation.navigate("Event", { data: props.event });
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imgContainer}>
        <Image
          resizeMode="cover"
          source={props.event.img}
          style={styles.eventImage}
        />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.eventTitle}>{props.event.title}</Text>
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
              color: theme.COLORS.gray,
            }}
          >
            {props.event.date}
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
              color: theme.COLORS.gray,
            }}
          >
            {props.event.time}
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
              color: theme.COLORS.gray,
            }}
          >
            {props.event.venue}
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
          <Button
            title="Know More"
            filled
            style={{
              marginTop: 18,
              marginBottom: 4,
              flex: 1,
              backgroundColor: theme.COLORS.secondary,
              borderWidth: 0,
            }}
            onPress={handleClickInfo}
          ></Button>
          <Button
            title="Register"
            style={{
              marginTop: 18,
              marginBottom: 4,
              marginLeft: 12,
              flex: 1,
              borderWidth: 1,
              borderColor: theme.COLORS.secondary,
            }}
            onPress={() => {
              Linking.openURL(props.event.link);
            }}
          ></Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EventCard;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    borderRadius: 12,
    marginBottom: theme.SIZES.xxLarge,
    backgroundColor: theme.COLORS.white,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imgContainer: {
    width: "100%",
    paddingTop: theme.SIZES.xxLarge,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    width: "100%",
    padding: theme.SIZES.xLarge,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  eventImage: {
    width: 310,
    height: 310,
    borderRadius: 4,
    flex: 1,
  },
  eventTitle: {
    fontSize: theme.SIZES.xxLarge,
    color: theme.COLORS.secondary,
    marginBottom: theme.SIZES.medium,
    fontWeight: "bold",
  },
  eventDesc: {
    fontSize: theme.SIZES.large,
    color: theme.COLORS.primary,
  },
});
