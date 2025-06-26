import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
  Easing,
  Platform,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
// import { LinearGradient } from "react-native-linear-gradient";
import { LinearGradient } from "expo-linear-gradient";
import { BackgroundImage } from "../utils/GetIcons";
import LottieView from "lottie-react-native";
import DiceRoll from "../assets/animation/diceroll.json";
import Arrow from "../assets/images/arrow.png";
import { useDispatch, useSelector } from "react-redux";

import {
  selectCurrentPlayerChance,
  selectDiceNo,
  selectDiceRolled,
  selectDiceRolling,
  selectGameStatus,
} from "../redux/gameReducers/gameSelectors";
import { emitSocketEvent } from "../redux/userReducers/userActions";
import {
  selectUser,
  selectUserConnection,
  selectUserStatus,
} from "../redux/userReducers/userSelector";

const Dice = React.memo(({ color, rotate, player, data, connectedOpacity }) => {
  const dispatch = useDispatch();
  const currentPlayerChance = useSelector(selectCurrentPlayerChance);
  const isDiceRolled = useSelector(selectDiceRolled);
  const diceNo = useSelector(selectDiceNo);
  const user = useSelector(selectUser);
  const userStatus = useSelector(selectUserStatus);
  const userConnection = useSelector(selectUserConnection);
  const gameStatus = useSelector(selectGameStatus);
  const tokenIcon = BackgroundImage.GetImage(color);
  const diceIcon = BackgroundImage.GetImage(diceNo);

  const arrowAnim = useRef(new Animated.Value(0)).current;

  const diceRolling = useSelector(selectDiceRolling) || false;

  useEffect(() => {
    const animateArrow = () => {
      return Animated.loop(
        Animated.sequence([
          Animated.timing(arrowAnim, {
            toValue: 10,
            duration: 600,
            easing: Easing.out(Easing.ease),
            useNativeDriver: Platform.OS !== "web",
          }),
          Animated.timing(arrowAnim, {
            toValue: -10,
            duration: 600,
            easing: Easing.in(Easing.ease),
            useNativeDriver: Platform.OS !== "web",
          }),
        ])
      );
    };

    const animation = animateArrow();
    animation.start();

    return () => {
      animation.stop();
    };
  }, [currentPlayerChance, isDiceRolled]);

  const handleDicePress = async () => {
    if (
      userStatus === "inGame" &&
      userConnection === true &&
      gameStatus === "running"
    ) {
      dispatch(emitSocketEvent("dicePress"));
    }
  };

  return (
    <View style={[{ opacity: connectedOpacity }]}>
      <View
        style={[styles.flexRow, { transform: [{ scaleX: rotate ? -1 : 1 }] }]}
      >
        <View style={styles.border1}>
          <LinearGradient
            style={styles.linearGradient}
            colors={["#0052be", "#5f9fcb", "#97c6c9"]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
          >
            <View style={styles.tokenContainer}>
              <Image source={tokenIcon} style={styles.tokenIcon} />
            </View>
          </LinearGradient>
        </View>
        <View style={styles.border2}>
          <LinearGradient
            style={styles.diceGradient}
            colors={["#aac8ab", "#aac8ab", "#aac8ab"]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
          >
            <View style={styles.diceContainer}>
              {currentPlayerChance === player && !diceRolling && (
                <TouchableOpacity
                  disabled={
                    isDiceRolled || user?.playerNo !== `player${player}`
                  }
                  activeOpacity={0.4}
                  onPress={handleDicePress}
                >
                  <Image source={diceIcon} style={styles.dice} />
                </TouchableOpacity>
              )}
            </View>
          </LinearGradient>
        </View>

        {currentPlayerChance === player && !isDiceRolled && (
          <Animated.View style={{ transform: [{ translateX: arrowAnim }] }}>
            <Image source={Arrow} style={{ width: 50, height: 30 }} />
          </Animated.View>
        )}
        {/* {currentPlayerChance === player && diceRolling && (
        <LottieView
          source={DiceRoll}
          style={styles.rollingDice}
          loop={false}
          autoPlay
          cacheComposition={true}
          hardwareAccelerationAndroid={true}
        />
      )} */}
        {currentPlayerChance === player &&
          diceRolling &&
          Platform.OS !== "web" && (
            <LottieView
              source={DiceRoll}
              style={styles.rollingDice}
              loop={false}
              autoPlay
              cacheComposition={true}
              hardwareAccelerationAndroid={true}
            />
          )}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  diceGradient: {
    borderWidth: 3,
    borderLeftWidth: 3,
    borderColor: "#f0ce2c",
    justifyContent: "center",
    alignItems: "center",
  },
  rollingDice: {
    height: 80,
    width: 80,
    zIndex: 99,
    top: -25,
    position: "absolute",
  },
  dice: {
    height: 45,
    width: 45,
  },
  diceContainer: {
    backgroundColor: "#e8c0c1",
    borderWidth: 1,
    borderRadius: 5,
    width: 55,
    height: 55,
    paddingHorizontal: 8,
    padding: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  flexRow: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  border1: {
    borderWidth: 3,
    borderRightWidth: 0,
    borderColor: "#f0cec2",
  },
  border2: {
    borderWidth: 3,
    padding: 1,
    backgroundColor: "#aac8ab",
    borderRadius: 10,
    borderLeftWidth: 3,
    borderColor: "#aac8ab",
  },
  tokenIcon: {
    width: 35,
    height: 35,
  },
  tokenContainer: {
    paddingHorizontal: 3,
  },

  skipIndicator: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
});

export default Dice;
