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

const Footer = () => {
  return (
    <LinearGradient
      colors={["#9653E9", "#6425B3"]}
      start={{ x: 0.5, y: 0.5 }}
      end={{ x: 1, y: 1 }}
      style={[styles.gradient, { width: width }]} // Dynamically set the width
    >
      <View style={styles.footer}>
        {/* Refer Icon */}
        <View style={styles.iconContainer}>
          <Image
            source={require("../assets/images/referIcon.png")}
            style={styles.icon}
          />
          <Text style={styles.iconText}>REFER</Text>
        </View>

        {/* Home Icon */}
        <View style={styles.iconContainer}>
          <Image
            source={require("../assets/images/homeIcon.png")}
            style={styles.icon}
          />
          <Text style={styles.iconText}>HOME</Text>
        </View>

        {/* Wallet Icon */}
        <View style={styles.iconhoverContainer}>
          <Image
            source={require("../assets/images/wallet-hover.png")}
            style={styles.iconwallet}
          />
          <Text style={styles.iconTexthover}>WALLET</Text>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // padding: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    height: 60,
  },
  iconContainer: {
    alignItems: "center",
    marginTop: 6,
  },
  icon: {
    width: 30,
    height: 25,
  },
  iconText: {
    fontSize: 13,
    color: "#FFF",
    marginTop: 8,
    lineHeight: 18.14,
    fontWeight: "400",
    fontFamily: "Wallpoet-Regular",
  },
  iconwallet:{
    width:55,
    height:50,
    position:'absolute',
    bottom:10
  },
  iconhoverContainer:{
    gap:20,
  },
  iconTexthover:{
    top:18,
    fontFamily: "Wallpoet-Regular",
    fontWeight: "400",
    color:'#fff',
    fontSize: 13,
  }
});

export default Footer;
