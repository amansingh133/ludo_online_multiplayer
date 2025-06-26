import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Platform,
} from "react-native";
import { useSelector } from "react-redux";
import Wrapper from "../components/Wrapper";
import GradientButton from "../components/GradientButton";
import { selectUsers } from "../redux/userReducers/userSelector";
import { RFValue } from "react-native-responsive-fontsize";

const WaitingScreen = () => {
  const users = useSelector(selectUsers);

  console.log(users);

  useEffect(() => {
    if (users.length === 0) {
    }
  }, []);

  const renderUserItem = ({ item }) => {
    return (
      <View style={styles.userItem}>
        <Text style={styles.userText}>{item.name}</Text>
      </View>
    );
  };

  return (
    <Wrapper>
      <View style={styles.content}>
        <Text style={styles.title}>Waiting for other players</Text>
        <ActivityIndicator size="large" color="gold" />

        {users.length > 0 ? (
          <FlatList
            data={users}
            renderItem={renderUserItem}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.userList}
          />
        ) : (
          <Text style={styles.waitingText}>No players connected yet ... </Text>
        )}

        <GradientButton title="CANCEL" onPress={() => console.log("cancel")} />
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

export default WaitingScreen;
