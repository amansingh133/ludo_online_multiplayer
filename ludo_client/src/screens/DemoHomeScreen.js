import {
  Animated,
  Image,
  StyleSheet,
  TextInput,
  View,
  ActivityIndicator,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import Wrapper from "../components/Wrapper";
import Logo from "../assets/images/logo.png";
import { deviceWidth, deviceHeight } from "../constants/Scaling";
import GradientButton from "../components/GradientButton";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentPositions } from "../redux/gameReducers/gameSelectors";
import { useIsFocused } from "@react-navigation/native";
import { playSound } from "../utils/SoundUtilityExpo";
import { resetGame } from "../redux/gameReducers/gameSlice";
import { navigate, resetAndNavigate } from "../utils/NavigationUtils";
import { RFValue } from "react-native-responsive-fontsize";
import { clearAllData, connectSocket } from "../redux/userReducers/userActions";
import { clearUser } from "../redux/userReducers/userSlice";
import CardSelector from "../components/CardSelector";

const DemoHomeScreen = () => {
  const dispatch = useDispatch();
  // const currentPosition = useSelector(selectCurrentPositions);
  const isFocused = useIsFocused();

  const [name, setName] = useState("");
  const [connecting, setConnecting] = useState(false);
  const [selectedGameMode, setSelectedGameMode] = useState(null);

  const gameModes = [
    { id: "2-players", title: "2 Players" },
    { id: "4-players", title: "4 Players" },
  ];

  useEffect(() => {
    if (isFocused) {
      // playSound("home");
    }
  }, [isFocused]);

  const renderButton = useCallback(
    (title, onPress) => <GradientButton title={title} onPress={onPress} />,
    []
  );

  const startGame = async (isNew = false) => {
    if (isNew) {
      // clearAllData(dispatch);
      dispatch(resetGame());
      navigate("DemoSelectorScreen", { name, selectedGameMode });
    }
  };

  const handleNewGamePress = useCallback(() => {
    if (name.trim() === "") {
      alert("Please enter a name.");
      return;
    }

    if (!selectedGameMode) {
      alert("Please select a game mode.");
      return;
    }

    startGame(true);
  }, [name, selectedGameMode]);

  const handleResumeGamePress = useCallback(() => {
    startGame(false);
  }, []);

  return (
    <Wrapper style={{ justifyContent: "center" }}>
      {/* <Animated.View style={styles.imgContainer}>
        <Image source={Logo} style={styles.img} />
      </Animated.View> */}

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter name"
          value={name}
          onChangeText={setName}
          placeholderTextColor="rgba(0, 0, 0, 0.5)"
        />
      </View>

      <View style={styles.cardContainer}>
        {gameModes.map((mode) => (
          <CardSelector
            key={mode.id}
            title={mode.title}
            isSelected={selectedGameMode === mode.id}
            onPress={() => setSelectedGameMode(mode.id)}
          />
        ))}
      </View>

      {/* {currentPosition.length !== 0 &&
        renderButton("RESUME", handleResumeGamePress)} */}

      {renderButton("CONTINUE", handleNewGamePress)}

      {connecting && (
        <ActivityIndicator
          size="large"
          color="white"
          style={styles.loadingIndicator}
        />
      )}
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  img: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  imgContainer: {
    width: deviceWidth * 0.6,
    height: deviceHeight * 0.2,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 40,
    alignSelf: "center",
  },
  input: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#000",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    fontSize: RFValue(16),
    textAlign: "left",
    fontFamily: "Philosopher-Bold",
  },
  inputContainer: {
    borderWidth: 2,
    borderRadius: 10,
    elevation: 5,
    backgroundColor: "white",
    shadowColor: "#d5be3e",
    shadowOpacity: 0.5,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 10,
    borderColor: "#d5be3e",
    width: 240,
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: deviceWidth * 0.8,
    alignSelf: "center",
    marginVertical: 20,
  },
  loadingIndicator: {
    marginTop: 20,
  },
});

export default DemoHomeScreen;
