import React, { useCallback } from "react";
import { View, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import GradientButton from "./GradientButton";
import { useDispatch } from "react-redux";
import { playSound } from "../utils/SoundUtilityExpo";
import { goBack, resetAndNavigate } from "../utils/NavigationUtils";
import { LinearGradient } from "expo-linear-gradient";
import { announceWinner, resetGame } from "../redux/gameReducers/gameSlice";
import { clearUser } from "../redux/userReducers/userSlice";
import { clearSocket, getSocket } from "../utils/socketUtil";

const MenuModal = ({ visible, onPressHide }) => {
  const socket = getSocket();
  const dispatch = useDispatch();

  const handleNewGame = useCallback(() => {
    dispatch(resetGame());
    playSound("game_start");
    dispatch(announceWinner(null));
    onPressHide();
  }, [dispatch, onPressHide]);

  const handleHome = useCallback(() => {
    if (socket) {
      socket.disconnect();
      // clearSocket();
    }

    dispatch(resetGame());
    dispatch(clearUser());
    resetAndNavigate("HomeScreen");
  }, []);

  return (
    <Modal
      style={styles.bottomModalView}
      isVisible={visible}
      backdropColor="black"
      backdropOpacity={0.8}
      onBackdropPress={onPressHide}
      animationIn="zoomIn"
      animationOut="zoomOut"
      onBackButtonPress={onPressHide}
    >
      <View style={styles.modalContainer}>
        <LinearGradient
          colors={["#0f0c29", "#302b63", "#24243e"]}
          style={styles.gradientContainer}
        >
          <View style={styles.subView}>
            <GradientButton title="RESUME" onPress={onPressHide} />
            {/* <GradientButton title="NEW GAME" onPress={handleNewGame} /> */}
            <GradientButton title="HOME" onPress={handleHome} />
          </View>
        </LinearGradient>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  bottomModalView: {
    justifyContent: "center",
    width: "95%",
    alignSelf: "center",
  },
  gradientContainer: {
    borderRadius: 20,
    overflow: "hidden",
    padding: 20,
    paddingVertical: 40,
    width: "96%",
    borderWidth: 2,
    borderColor: "gold",
    justifyContent: "center",
    alignItems: "center",
  },
  subView: {
    width: "100%",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MenuModal;
