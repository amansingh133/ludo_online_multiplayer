import { View, Text, StyleSheet, Image, Animated, Easing } from "react-native";
import React, { useEffect, useRef } from "react";
import Wrapper from "../components/Wrapper";

const LoadingScreen = () => {
  const rotateAnimation = useRef(new Animated.Value(0)).current;
  const innerRotateAnimation = useRef(new Animated.Value(0)).current;
  const innermostRotateAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Rotate the outer circle infinitely
    Animated.loop(
      Animated.timing(rotateAnimation, {
        toValue: 1,
        duration: 8000,
        easing: Easing.linear,
        useNativeDriver: false,
      })
    ).start();

    // Rotate the inner circle with a slower duration
    Animated.loop(
      Animated.timing(innerRotateAnimation, {
        toValue: 1,
        duration: 12000,
        easing: Easing.linear,
        useNativeDriver: false,
      })
    ).start();

    // Rotate the innermost circle with an even slower duration
    Animated.loop(
      Animated.timing(innermostRotateAnimation, {
        toValue: 1,
        duration: 16000,
        easing: Easing.linear,
        useNativeDriver: false,
      })
    ).start();
  }, []);

  const outerRotation = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const innerRotation = innerRotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const innermostRotation = innermostRotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <Wrapper>
      <View style={styles.container}>
        {/* <Text style={styles.title}>Ludo Singh</Text> */}
        <View style={styles.logoConatiner}>
          <Image
            source={require("../assets/images/ludo-logo.png")}
            style={styles.logo}
          />
        </View>

        {/* Outer Rotating Circle */}
        <Animated.View
          style={[
            styles.circleContainer,
            { transform: [{ rotate: outerRotation }] },
          ]}
        >
          {/* Outer Circle Content */}
          <Image
            source={require("../assets/images/player1.png")}
            style={[styles.avatar, styles.top]}
          />

          {/* Inner Rotating Circle */}
          <Animated.View
            style={[
              styles.innerCircle,
              { transform: [{ rotate: innerRotation }] },
            ]}
          >
            {/* Inner Circle Content */}
            <Image
              source={require("../assets/images/player2.png")}
              style={[styles.avatar, styles.right]}
            />

            {/* Innermost Rotating Circle */}
            <Animated.View
              style={[
                styles.innermostCircle,
                { transform: [{ rotate: innermostRotation }] },
              ]}
            >
              {/* Innermost Circle Content */}
              <Image
                source={require("../assets/images/player4.png")}
                style={[styles.avatar, styles.left]}
              />
            </Animated.View>
          </Animated.View>
        </Animated.View>

        {/* Center Avatar */}
        <View style={styles.centerAvatarContainer}>
          <Image
            source={require("../assets/images/player4.png")}
            style={styles.centerAvatar}
          />
        </View>

        <Text style={styles.loading}>Loading ...</Text>

        <View></View>
      </View>
    </Wrapper>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#FFD700",
    marginBottom: 20,
  },
  logoConatiner: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  circleContainer: {
    width: 350,
    height: 350,
    borderWidth: 2,
    borderColor: "#fff",
    borderRadius: 180,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },

  innerCircle: {
    width: 260,
    height: 260,
    borderWidth: 2,
    borderColor: "#FFD700",
    borderRadius: 130,
    position: "absolute",
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },

  innermostCircle: {
    width: 180,
    height: 180,
    borderWidth: 2,
    borderColor: "#FF4500",
    borderRadius: 100,
    position: "absolute",
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },

  centerAvatarContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    transform: [{ translateX: -50 }, { translateY: -22 }],
    zIndex: 1,
  },

  avatar: {
    width: 50,
    height: 50,
    position: "absolute",
  },

  top: {
    top: -25,
    left: 125,
  },

  right: {
    right: -25,
    top: 125,
  },

  left: {
    left: -25,
    top: 75,
  },

  centerAvatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },

  loading: {
    marginTop: 20,
    fontSize: 20,
    color: "#fff",
    fontFamily: "PoetsenOne-Regular",
    fontWeight: "500",
  },
});
