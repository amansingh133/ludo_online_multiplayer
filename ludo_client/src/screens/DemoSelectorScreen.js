import { StyleSheet, View } from "react-native";
import Wrapper from "../components/Wrapper";
import { connectSocket } from "../redux/userReducers/userActions";
import { resetGame } from "../redux/gameReducers/gameSlice";
import { useDispatch } from "react-redux";
import { useCallback, useState } from "react";
import GradientButton from "../components/GradientButton";
import CardSelector from "../components/CardSelector";
import { clearUser } from "../redux/userReducers/userSlice";
import { clearSocket } from "../utils/socketUtil";

const DemoSelectorScreen = ({ route }) => {
  const { name, selectedGameMode } = route.params;
  const dispatch = useDispatch();
  const [selectedToken, setSelectedToken] = useState("");
  const tokenColors = ["red", "green", "yellow", "blue"];

  const renderButton = useCallback(
    (title, onPress) => <GradientButton title={title} onPress={onPress} />,
    []
  );

  const startGame = async (isNew = false) => {
    if (isNew) {
      clearSocket();
      dispatch(clearUser());
      dispatch(resetGame());
      dispatch(
        connectSocket({
          type: "addUser",
          name: String(name),
          selectedColor: String(selectedToken),
          gameType: String(selectedGameMode),
          playerCount: selectedGameMode === "2-players" ? 2 : 4,
        })
      );
    }
  };

  const handleNewGamePress = useCallback(() => {
    if (!selectedToken) {
      alert("Please select a token color.");
      return;
    }

    startGame(true);
  }, [selectedToken]);

  return (
    <Wrapper>
      <View style={styles.gameModeContainer}>
        {tokenColors.map((token, index) => (
          <CardSelector
            key={index}
            title={token}
            isSelected={selectedToken === token}
            onPress={() => {
              setSelectedToken(token);
            }}
          />
        ))}
      </View>
      {renderButton("NEW GAME", handleNewGamePress)}
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  tokenContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 20,
  },
});

export default DemoSelectorScreen;
