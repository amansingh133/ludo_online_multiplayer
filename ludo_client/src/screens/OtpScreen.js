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

const OtpScreen = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const handleMobileInput = (text) => {
    // Replace non-numeric characters and limit to 10 digits
    const cleanedText = text.replace(/[^0-9]/g, "").slice(0, 10);
    setMobileNumber(cleanedText);
  };
  const handleResend = () => {
    // Logic for resending OTP
    console.log("Resend OTP");
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
          <Text style={styles.title}>OTP</Text>

          <View style={styles.inputWrapper}>
            <InputField
              placeholder="Please Enter OTP"
              gradientColors={["#6A2DB6", "#561C9E"]}
            />
          </View>
          {/* Verify Button */}
          <CommonButton
            title="Verify"
            style={styles.button}
            textStyle={styles.buttonText}
          />

          {/* Resend Button */}
          <TouchableOpacity onPress={handleResend} style={styles.resendButton}>
            <Text style={styles.resendText}>Resend OTP</Text>
          </TouchableOpacity>
        </View>
        <View></View>
      </View>
    </Wrapper>
  );
};

export default OtpScreen;

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
    width: 300,
  },
  gradientContainer: {
    borderRadius: 20,
    padding: 2,
    width: "100%",
    borderWidth: 7,
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
  resendButton: {
    width: 200,
    height: 50,
    marginTop: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#BFABAB",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  resendText: {
    fontSize: 20,
    color: "#dbbeff",
    fontFamily: "PoetsenOne-Regular",
  },
});
