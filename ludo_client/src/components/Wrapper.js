import { StyleSheet, ImageBackground, SafeAreaView } from "react-native";
import React from "react";
import BG from "../assets/images/main-bg.png";
import { deviceHeight, deviceWidth } from "../constants/Scaling";

const Wrapper = ({ children, style }) => {
  return (
    <ImageBackground source={BG} resizeMode="cover" style={styles.background}>
      <SafeAreaView style={[styles.container, { ...style }]}>
        {children}
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    height: "100%",
    width: "100%",
  },
  container: {
    width: deviceWidth,
    height: deviceHeight,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Wrapper;
