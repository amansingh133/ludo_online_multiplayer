import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useMemo,
} from "react";
import {
  Image,
  View,
  StyleSheet,
  Animated,
  Platform,
  Text,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import Wrapper from "../components/Wrapper";
import Dice from "../components/Dice";
import Pocket from "../components/Pocket";
import VerticalPath from "../components/paths/VerticalPath";
import HorizontalPath from "../components/paths/HorizontalPath";
import FourTriangles from "../components/FourTriangles";
import MenuModal from "../components/MenuModal";
import { playSound } from "../utils/SoundUtilityExpo";
import { RFValue } from "react-native-responsive-fontsize";
import {
  selectDiceTouch,
  selectPlayer1,
  selectPlayer2,
  selectPlayer3,
  selectPlayer4,
} from "../redux/gameReducers/gameSelectors";
import {
  selectColors,
  selectPlotData,
  selectUser,
  selectUsers,
} from "../redux/userReducers/userSelector";
import StartGame from "../assets/images/start.png";
import MenuIcon from "../assets/images/menu.png";
import { deviceWidth, deviceHeight } from "../constants/Scaling";
import PlayerDiceRow from "../components/PlayerDiceRow";
import LudoBoardArea from "../components/LudoBoardArea";

const LudoBoard = () => {
  const player1 = useSelector(selectPlayer1);
  const player2 = useSelector(selectPlayer2);
  const player3 = useSelector(selectPlayer3);
  const player4 = useSelector(selectPlayer4);
  const isDiceTouch = useSelector(selectDiceTouch);
  const colors = useSelector(selectColors);
  const plotData = useSelector(selectPlotData);
  const users = useSelector(selectUsers);
  const user = useSelector(selectUser);

  const isFocused = useIsFocused();
  const [showStartImage, setShowStartImage] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const opacity = useRef(new Animated.Value(1)).current;

  const playerNames = useMemo(() => {
    return (
      users?.reduce((acc, user) => {
        if (user?.playerNo != null) {
          acc[user.playerNo] = user.name || `UserName ${user.playerNo}`;
        }
        return acc;
      }, {}) || {
        player1: "UserName 1",
        player2: "UserName 2",
        player3: "UserName 3",
        player4: "UserName 4",
      }
    );
  }, [users]);

  const playerOpacities = useMemo(() => {
    return users?.reduce(
      (acc, u) => ({
        ...acc,
        [u?.playerNo]: u?.connectionStatus ? 1 : 0.5,
      }),
      { player1: 0.5, player2: 0.5, player3: 0.5, player4: 0.5 }
    );
  }, [users]);

  const userPlayerNo = user?.playerNo || "player1";
  const playerOrder = ["player1", "player2", "player3", "player4"];
  const userStartIndex = playerOrder.indexOf(userPlayerNo);

  const reorderedPlayers = useMemo(() => {
    const orderedPlayers = [
      {
        player: player1,
        color: colors.red,
        name: playerNames.player1,
        playerNo: "player1",
        playerNum: 1,
      },
      {
        player: player2,
        color: colors.green,
        name: playerNames.player2,
        playerNo: "player2",
        playerNum: 2,
      },
      {
        player: player3,
        color: colors.yellow,
        name: playerNames.player3,
        playerNo: "player3",
        playerNum: 3,
      },
      {
        player: player4,
        color: colors.blue,
        name: playerNames.player4,
        playerNo: "player4",
        playerNum: 4,
      },
    ];
    return [
      ...orderedPlayers.slice(userStartIndex),
      ...orderedPlayers.slice(0, userStartIndex),
    ];
  }, [player1, player2, player3, player4, colors, playerNames, userStartIndex]);

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
      <TouchableOpacity onPress={handleMenuPress} style={styles.menuButton}>
        <Image source={MenuIcon} style={styles.menuIcon} />
      </TouchableOpacity>

      <View style={styles.container}>
        <PlayerDiceRow
          players={reorderedPlayers.slice(1, 3)}
          playerOpacities={playerOpacities}
          isDiceTouch={isDiceTouch}
          alignRightIfTwoPlayers={
            reorderedPlayers.filter((p) => p.player).length === 2
          }
        />

        <LudoBoardArea
          player1={player1}
          player2={player2}
          player3={player3}
          player4={player4}
          colors={colors}
          plotData={plotData}
          playerOpacities={playerOpacities}
        />

        <PlayerDiceRow
          players={[
            ...reorderedPlayers.slice(0, 1),
            ...reorderedPlayers.slice(3),
          ]}
          playerOpacities={playerOpacities}
          isDiceTouch={isDiceTouch}
        />
      </View>

      {showStartImage && (
        <Animated.Image
          source={StartGame}
          style={[styles.startImage, { opacity }]}
        />
      )}

      {menuVisible && (
        <MenuModal
          onPressHide={() => setMenuVisible(false)}
          visible={menuVisible}
        />
      )}
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
  diceContainer: {
    flexDirection: "column",
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
  },
  plotContainer: {
    width: "100%",
    height: "40%",
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: "#ccc",
  },
  userNameText: {
    color: "white",
    fontSize: RFValue(16),
    fontFamily: "Philosopher-Bold",
  },
  menuButton: {
    position: "absolute",
    top: 50,
    left: 20,
  },
  menuIcon: {
    width: 30,
    height: 30,
  },
  startImage: {
    width: deviceWidth * 0.5,
    height: deviceWidth * 0.2,
    position: "absolute",
  },
});

export default LudoBoard;
