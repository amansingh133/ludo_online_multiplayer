import React, { useRef, useEffect } from "react";
import { Animated, StyleSheet, View, Platform } from "react-native";

/**
 * A utility component to handle animations in React Native
 *
 * @param {Object} props
 * @param {number} props.startX - The starting X position.
 * @param {number} props.startY - The starting Y position.
 * @param {number} props.endX - The ending X position.
 * @param {number} props.endY - The ending Y position.
 * @param {number} props.duration - Duration of the animation in milliseconds.
 * @param {boolean} props.shouldFlip - Whether the component should flip during animation.
 * @param {React.ComponentType} props.Component - The component to animate.
 */

const AnimationUtility = ({
  startX,
  startY,
  endX,
  endY,
  duration,
  shouldFlip,
  Component,
}) => {
  const translateX = useRef(new Animated.Value(startX)).current;
  const translateY = useRef(new Animated.Value(startY)).current;
  const scaleX = useRef(new Animated.Value(1)).current;

  const startAnimation = () => {
    const animations = [
      Animated.timing(translateX, {
        toValue: endX,
        duration,
        useNativeDriver: Platform.OS !== "web",
      }),
      Animated.timing(translateY, {
        toValue: endY,
        duration,
        useNativeDriver: Platform.OS !== "web",
      }),
    ];

    if (shouldFlip) {
      animations.push(
        Animated.sequence([
          Animated.timing(scaleX, {
            toValue: -1,
            duration: duration / 2,
            useNativeDriver: Platform.OS !== "web",
          }),
          Animated.timing(scaleX, {
            toValue: 1,
            duration: duration / 2,
            useNativeDriver: Platform.OS !== "web",
          }),
        ])
      );
    }

    Animated.parallel(animations).start();
  };

  useEffect(() => {
    startAnimation();
  }, []);

  return (
    <Animated.View
      style={[
        styles.animatedContainer,
        {
          transform: [
            { translateX },
            { translateY },
            { scaleX }, // Flip transformation if enabled
          ],
        },
      ]}
    >
      <Component />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  animatedContainer: {
    position: "absolute",
  },
});

export default AnimationUtility;
