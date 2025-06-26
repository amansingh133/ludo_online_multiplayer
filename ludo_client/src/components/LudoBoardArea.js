import React, { useCallback, useMemo } from "react";
import { View, StyleSheet } from "react-native";
import Pocket from "./Pocket";
import VerticalPath from "./paths/VerticalPath";
import HorizontalPath from "./paths/HorizontalPath";
import FourTriangles from "./FourTriangles";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/userReducers/userSelector";
import { boardSize } from "../constants/Scaling";

const LudoBoardArea = ({
  player1,
  player2,
  player3,
  player4,
  colors,
  plotData,
  playerOpacities,
}) => {
  const user = useSelector(selectUser);

  const getRotationAngle = useCallback((playerNo) => {
    switch (playerNo) {
      case "player1":
        return "0deg";
      case "player2":
        return "270deg";
      case "player3":
        return "180deg";
      case "player4":
        return "90deg";
      default:
        return "0deg";
    }
  }, []);

  const rotationAngle = useMemo(
    () => getRotationAngle(user?.playerNo),
    [user?.playerNo, getRotationAngle]
  );

  return (
    <View
      style={[
        styles.ludoBoard,
        {
          transform: [{ rotate: rotationAngle }],
          width: boardSize,
          height: boardSize,
          paddingHorizontal: 10,
          paddingVertical: 10,
          marginTop: 10,
        },
      ]}
    >
      <View style={styles.plotContainer}>
        <Pocket
          color={colors.green}
          player={player2 ? 2 : null}
          data={player2}
          connectedOpacity={playerOpacities.player2}
        />
        <VerticalPath cells={plotData.Plot2Data} color={colors.yellow} />
        <Pocket
          color={colors.yellow}
          player={player3 ? 3 : null}
          data={player3}
          connectedOpacity={playerOpacities.player3}
        />
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
        <Pocket
          color={colors.red}
          player={player1 ? 1 : null}
          data={player1}
          connectedOpacity={playerOpacities.player1}
        />
        <VerticalPath cells={plotData.Plot4Data} color={colors.red} />
        <Pocket
          color={colors.blue}
          player={player4 ? 4 : null}
          data={player4}
          connectedOpacity={playerOpacities.player4}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  pathContainer: {
    flexDirection: "row",
    width: "100%",
    height: "20%",
    justifyContent: "space-between",
    backgroundColor: "#1e5162",
  },
  ludoBoard: {
    alignSelf: "center",
  },
  plotContainer: {
    width: "100%",
    height: "40%",
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: "#ccc",
  },
});
export default LudoBoardArea;
