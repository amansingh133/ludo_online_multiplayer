import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import Wrapper from "../components/Wrapper";
import InputField from "../components/InputField";
import { LinearGradient } from "expo-linear-gradient";
import CommonButton from "../components/CommonButton";

const LoginScreen = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const handleMobileInput = (text) => {
    const cleanedText = text.replace(/[^0-9]/g, "").slice(0, 10);
    setMobileNumber(cleanedText);
  };

  return (
    <Wrapper>
      <View style={styles.container}>
        {/* logo */}
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/images/ludo-logo.png")}
            style={styles.logo}
          />
        </View>
        {/* Content View */}
        <View style={styles.content}>
          <Text style={styles.title}>SingIn</Text>
          <View style={styles.inputWrapper}>
            {/* Mobile Number Input with +91 prefix */}
            <LinearGradient
              colors={["#6A2DB6", "#561C9E"]}
              style={styles.gradientContainer}
            >
              <View style={styles.mobileInputWrapper}>
                <Text style={styles.countryCode}>+91</Text>
                <TextInput
                  style={styles.mobileInput}
                  placeholder="Enter Mobile Number"
                  placeholderTextColor="#aaa"
                  keyboardType="numeric"
                  maxLength={10}
                  value={mobileNumber}
                  onChangeText={handleMobileInput}
                />
              </View>
            </LinearGradient>

            <CommonButton
              title="Get OTP"
              style={styles.button}
              textStyle={styles.buttonText}
            />
          </View>
          <View></View>

          {/* Wrapping TouchableOpacity inside a View */}
          <View style={styles.signInWrapper}>
            <TouchableOpacity>
              <Text style={styles.signInText}>
                Already have an account?{" "}
                <Text style={styles.signInLink}>SIGN IN</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Wrapper>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  logoContainer: {
    alignItems: "center",
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  content: {
    display: "flex",
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "400",
    color: "#fff",
    fontFamily: "PoetsenOne-Regular",
  },
  inputWrapper: {
    marginVertical: 10,
    alignItems: "center",
    gap: 20,
  },
  gradientContainer: {
    borderRadius: 30,
    padding: 3,
    width: "100%",
    borderWidth: 6,
    borderColor: "#824ACA",
  },
  mobileInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    fontFamily: "PoetsenOne-Regular",
  },
  countryCode: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    marginLeft: 10,
    marginRight: 10,
    fontFamily: "PoetsenOne-Regular",
  },
  mobileInput: {
    flex: 1,
    height: 35,
    paddingLeft: 10,
    fontSize: 16,
    color: "#aaa",
    fontFamily: "PoetsenOne-Regular",
  },
  signInWrapper: {
    marginTop: 20, // Adjust spacing as needed
    alignItems: "center",
    justifyContent: "center",
    width: 300,
  },
  signInText: {
    fontSize: 14,
    color: "#fff",
    fontFamily: "PoetsenOne-Regular",
  },
  signInLink: {
    color: "#dbbeff",
    fontFamily: "PoetsenOne-Regular",
  },
});
