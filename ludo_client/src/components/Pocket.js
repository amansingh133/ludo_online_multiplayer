import { View, StyleSheet } from "react-native";
import React from "react";
import Plot from "./Plot";
import { useDispatch, useSelector } from "react-redux";
import {
  selectColors,
  selectPlotData,
  selectUserConnection,
  selectUserStatus,
} from "../redux/userReducers/userSelector";
import { emitSocketEvent } from "../redux/userReducers/userActions";
import { selectGameStatus } from "../redux/gameReducers/gameSelectors";
import LottieView from "lottie-react-native";
import disconnected_user from "../assets/animation/disconnected_user.json";
import { deviceHeight, deviceWidth } from "../constants/Scaling";

const Pocket = React.memo(({ color, player, data, connectedOpacity }) => {
  const colors = useSelector(selectColors);
  const plotData = useSelector(selectPlotData);
  const userStatus = useSelector(selectUserStatus);
  const userConnection = useSelector(selectUserConnection);
  const gameStatus = useSelector(selectGameStatus);

  const dispatch = useDispatch();

  const handlePress = async (value) => {
    let playerNo = value?.id[0];

    switch (playerNo) {
      case "A":
        playerNo = "player1";
        break;

      case "B":
        playerNo = "player2";
        break;

      case "C":
        playerNo = "player3";
        break;

      case "D":
        playerNo = "player4";
        break;
    }

    if (
      userStatus === "inGame" &&
      userConnection === true &&
      gameStatus === "running"
    ) {
      dispatch(
        emitSocketEvent("pocketPress", {
          playerNo: playerNo,
          pieceId: value.id,
          pos: plotData.startingPoints[
            parseInt(playerNo.match(/\d+/)[0], 10) - 1
          ],
          travelCount: 1,
        })
      );
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <View
        style={[
          styles.childFrame,
          {
            borderColor: colors.borderColor,
            opacity: player && data ? connectedOpacity : 1,
          },
        ]}
      >
        {player && data && (
          <>
            <View style={styles.flexRow}>
              <Plot
                pieceNo={0}
                data={data}
                onPress={handlePress}
                player={player}
                color={color}
              />
              <Plot
                pieceNo={1}
                data={data}
                onPress={handlePress}
                player={player}
                color={color}
              />
            </View>
            <View style={[styles.flexRow, { marginTop: 20 }]}>
              <Plot
                pieceNo={2}
                data={data}
                onPress={handlePress}
                player={player}
                color={color}
              />
              <Plot
                pieceNo={3}
                data={data}
                onPress={handlePress}
                player={player}
                color={color}
              />
            </View>
          </>
        )}
      </View>

      {player && data && connectedOpacity == 0.5 && (
        <View
          style={[
            styles.disconnectedAnimationContainer,
            { opacity: 1 }, // Set full opacity when connectedOpacity is 0.5
          ]}
        >
          <LottieView
            source={disconnected_user}
            autoPlay
            loop={false}
            cacheComposition={true}
            style={[
              styles.disconnecedAnimation,
              { opacity: 1 }, // Ensure the animation itself also has full opacity
            ]}
            hardwareAccelerationAndroid={true}
          />
        </View>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    borderWidth: 0.4,
    justifyContent: "center",
    alignItems: "center",
    width: "40%",
    height: "100%",
  },
  childFrame: {
    backgroundColor: "white",
    width: "70%",
    height: "70%",
    padding: 15,
    borderWidth: 0.4,
  },
  flexRow: {
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "40%",
    flexDirection: "row",
  },
  disconnectedAnimationContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [
      { translateX: -deviceWidth * 0.1 },
      { translateY: -deviceWidth * 0.1 },
    ],
    width: "50%",
    height: "50%",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 101,
  },

  disconnecedAnimation: {
    width: "100%",
    height: "100%",
  },
});

export default Pocket;
