import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import { theme } from "../utils/theme";
import { getItem } from "../utils/asyncStorage";

const AdminScreen = () => {
  const [userData, setUserData] = useState();
  useEffect(() => {
    const getUserData = async () => {
      const data = await getItem("userData");
      console.log(data);
      setUserData(await JSON.parse(data));
    };
    getUserData();
  }, []);

  console.log(typeof userData);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.COLORS.white,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: theme.SIZES.medium,
      }}
    >
      {userData?.role === "Admin" ? (
        <Text style={{fontSize: theme.SIZES.large}}>Hi</Text>
      ) : (
        <Text style={{fontSize: theme.SIZES.large}}>Oops... Looks like you don't have permission to access this feature.</Text>
      )}
    </SafeAreaView>
  );
};

export default AdminScreen;

const styles = StyleSheet.create({});
