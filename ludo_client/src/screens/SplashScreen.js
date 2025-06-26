import {
  Image,
  StyleSheet,
  Animated,
  ActivityIndicator,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import Wrapper from "../components/Wrapper";
import Logo from "../assets/images/logo.png";
import { deviceWidth, deviceHeight } from "../constants/Scaling";
import { prepareNavigation, resetAndNavigate } from "../utils/NavigationUtils";
import { useDispatch, useSelector } from "react-redux";
import {
  selectGameId,
  selectUser,
  selectUserStatus,
} from "../redux/userReducers/userSelector";
import { selectGameStatus } from "../redux/gameReducers/gameSelectors";
import { connectSocket } from "../redux/userReducers/userActions";

const SplashScreen = () => {
  const dispatch = useDispatch();
  const [isStop] = useState(false);
  const scale = new Animated.Value(1);

  const userStatus = useSelector(selectUserStatus);
  const gameId = useSelector(selectGameId);
  const gameStatus = useSelector(selectGameStatus);
  const user = useSelector(selectUser);

  useEffect(() => {
    prepareNavigation();

    if (
      userStatus === "inGame" &&
      gameId !== null &&
      gameStatus === "running" &&
      user !== null
    ) {
      dispatch(connectSocket({ type: "rejoinUser", userId: user.userId }));
    }

    const timer = setTimeout(() => {
      setTimeout(() => {
        if (
          userStatus === "inGame" &&
          gameId !== null &&
          gameStatus === "running" &&
          user !== null
        ) {
          resetAndNavigate("LudoBoard");
        } else {
          resetAndNavigate("HomeScreen");
        }
      }, 1500);
    }, 1500);

    return () => clearTimeout(timer);
  }, [userStatus, gameId, gameStatus, user]);

  useEffect(() => {
    const breathingAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.1,
          duration: 2000,
          useNativeDriver: Platform.OS !== "web",
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: Platform.OS !== "web",
        }),
      ])
    );

    if (!isStop) {
      breathingAnimation.start();
    }

    return () => {
      breathingAnimation.stop();
    };
  }, [isStop]);

  return (
    <Wrapper>
      <Animated.View style={[styles.imgContainer, { transform: [{ scale }] }]}>
        {/* <Image source={Logo} style={styles.img} /> */}
      </Animated.View>

      <ActivityIndicator size="small" color="white" />
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  imgContainer: {
    width: deviceWidth * 0.7,
    height: deviceHeight * 0.6,
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});

export default SplashScreen;
