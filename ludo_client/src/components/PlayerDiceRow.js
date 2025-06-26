import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Dice from "./Dice";
import { RFValue } from "react-native-responsive-fontsize";

const PlayerDiceRow = ({
  players,
  playerOpacities,
  isDiceTouch,
  alignRightIfTwoPlayers,
}) => (
  <View
    style={[
      styles.flexRow,
      alignRightIfTwoPlayers && { justifyContent: "flex-end" },
      { pointerEvents: isDiceTouch ? "none" : "auto" },
    ]}
  >
    {players.map(
      (player, index) =>
        player.player && (
          <View key={index} style={styles.diceContainer}>
            <Text
              style={[
                styles.userNameText,
                { textAlign: index === 0 ? "left" : "right" },
              ]}
            >
              {player.name}
            </Text>
            <Dice
              color={player.color}
              player={player.playerNum}
              data={player.player}
              connectedOpacity={playerOpacities[player.playerNo]}
              rotate={index === 1}
            />
          </View>
        )
    )}
  </View>
);

const styles = StyleSheet.create({
  flexRow: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 30,
  },
  diceContainer: {
    flexDirection: "column",
  },

  userNameText: {
    color: "white",
    fontSize: RFValue(16),
    fontFamily: "Philosopher-Bold",
  },
});

export default PlayerDiceRow;
