import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import Wrapper from "../components/Wrapper";
import Header from "../components/Header";
import Icon from "react-native-vector-icons/MaterialIcons";
import Footer from "../components/Footer";

const { width } = Dimensions.get("window");

const ReferScreen = () => {
  return (
    <Wrapper>
      <View style={styles.container}>
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
            <Text style={styles.title}>REFER</Text>

            <Text style={styles.title}></Text>
          </View>
        </LinearGradient>

        {/* referContainer */}
        <View></View>
        <View style={styles.referContainer}>
          <Text style={styles.referText}>Refer Friends</Text>
          <Text style={styles.referSmallTxt}>
            You can also use as a Referal code
          </Text>

          <Image
            source={require("../assets/images/referImage.png")}
            style={styles.referImage}
          />

          {/* referral code */}
          <View style={styles.referraLContainer}>
            <View style={styles.referral}>
              <Text style={styles.referralText}>F5M96BZ755</Text>
            </View>
            <View style={styles.buttonContainer}>
              <LinearGradient
                colors={["#9653E9", "#6425B3"]}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                style={styles.gradientBackground}
              >
                <View style={styles.iconContainer}>
                  <Icon name="content-copy" size={22} color="#fff" />
                </View>
              </LinearGradient>
            </View>
          </View>

          {/* share icons */}
          <View style={styles.iconsContainer}>
            {/* wtspicon */}
            <Image
              source={require("../assets/images/wtsppIcon.png")}
              style={styles.icons}
            />
            {/* fbIcon */}
            <Image
              source={require("../assets/images/fbIcon.png")}
              style={styles.icons}
            />
            {/* shareIcon */}
            <Image
              source={require("../assets/images/shareIcon.png")}
              style={styles.icons}
            />
          </View>
          <View></View>
        </View>
        <Footer></Footer>
      </View>
    </Wrapper>
  );
};

export default ReferScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "space-between",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
  referContainer: {
    width: width * 0.9,
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
  },
  referText: {
    color: "#fff",
    fontFamily: "PoetsenOne-Regular",
    fontSize: 30,
  },
  referSmallTxt: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "400",
  },
  referImage: {
    width: width * 0.9,
    height: 280,
    resizeMode: "contain",
  },
  referraLContainer: {
    width: width * 0.9,
    flexDirection: "row",
    gap: 10,
  },
  referral: {
    backgroundColor: "#E8E4E433",
    borderWidth: 1.69,
    borderColor: "#838383",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    width: 260,
  },
  referralText: {
    fontSize: 16,
    color: "#fff",
    fontFamily: "PoetsenOne-Regular",
    fontWeight: "400",
  },
  buttonContainer: {
    width: 50,
    height: 50,
    borderRadius: 16,
    overflow: "hidden",
  },
  gradientBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 6.75,
      height: 64.14,
    },
  },
  iconContainer: {
    backgroundColor: "transparent",
    shadowColor: "#FFF",
    shadowOffset: {
      width: -5.06,
      height: -6.75,
    },
    padding: 10,
    borderRadius: 10,
  },
  iconsContainer: {
    width: width * 0.9,
    flexDirection: "row",
    gap: 15,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  icons: {
    width: 40,
    height: 40,
  },
});
