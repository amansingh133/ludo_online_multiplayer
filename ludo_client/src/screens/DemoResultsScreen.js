import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Platform,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Wrapper from "../components/Wrapper";
import GradientButton from "../components/GradientButton";
import { RFValue } from "react-native-responsive-fontsize";
import { selectWinners } from "../redux/gameReducers/gameSelectors";
import { resetAndNavigate } from "../utils/NavigationUtils";
import { resetGame } from "../redux/gameReducers/gameSlice";
import { clearUser } from "../redux/userReducers/userSlice";
import { getSocket } from "../utils/socketUtil";

const DemoResultScreen = () => {
  const socket = getSocket();
  const dispatch = useDispatch();
  const winners = useSelector(selectWinners);

  const renderUserItem = ({ item }) => {
    return (
      <View style={styles.userItem}>
        <Text style={styles.userText}>{item.name}</Text>
        <Text style={styles.userText}>{item.rank}</Text>
      </View>
    );
  };

  return (
    <Wrapper>
      <View style={styles.content}>
        <Text style={styles.title}>Winners</Text>

        {winners.length > 0 ? (
          <FlatList
            data={winners}
            renderItem={renderUserItem}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.userList}
          />
        ) : (
          <ActivityIndicator size="large" color="gold" />
        )}

        <GradientButton
          title="HOME"
          onPress={() => {
            if (socket) {
              socket.disconnect();
            }

            dispatch(resetGame());
            dispatch(clearUser());
            resetAndNavigate("HomeScreen");
          }}
        />
      </View>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  content: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: RFValue(16),
    fontFamily: "Philosopher-Bold",
    marginBottom: 20,
    color: "gold",
  },
  waitingText: {
    fontSize: RFValue(16),
    color: "#555",
    fontFamily: "Philosopher-Bold",
    marginBottom: 20,
  },
  userList: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 20,
  },
  userItem: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "gold",
    marginVertical: 5,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    width: 240,
    elevation: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    ...Platform.select({
      web: {
        boxShadow: "1px 1px 10px rgba(213, 190, 62, 0.5)",
      },
      default: {
        elevation: 5,
        shadowColor: "#d5be3e",
        shadowOpacity: 0.5,
        shadowOffset: { width: 1, height: 1 },
        shadowRadius: 10,
      },
    }),
  },
  userText: {
    fontSize: RFValue(16),
    color: "Black",
    textAlign: "center",
    fontFamily: "Philosopher-Bold",
    elevation: 10,
  },
});

export default DemoResultScreen;
