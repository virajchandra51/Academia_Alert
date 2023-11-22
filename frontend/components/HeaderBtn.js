import { Image, TouchableOpacity, StyleSheet } from "react-native";
import { theme } from "../utils/theme";

const HeaderBtn = ({ iconUrl, dimension, handlePress }) => {
  return (
    <TouchableOpacity style={styles.btnContainer} onPress={handlePress}>
      <Image
        source={iconUrl}
        resizeMode='cover'
        style={styles.btnImg(dimension)}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    btnContainer: {
      width: 40,
      height: 40,
      backgroundColor: theme.COLORS.white,
      borderRadius: theme.SIZES.small / 1.25,
      justifyContent: "center",
      alignItems: "center",
      marginHorizontal: 10,
    },
    btnImg: (dimension) => ({
      width: dimension,
      height: dimension,
      borderRadius: theme.SIZES.small / 1.25,
    }),
  });

export default HeaderBtn;