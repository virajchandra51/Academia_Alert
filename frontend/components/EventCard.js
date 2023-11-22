import { StyleSheet, Text, View, Image, SafeAreaView } from "react-native";
import React from "react";
import { theme } from "../utils/theme";

const EventCard = (props) => {
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
        <Text style={styles.eventTitle}>Title : {props.event.title}</Text>
        <Text style={styles.eventDesc}>Desc : {props.event.desc}</Text>
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
    padding: theme.SIZES.xxLarge,
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
    fontSize: theme.SIZES.xLarge,
    color: theme.COLORS.secondary,
    marginVertical: theme.SIZES.small,
    fontWeight: "bold",
  },
  eventDesc: {
    fontSize: theme.SIZES.large,
    color: theme.COLORS.primary,
  },
});
