import { Image, View, StyleSheet, Animated, Platform } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Wrapper from "../components/Wrapper";
import { TouchableOpacity } from "react-native";
import MenuIcon from "../assets/images/menu.png";
import { deviceWidth, deviceHeight } from "../constants/Scaling";
import Dice from "../components/Dice";
import Pocket from "../components/Pocket";
import VerticalPath from "../components/paths/VerticalPath";
import HorizontalPath from "../components/paths/HorizontalPath";
import FourTriangles from "../components/FourTriangles";
import { useSelector } from "react-redux";
import {
  selectDiceTouch,
  selectPlayer1,
  selectPlayer2,
  selectPlayer3,
  selectPlayer4,
} from "../redux/gameReducers/gameSelectors";
import { useIsFocused } from "@react-navigation/native";
import StartGame from "../assets/images/start.png";
import MenuModal from "../components/MenuModal";
import { playSound } from "../utils/SoundUtilityExpo";
import WinModal from "../components/WinModal";

import {
  selectColors,
  selectPlotData,
  selectUser,
  selectUsers,
} from "../redux/userReducers/userSelector";

const LudoScreen = () => {
  const player1 = useSelector(selectPlayer1);
  const player2 = useSelector(selectPlayer2);
  const player3 = useSelector(selectPlayer3);
  const player4 = useSelector(selectPlayer4);
  const isDiceTouch = useSelector(selectDiceTouch);
  const winners = useSelector((state) => state.game.winner);
  const colors = useSelector(selectColors);
  const plotData = useSelector(selectPlotData);
  const users = useSelector(selectUsers);
  const user = useSelector(selectUser);

  const playerNames =
    users && users.length > 0
      ? users.reduce((acc, user) => {
          if (user && user.playerNo != null) {
            acc[user.playerNo] = user.name || `UserName ${user.playerNo}`;
          }
          return acc;
        }, {})
      : {
          player1: "UserName 1",
          player2: "UserName 2",
          player3: "UserName 3",
          player4: "UserName 4",
        };

  const isFocused = useIsFocused();

  const [showStartImage, setShowStartImage] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isFocused) {
      setShowStartImage(true);
      const blinkAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(opacity, {
            toValue: 0,
            duration: 500,
            useNativeDriver: Platform.OS !== "web",
          }),
          Animated.timing(opacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: Platform.OS !== "web",
          }),
        ])
      );

      blinkAnimation.start();

      const timeout = setTimeout(() => {
        blinkAnimation.stop();
        setShowStartImage(false);
      }, 2500);

      return () => {
        blinkAnimation.stop();
        clearTimeout(timeout);
      };
    }
  }, [isFocused]);

  const handleMenuPress = useCallback(() => {
    playSound("ui");
    setMenuVisible(true);
  }, []);

  return (
    <Wrapper>
      <TouchableOpacity
        onPress={handleMenuPress}
        style={{ position: "absolute", top: 50, left: 20 }}
      >
        <Image source={MenuIcon} style={{ width: 30, height: 30 }} />
      </TouchableOpacity>

      <View style={styles.container}>
        <View
          style={styles.flexRow}
          pointerEvents={isDiceTouch ? "none" : "auto"}
        >
          <Dice
            color={colors.green}
            player={2}
            data={player2}
            username={playerNames.player2}
          />
          <Dice
            color={colors.yellow}
            rotate
            player={3}
            data={player3}
            username={playerNames.player3}
          />
        </View>

        <View style={styles.ludoBoard}>
          <View style={styles.plotContainer}>
            <Pocket color={colors.green} player={2} data={player2} />
            <VerticalPath cells={plotData.Plot2Data} color={colors.yellow} />
            <Pocket color={colors.yellow} player={3} data={player3} />
          </View>

          <View style={styles.pathContainer}>
            <HorizontalPath cells={plotData.Plot1Data} color={colors.green} />
            <FourTriangles
              player1={player1}
              player2={player2}
              player3={player3}
              player4={player4}
            />
            <HorizontalPath cells={plotData.Plot3Data} color={colors.blue} />
          </View>

          <View style={styles.plotContainer}>
            <Pocket color={colors.red} player={1} data={player1} />
            <VerticalPath cells={plotData.Plot4Data} color={colors.red} />
            <Pocket color={colors.blue} player={4} data={player4} />
          </View>
        </View>

        <View
          style={styles.flexRow}
          pointerEvents={isDiceTouch ? "none" : "auto"}
        >
          <Dice
            color={colors.red}
            player={1}
            data={player1}
            username={playerNames.player1}
          />
          <Dice
            color={colors.blue}
            rotate
            player={4}
            data={player4}
            username={playerNames.player4}
          />
        </View>
      </View>

      {showStartImage && (
        <Animated.Image
          source={StartGame}
          style={{
            width: deviceWidth * 0.5,
            height: deviceWidth * 0.2,
            position: "absolute",
            opacity,
          }}
        />
      )}

      {menuVisible && (
        <MenuModal
          onPressHide={() => setMenuVisible(false)}
          visible={menuVisible}
        />
      )}

      {/* {winners != null && <WinModal winner={winners} />} */}
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    justifyContent: "center",
    height: deviceHeight * 0.5,
    width: deviceWidth,
  },
  flexRow: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 30,
  },
  pathContainer: {
    flexDirection: "row",
    width: "100%",
    height: "20%",
    justifyContent: "space-between",
    backgroundColor: "#1e5162",
  },
  ludoBoard: {
    width: "100%",
    height: "100%",
    alignSelf: "center",
    padding: 10,
  },
  plotContainer: {
    width: "100%",
    height: "40%",
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: "#ccc",
  },
});

export default LudoScreen;
