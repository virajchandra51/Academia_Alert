import { StyleSheet, Text, View, Image, SafeAreaView } from "react-native";
import React from "react";
import { theme } from "../utils/theme";

const EventCard = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image
          resizeMode="contain"
          source={props.event.img}
          style={styles.eventImage}
        />
      </View>
      <Text>{props.event.title}</Text>
    </SafeAreaView>
  );
};

export default EventCard;

const styles = StyleSheet.create({
  container: {
    width: "100",
  },
  eventImage: {
    width: "100%",
  },
});
