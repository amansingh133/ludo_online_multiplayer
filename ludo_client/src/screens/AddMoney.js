import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  textStyle,
  TextInput,
} from "react-native";
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState } from "react";
import InputField from "../components/InputField";
import CommonButton from "../components/CommonButton";
import { LinearGradient } from "expo-linear-gradient";
import Wrapper from "../components/Wrapper";
import Svg, { Defs, RadialGradient, Stop, Rect } from "react-native-svg";

const { width } = Dimensions.get("window");

const AddMoney = () => {
  const [amount, setAmount] = useState("");

  const handleAmountChange = (value) => {
    setAmount(value);
    console.log(`Amount changed: ${value}`);
  };

  return (
    <Wrapper>
      <View style={styles.container}>
        <Header title="ADD MONEY"></Header>
        <View style={styles.cardContainer}>
          <View style={styles.card}>
            {/* Wallet Icon */}
            <Image
              source={require("../assets/images/addmoneyIcon.png")} // Replace with your wallet image path
              style={styles.walletIcon}
            />

            {/* Text */}
            <Text style={styles.totalCoinsText}>Total Coins</Text>

            {/* Coin Icon */}
            <View style={styles.priceContainer}>
              <Text style={styles.coinValueText}>310k</Text>
              <Image
                source={require("../assets/images/coin.png")} // Replace with your coin image path
                style={styles.coinIcon}
              />
            </View>
          </View>
        </View>

        {/* Amount container */}
        <View style={styles.amountContainer}>
          <Text style={styles.enterMoney}>Enter Money</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputText}
              value={amount}
              keyboardType="numeric"
              onChangeText={(text) => handleAmountChange(text)}
              placeholder="Enter amount"
              placeholderTextColor="#aaa"
            />
          </View>
          <View style={styles.buttonsRow}>
            {[100, 500, 1000].map((value) => (
              <TouchableOpacity
                key={value}
                style={styles.amountButton}
                onPress={() => handleAmountChange(value.toString())}
              >
                <Text style={styles.amountButtonText}>{value}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Add Button */}
          <View style={styles.addButtonContainer}>
            <Svg height="100%" width="100%" style={styles.radialGradient}>
              <Defs>
                <RadialGradient
                  id="grad"
                  cx="50%"
                  cy="0%"
                  rx="43.58%"
                  ry="100%"
                  fx="50%"
                  fy="0%"
                >
                  <Stop offset="0%" stopColor="#9653E9" stopOpacity="1" />
                  <Stop offset="100%" stopColor="#6425B3" stopOpacity="1" />
                </RadialGradient>
              </Defs>
              <Rect x="0" y="0" width="100%" height="100%" fill="url(#grad)" />
            </Svg>

            <Text style={[styles.outlineText]}>ADD</Text>
            <Text style={[styles.mainText]}>ADD</Text>
          </View>
        </View>

        <Footer></Footer>
      </View>
    </Wrapper>
  );
};

export default AddMoney;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardContainer: {
    width: width * 0.9, // Card width is 90% of the screen width
    alignItems: "center",
    position: "relative",
    marginTop: 50,
    // backgroundColor: "#7056A0",
    backgroundColor: "#2E0C7A80",
  },
  card: {
    backgroundColor: "#2E0C7A80",
    borderWidth: 2,
    borderColor: "#7056A0",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    padding: 45,
    width: width * 0.9, // Card width is 90% of the screen width
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    // shadowOpacity: 0.2,
    // shadowRadius: 10,
    // elevation: 5,
  },
  walletIcon: {
    width: 60,
    height: 60,
    position: "absolute",
    top: -50,
  },
  priceContainer: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  totalCoinsText: {
    fontSize: 28,
    fontWeight: "400",
    color: "#FFFFFF",
    // marginBottom: 10,
    fontFamily: "PoetsenOne-Regular",
    // letterSpacing:2
  },
  coinIcon: {
    width: 55,
    height: 55,
    alignContent: "center",
    objectFit: "contain",
    top: 5,
  },
  coinValueText: {
    fontSize: 30,
    fontWeight: "400",
    // lineHeight: 18,
    color: "#FFE156",
    fontFamily: "PoetsenOne-Regular",
  },
  amountContainer: {
    backgroundColor: "#FFFFFF66",
    borderWidth: 2,
    borderColor: "#7056A0",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "space-between",
    padding: 45,
    width: width * 0.9, // Card width is 90% of the screen width
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    gap: 15,
  },
  enterMoney: {
    color: "#000",
    fontFamily: "PoetsenOne-Regular",
    fontWeight: "400",
    fontSize: 24,
  },
  inputContainer: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#D8C6Ca6",
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  inputText: {
    fontSize: 18,
    color: "#4a148c",
    fontFamily: "PoetsenOne-Regular",
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    // width: "100%",
    // marginBottom: 30,
  },
  amountButton: {
    width: 70,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#224085",
    borderRadius: 16,
    marginHorizontal: 5,
  },
  amountButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "400",
    fontFamily: "PoetsenOne-Regular",
  },
  addButtonContainer: {
    width: "50%",
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  radialGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  outlineText: {
    position: "absolute",
    color: "black",
    fontSize: 18,
    fontFamily: "PoetsenOne-Regular",
    textAlign: "center",
    textShadowColor: "black",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  mainText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "PoetsenOne-Regular",
    textAlign: "center",
  },
});
