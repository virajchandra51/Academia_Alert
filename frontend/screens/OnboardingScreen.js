import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Onboarding from "react-native-onboarding-swiper";
import Lottie from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";
import { setItem } from "../utils/asyncStorage";
import { theme } from "../utils/theme";

const { width, height } = Dimensions.get("window");

export default function OnboardingScreen() {
  const navigation = useNavigation();

  const handleDone = () => {
    navigation.navigate("Signup");
    setItem("onboarded", "1");
  };

  const doneButton = ({ ...props }) => {
    return (
      <TouchableOpacity style={styles.doneButton} {...props}>
        <Text style={styles.doneButtonText}>Get Started</Text>
      </TouchableOpacity>
    );
  };

  const nextButton = ({ ...props }) => {
    return (
      <TouchableOpacity style={styles.doneButton} {...props}>
        <Text style={styles.doneButtonText}>Next</Text>
      </TouchableOpacity>
    );
  };

  const skipButton = ({ ...props }) => {
    return (
      <TouchableOpacity style={styles.skipButton} {...props}>
        <Text style={styles.skipButtonText}>Skip</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Onboarding
        onDone={handleDone}
        bottomBarHeight={80}
        onSkip={handleDone}
        bottomBarHighlight={false}
        DoneButtonComponent={doneButton}
        NextButtonComponent={nextButton}
        SkipButtonComponent={skipButton}
        containerStyles={{ paddingHorizontal: 16, paddingBottom: 100 }}
        titleStyles={styles.title}
        subTitleStyles={styles.subtitle}
        imageContainerStyles={styles.image}
        pages={[
          {
            backgroundColor: "#fff",
            image: (
              <View style={styles.lottie}>
                <Lottie
                  source={require("../assets/animations/boost.json")}
                  autoPlay
                  loop
                />
              </View>
            ),
            title: "Welcome to Academia Alert",
            subtitle:
              "Stay informed about the latest announcements, events, and activities tailored just for you. Let's embark on this academic journey together!",
          },
          {
            backgroundColor: "#fff",
            image: (
              <View style={styles.lottie}>
                <Lottie
                  source={require("../assets/animations/work.json")}
                  autoPlay
                  loop
                />
              </View>
            ),
            title: "Never Miss an Update",
            subtitle:
              "Don't miss important announcements! Academia Alert keeps you in the loop with real-time updates on event schedules and campus news.",
          },
          {
            backgroundColor: "#fff",
            image: (
              <View style={styles.lottie}>
                <Lottie
                  source={require("../assets/animations/achieve.json")}
                  autoPlay
                  loop
                />
              </View>
            ),
            title: "Events that Shape Your College Experience",
            subtitle:
              "Discover and participate in a myriad of events shaping the vibrant culture at NIT Raipur. From tech fests to cultural extravaganzas, Academia Alert is your go-to guide.",
          },
        ]}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.COLORS.white,
  },
  lottie: {
    width: width * 0.9,
    height: width,
  },
  doneButton: {
    backgroundColor: theme.COLORS.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
    marginRight: 30,
  },
  doneButtonText: {
    color: theme.COLORS.white,
    fontSize: 16,
  },
  skipButton: {
    backgroundColor: theme.COLORS.white,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
    marginLeft: 30,
    borderColor: theme.COLORS.primary,
    borderWidth: 1,
  },
  skipButtonText: {
    fontSize: 16,
  },
  title: {
    fontWeight: "800",
    color: theme.COLORS.primary,
  },
  subtitle: {
    color: theme.COLORS.gray,
  },
  image: {
    paddingBottom: 30,
    paddingTop: 0,
    scale: 0.9,
  },
});
