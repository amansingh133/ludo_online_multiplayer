import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import Wrapper from "../components/Wrapper";
import InputField from "../components/InputField";
import { LinearGradient } from "expo-linear-gradient";
const sharedWidth = {
  width: '100%', // Adjust as needed for your layout
}

const RegisterScreen = () => {
  return (
    <Wrapper>
      <View style={styles.container}>
        {/* logo */}
        <View></View>
        <View style={styles.logoContainer}>
          <Image
             source={require("../assets/images/ludo-logo.png")}
            style={styles.logo}
          />
        </View>
        {/* Content View */}
        <View style={styles.content}>
          <Text style={styles.title}>Signup</Text>
          <View style={styles.inputWrapper}>
            <InputField
              placeholder="Your Name"
              gradientColors={["#6A2DB6", "#561C9E"]}
              icon={require("../assets/images/profileImage.png")}
            />
            {/* Mobile Number Input with +91 prefix */}
            <LinearGradient
            colors={["#6A2DB6", "#561C9E"]}
            style={[styles.gradientContainer, { width: "100%" }]} // Match InputField width
          >
            <View style={styles.mobileInputWrapper}>
              <Text style={styles.countryCode}>+91</Text>
              <TextInput
                style={[styles.mobileInput, { width: "100%" }]} // Same width as InputField
                placeholder="Enter Mobile Number"
                keyboardType="phone-pad"
                placeholderTextColor="#aaa"
              />
            </View>
          </LinearGradient>

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
        <View></View>
      </View>
    </Wrapper>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "space-between",
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
  gradientContainer: {
    borderRadius: 30,
    padding: 2,
    width: "100%",
    borderWidth: 7,
    borderColor: "#824ACA",
  },
 
  inputWrapper: {
    ...sharedWidth,
  },
  mobileInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    // width: '100%',
    paddingHorizontal: 10, 
    ...sharedWidth, // Apply shared width
  },
  mobileInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 10, // Ensures uniform spacing inside
  },
  countryCode: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginRight: 10, // Matches icon spacing
    fontFamily: 'PoetsenOne-Regular',
  },
  mobileInput: {
    flex: 1,
    height: 40,
    color: '#aaa',
    fontSize: 16,
    fontFamily: 'PoetsenOne-Regular',
    textAlign: 'center',
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
