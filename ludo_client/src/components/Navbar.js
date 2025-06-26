import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

// Get screen width
const { width } = Dimensions.get("window");

const Navbar = ({ title, onPress, style, textStyle }) => {
  return (
    <LinearGradient
      colors={["#9653E9", "#6425B3"]}
      start={{ x: 0.5, y: 0.5 }}
      end={{ x: 1, y: 1 }}
      style={[styles.gradient, { width: width }]} // Dynamically set the width
    >
      <View style={styles.header}>
        {/* Back Button */}
        <TouchableOpacity>
          <Image
            source={require("../assets/images/backBtn.png")} // Replace with your image path
            style={styles.backBtn}
          />
        </TouchableOpacity>

        {/* Title */}
        <Text style={styles.title}>{title}</Text>

        {/* User Avatar */}
        <Image
          source={require("../assets/images/profileImage.png")} // Replace with your image path
          style={styles.avatar}
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // borderWidth:2,
    paddingHorizontal: 10,
  },
  backBtn: {
    width: 60,
    height: 60,
  },
  title: {
    fontSize: 20,
    fontFamily: "PoetsenOne-Regular",
    fontWeight: "400",
    color: "#FFF",
    textAlign: "center",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 20,
  },
});

export default Navbar;
