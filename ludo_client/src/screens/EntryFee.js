import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  textStyle,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import Wrapper from "../components/Wrapper";
import { useState } from "react";
const { width } = Dimensions.get("window");

const EntryFee = () => {
  const [selectedToken, setSelectedToken] = useState(null); // State to track the selected token

  const tokens = [
    { id: 1, image: require("../assets/images/tokenBlue.png") },
    { id: 2, image: require("../assets/images/tokenRed.png") },
    { id: 3, image: require("../assets/images/tokenGreen.png") },
    { id: 4, image: require("../assets/images/tokenYellow.png") },
  ];

  const handleTokenClick = (id) => {
    setSelectedToken(id); // Update the selected token
  };

  return (
    <Wrapper>
      <View style={styles.container}>
        {/* header */}
        <LinearGradient
          colors={["#9653E9", "#6425B3"]}
          start={{ x: 0.5, y: 0.5 }}
          end={{ x: 1, y: 1 }}
          style={[styles.gradient, { width: width }]} // Dynamically set the width
        >
          <View style={styles.header}>
            {/* Back Button */}
            <TouchableOpacity>
              <Image
                source={require("../assets/images/backBtn.png")} // Replace with your image path
                style={styles.backBtn}
              />
            </TouchableOpacity>

            {/* Title */}
            <Text style={styles.title}>Entry Fees</Text>

            {/* price */}
            <View style={styles.priceContainer}>
              <View style={styles.coinContainer}>
                <Image
                  source={require("../assets/images/coin.png")} // Replace with your image path
                  style={styles.coin}
                />
              </View>
              <View style={styles.price}>
                <Text style={styles.priceText}>310K</Text>
              </View>
              <View style={styles.addButton}>
                <Text style={styles.addButtonText}>+</Text>
              </View>
            </View>
          </View>
        </LinearGradient>

        {/* entry fee container start */}
        <View style={styles.priceContainer1}>
          <View style={styles.coinContainer1}>
            <Image
              source={require("../assets/images/coin.png")} // Replace with your image path
              style={styles.coin1}
            />
          </View>
          <View style={styles.price1}>
            <Text style={styles.priceText1}>310K</Text>
          </View>
          <View style={styles.addButton1}>
            <Text style={styles.addButtonText1}>+</Text>
          </View>
        </View>

        {/* ludoBoardImage */}
        <View style={styles.ludoImageContainer}>
          <Image
            source={require("../assets/images/Ludoboard.png")} // Replace with your image path
            style={styles.ludoImage}
          />
          <Text style={styles.chooseColor}>CHOOSE COLOR</Text>
          {/* Tokens */}
          <View style={styles.allTokenContainer}>
            {tokens.map((token) => (
              <TouchableOpacity
                key={token.id}
                style={[
                  styles.tokens,
                  {
                    backgroundColor:
                      selectedToken === token.id ? "#AC95FF" : "#001236",
                  },
                ]}
                onPress={() => handleTokenClick(token.id)}
              >
                <Image source={token.image} style={styles.tokenImage} />
              </TouchableOpacity>
            ))}
          </View>
          {/* w fee container start */}
          <Text style={styles.chooseColor}>ENTRY FEE</Text>
          <View style={styles.priceContainer1}>
            <View style={styles.subButton}>
              <Text style={styles.subButtonText}>-</Text>
            </View>
            <View style={styles.price1}>
              <Text style={styles.priceText1}>310K</Text>
            </View>
            <View style={styles.addButton1}>
              <Text style={styles.addButtonText1}>+</Text>
            </View>
          </View>

          {/* button */}
          <View activeOpacity={0.8} style={styles.buttonContainer}>
            <LinearGradient
              colors={["#4FAE45", "#3F8C2E"]}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              style={styles.gradientbtn}
            >
              <Text style={styles.text}>START</Text>
            </LinearGradient>
          </View>
        </View>

        {/*  */}
        <View></View>
      </View>
    </Wrapper>
  );
};

export default EntryFee;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "space-between",
    alignItems: "center",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // borderWidth:2,
    paddingHorizontal: 10,
  },
  backBtn: {
    width: 60,
    height: 60,
  },
  title: {
    fontSize: 20,
    fontFamily: "PoetsenOne-Regular",
    fontWeight: "400",
    color: "#FFF",
    textAlign: "center",
  },
  priceContainer: {
    // borderWidth:2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  coinContainer: {
    position: "absolute",
    left: -10,
    zIndex: 999999,
  },
  coin: {
    width: 60,
    height: 60,
  },
  price: {
    justifyContent: "center",
    backgroundColor: "#06003F",
    borderRadius: 8,
    padding: 8,
    paddingHorizontal: 50,
    position: "relative",
    // zIndex:
  },
  priceText: {
    color: "#fff",
    textAlign: "center",
    fontFamily: "PoetsenOne-Regular",
    fontWeight: "500",
  },
  addButton: {
    backgroundColor: "#4EAB43",
    padding: 8,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: -2,
  },
  addButtonText: {
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
  },
  //   price
  priceContainer1: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  coinContainer1: {
    position: "absolute",
    left: -18,
    zIndex: 999999,
  },
  coin1: {
    width: 60,
    height: 60,
  },
  price1: {
    justifyContent: "center",
    backgroundColor: "#06003F",
    borderRadius: 10,
    padding: 6,
    width: 200,
    position: "relative",
  },
  priceText1: {
    color: "#fff",
    textAlign: "center",
    fontFamily: "PoetsenOne-Regular",
    fontWeight: "500",
    fontSize: 18,
  },
  addButton1: {
    backgroundColor: "#4EAB43",
    padding: 2,
    width: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: 0,
  },
  addButtonText1: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  subButton: {
    backgroundColor: "#F0943C",
    padding: 2,
    width: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    left: 0,
    zIndex: 999999,
  },
  subButtonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  ludoImageContainer: {
    // borderWidth:2,
    width: width * 0.8,
    justifyContent: "center",
    alignItems: "center",
    gap: 30,
  },
  ludoImage: {
    width: 150,
    height: 150,
  },
  chooseColor: {
    color: "#977AF1",
    fontSize: 24,
    fontFamily: "PoetsenOne-Regular",
    fontWeight: "400",
  },
  allTokenContainer: {
    width: width * 0.8,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 20,
  },
  tokens: {
    backgroundColor: "#001236",
    borderRadius: 10,
  },
  tokenImage: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    position: "relative",
    bottom: 10,
  },
  buttonContainer: {
    borderRadius: 25,
    overflow: "hidden", // Ensures gradient conforms to border radius
  },
  gradientbtn: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
