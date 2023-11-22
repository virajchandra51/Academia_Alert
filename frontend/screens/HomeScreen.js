import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import EventCard from "../components/EventCard";
import EventsData from "../assets/eventsData";
import { theme } from "../utils/theme";
import search from "../assets/icons/search.png";

const HomeScreen = () => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.COLORS.white,
        paddingHorizontal: theme.SIZES.medium,
      }}
    >
      <View style={styles.container}>
        <Text style={styles.userName}>Hi, Viraj Chandra 👋🏻</Text>
        <Text style={styles.welcomeMessage}>
          Catch up with the NITRR campus buzz!
        </Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={searchTerm}
            onChangeText={(text) => setSearchTerm(text)}
            placeholder="What news are you looking for?"
          />
        </View>

        <TouchableOpacity style={styles.searchBtn}>
          <Image
            source={search}
            resizeMode="contain"
            style={styles.searchBtnImage}
          />
        </TouchableOpacity>
      </View>
      <ScrollView
        style={{
          marginVertical: theme.SIZES.large,
          padding: theme.SIZES.xSmall,
          flex: 1,
        }}
        showsVerticalScrollIndicator="false"
      >
        {EventsData.map((event, index) => {
          return <EventCard event={event} key={index} />;
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  userName: {
    fontSize: theme.SIZES.xLarge,
    color: theme.COLORS.secondary,
    marginVertical: theme.SIZES.small,
    fontWeight: "bold",
  },
  welcomeMessage: {
    fontSize: theme.SIZES.large,
    color: theme.COLORS.primary,
  },
  searchContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: theme.SIZES.large,
    height: 50,
    borderColor: theme.COLORS.gray,
  },
  searchWrapper: {
    flex: 1,
    backgroundColor: theme.COLORS.white,
    marginRight: theme.SIZES.small,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  searchInput: {
    borderRadius: theme.SIZES.medium,
    width: "100%",
    height: "100%",
    backgroundColor: theme.COLORS.lightgray,
    paddingHorizontal: theme.SIZES.medium,
  },
  searchBtn: {
    width: 50,
    height: "100%",
    backgroundColor: theme.COLORS.secondary,
    borderRadius: theme.SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  },
  searchBtnImage: {
    width: "50%",
    height: "50%",
    tintColor: theme.COLORS.white,
  },
});
