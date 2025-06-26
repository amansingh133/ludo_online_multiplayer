import { View, StyleSheet, Platform } from "react-native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import LottieView from "lottie-react-native";
import Fireworks from "../assets/animation/firework.json";
import Svg, { Polygon } from "react-native-svg";
import { useDispatch, useSelector } from "react-redux";
import { selectFireworks } from "../redux/gameReducers/gameSelectors";
import { updateFireworks } from "../redux/gameReducers/gameSlice";
import PlayerPieces from "./PlayerPieces";
import { selectColors, selectUser } from "../redux/userReducers/userSelector";

const FourTriangles = ({ player1, player2, player3, player4 }) => {
  const size = 300;
  const [blast, setBlast] = useState(false);
  const isFirework = useSelector(selectFireworks);
  const colors = useSelector(selectColors);

  const dispatch = useDispatch();

  // console.log("Player 1", player1);
  // console.log("Player 2", player2);
  // console.log("Player 3", player3);
  // console.log("Player 4", player4);

  useEffect(() => {
    if (isFirework) {
      setBlast(true);
      const timer = setTimeout(() => {
        setBlast(false);
        dispatch(updateFireworks(false));
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [dispatch, isFirework]);

  const playerData = useMemo(
    () => [
      {
        player: player1,
        top: 55,
        left: 15,
        pieceColor: colors.red,
        translate: "translateX",
      },
      {
        player: player3,
        top: 52,
        left: 15,
        pieceColor: colors.yellow,
        translate: "translateX",
      },
      {
        player: player2,
        top: 20,
        left: -2,
        pieceColor: colors.green,
        translate: "translateY",
      },
      {
        player: player4,
        top: 20,
        right: -2,
        pieceColor: colors.blue,
        translate: "translateY",
      },
    ],
    [player1, player2, player3, player4]
  );

  const renderPlayerPieces = useCallback((data, index) => {
    if (!data.player) return null;

    return (
      <PlayerPieces
        key={index}
        player={
          Array.isArray(data?.player)
            ? data.player.filter((item) => item.travelCount === 57)
            : []
        }
        style={{
          top: data?.top,
          bottom: data?.bottom,
          left: data?.left,
          right: data?.right,
          zIndex: 9999,
          position: "absolute",
        }}
        pieceColor={data.pieceColor}
        translate={data.translate}
      />
    );
  }, []);

  return (
    <View style={[styles.mainContainer, { borderColor: colors.borderColor }]}>
      {blast && Platform.OS !== "web" && (
        <LottieView
          source={Fireworks}
          autoPlay
          loop
          hardwareAccelerationAndroid
          speed={1}
          style={styles.lottieView}
        />
      )}

      <Svg height={size} width={size - 5}>
        <Polygon
          points={`0,0 ${size / 2}, ${size / 2},${size},0`}
          fill={colors.yellow}
        />
        <Polygon
          points={`${size},0 ${size},${size} ${size / 2},${size / 2}`}
          fill={colors.blue}
        />
        <Polygon
          points={`0, ${size} ${size / 2},${size / 2} ${size},${size}`}
          fill={colors.red}
        />
        <Polygon
          points={`0, 0 ${size / 2},${size / 2} 0,${size}`}
          fill={colors.green}
        />
      </Svg>

      {playerData.map(renderPlayerPieces)}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0.8,
    width: "20%",
    height: "100%",
    overflow: "hidden",
    backgroundColor: "white",
  },
  lottieView: {
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: 1,
  },
});

export default FourTriangles;
