import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { useDispatch, useSelector } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import GradientButton from "./GradientButton";
import { playSound } from "../utils/SoundUtilityExpo";
import { resetAndNavigate } from "../utils/NavigationUtils";
import { selectPlotData } from "../redux/userReducers/userSelector";
import { announceWinner, resetGame } from "../redux/gameReducers/gameSlice";

const WinModal = ({ winner }) => {
  const plotData = useSelector(selectPlotData);

  const dispatch = useDispatch();
  const [visible, setVisible] = useState(!!winner);

  useEffect(() => {
    setVisible(!!winner);
  }, [winner]);

  const handleNewGame = () => {
    dispatch(resetGame());
    dispatch(announceWinner(null));
    playSound("game_start");
  };

  const handleHome = () => {
    dispatch(gameSlice.actions.resetGame());
    dispatch(gameSlice.actions.announceWinner(null));
    resetAndNavigate("HomeScreen");
  };

  return (
    <Modal
      style={styles.modal}
      isVisible={visible}
      backdropColor="black"
      backdropOpacity={0.8}
      onBackdropPress={() => {}}
      animationIn="zoomIn"
      animationOut="zoomOut"
      onBackButtonPress={() => {}}
    >
      <LinearGradient
        colors={["#0f0c29", "#302b63", "#24243e"]}
        style={styles.gradientContainer}
      >
        <View style={styles.content}>
          <View style={styles.tokenContainer}>
            {/* <Token player={1} color={plotData.colorPlayer[winner - 1]} /> */}
          </View>
          <Text style={styles.congratsText}>
            Congratulations! PLAYER {winner}
          </Text>
          <GradientButton title="NEW GAME" onPress={handleNewGame} />
          <GradientButton title="HOME" onPress={handleHome} />
        </View>
      </LinearGradient>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: "center",
    alignItems: "center",
  },
  gradientContainer: {
    borderRadius: 20,
    padding: 20,
    width: "96%",
    borderWidth: 2,
    borderColor: "gold",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    width: "100%",
    alignItems: "center",
  },
  tokenContainer: {
    width: 90,
    height: 40,
  },
  congratsText: {
    fontSize: 18,
    color: "white",
    fontFamily: "Philosopher-Bold",
    marginTop: 20,
  },
});

export default WinModal;
