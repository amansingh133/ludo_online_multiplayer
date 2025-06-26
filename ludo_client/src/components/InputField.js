import React from "react";
import { TextInput, StyleSheet, View, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const InputField = ({
  placeholder,
  value,
  onChangeText,
  gradientColors = ["#050B62", "#090A5A"], // Default background color
  borderColor = "#824ACA", // Default border color
  style,
  icon,
  ...props
}) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={gradientColors}
        style={[styles.gradientContainer, { borderColor: borderColor }]} // Gradient container with border
      >
        <View style={styles.inputWrapper}>
          {icon && <Image source={icon} style={styles.icon} />}
          <TextInput
            style={[styles.input, style]}
            placeholder={placeholder}
            placeholderTextColor="#aaa"
            value={value}
            onChangeText={onChangeText}
            {...props} // Additional props like keyboardType, secureTextEntry, etc.
          />
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    width: "100%", // Ensures full width for InputField
  },
  gradientContainer: {
    borderWidth: 6,
    borderRadius: 30,
    padding: 3,
    width: "100%",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  input: {
    flex: 1,
    height: 40,
    borderRadius: 8,
    backgroundColor: "transparent",
    color: "#AAA8A8",
    fontFamily: "PoetsenOne-Regular",
    textAlign: "center",
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10, // Aligns with the gap used for +91
    marginLeft: 10, // Optional: Adds left margin to position it similarly to +91
  },
});

export default InputField;
