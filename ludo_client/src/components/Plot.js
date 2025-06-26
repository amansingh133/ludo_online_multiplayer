import { View, StyleSheet } from "react-native";
import React from "react";
import Token from "./Token";

const Plot = ({ pieceNo, player, color, data, onPress }) => {
  return (
    <View style={[styles.plot, { backgroundColor: color }]}>
      {data && data[pieceNo]?.pos === 0 && (
        <Token
          color={color}
          player={player}
          onPress={() => onPress(data[pieceNo])}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  plot: {
    height: "80%",
    width: "36%",
    borderRadius: 120,
  },
});

export default Plot;
