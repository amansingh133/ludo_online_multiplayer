import { View, StyleSheet } from "react-native";
import React from "react";
import Token from "./Token";
import { deviceHeight, deviceWidth } from "../constants/Scaling";

const PlayerPieces = React.memo(({ player, style, pieceColor, translate }) => {
  return (
    <View style={[styles.container, style]}>
      {player.map((piece, index) => (
        <View
          pointerEvents="none"
          key={piece.id}
          style={{
            top: 0,
            zIndex: 99,
            position: "absolute",
            bottom: 0,
            transform: [{ scale: 0.5 }, { [translate]: 14 * index }],
          }}
        >
          <Token
            cell={true}
            player={player}
            onPress={() => {}}
            pieceId={piece.id}
            color={pieceColor}
          />
        </View>
      ))}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: deviceWidth * 0.063,
    height: deviceHeight * 0.032,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },
});

export default PlayerPieces;
