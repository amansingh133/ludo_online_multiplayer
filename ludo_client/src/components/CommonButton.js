import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const CommonButton = ({ title, onPress, style, textStyle }) => {
  return (
    <LinearGradient
      colors={["#9D76F1", "#35086C"]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={[styles.gradient, style]}
    >
      <TouchableOpacity
        style={[styles.button, styles.shadow]}
        onPress={onPress}
        activeOpacity={1}
      >
        {/* Outline Text */}
        <Text style={[styles.outlineText, textStyle]}>{title}</Text>
        {/* Main Text */}
        <Text style={[styles.mainText, textStyle]}>{title}</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    borderRadius: 10,
    width: 180,
    borderWidth: 1,
    borderColor: "#fff",
  },
  button: {
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    width: 180,
    height: 50,
    fontWeight: "bold",
  },
  outlineText: {
    position: "absolute",
    color: "black",
    fontSize: 18,
    fontFamily: "PoetsenOne-Regular",
    textAlign: "center",
    textShadowColor: "black",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  mainText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "PoetsenOne-Regular",
    textAlign: "center",
  },
});

export default CommonButton;
