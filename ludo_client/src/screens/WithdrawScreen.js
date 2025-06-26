import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Wrapper from "../components/Wrapper";

const { width } = Dimensions.get("window");

const WithdrawScreen = () => {
  const [selectedOption, setSelectedOption] = useState("UPI"); // UPI is default
  const [amount, setAmount] = useState("");
  const [upiId, setUpiId] = useState("");
  const [accountHolderName, setAccountHolderName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [bankName, setBankName] = useState("");

  return (
   <Wrapper>
     <View style={styles.container}>
      <Header title="WITHDRAW" />

      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <Text style={styles.totalCoinsText}>Total Coins</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.coinValueText}>310k</Text>
            <Image
              source={require("../assets/images/coin.png")} // Replace with your coin image path
              style={styles.coinIcon}
            />
          </View>
        </View>
      </View>

      <View style={styles.bankUPI}>
      <TouchableOpacity
          style={[
            styles.upiButton,
            selectedOption === "UPI" && styles.activeButton,
          ]}
          onPress={() => setSelectedOption("UPI")}
          activeOpacity={0.8} // Makes the button press responsive
         >
          {selectedOption === "UPI" && (
            <LinearGradient
              colors={["#6425B3", "#9653E9"]} // Gradient with 2 colors
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={StyleSheet.absoluteFillObject}
            />
          )}
          <Text style={styles.buttonText}>UPI</Text>
        </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.bankButton,
              selectedOption === "Bank" && styles.activeButton,
            ]}
            onPress={() => setSelectedOption("Bank")}
            activeOpacity={0.8}
          >
            {selectedOption === "Bank" && (
              <LinearGradient
                colors={["#6425B3", "#9653E9"]} // Another gradient with 2 colors
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={StyleSheet.absoluteFillObject}
              />
            )}
            <Text style={styles.buttonText}>BANK</Text>
          </TouchableOpacity>

      </View>

      {/* Conditional Rendering */}
      <View style={styles.inputContainer}>
        {/* Amount Field (Common for both UPI and Bank) */}
        <View style={styles.input}>
          <TextInput
            style={styles.inputText}
            placeholder="Enter Amount"
            placeholderTextColor="#555555"
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
          />
        </View>

        {selectedOption === "UPI" ? (
          <View style={styles.input}>
            <TextInput
              style={styles.inputText}
              placeholder="UPI ID"
              placeholderTextColor="#555555"
              value={upiId}
              onChangeText={setUpiId}
            />
          </View>
        ) : (
          <>
            <View style={styles.input}>
              <TextInput
                style={styles.inputText}
                placeholder="Account Holder Name"
                placeholderTextColor="#555555"
                value={accountHolderName}
                onChangeText={setAccountHolderName}
              />
            </View>
            <View style={styles.input}>
              <TextInput
                style={styles.inputText}
                placeholder="Account Number"
                placeholderTextColor="#555555"
                value={accountNumber}
                onChangeText={setAccountNumber}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.input}>
              <TextInput
                style={styles.inputText}
                placeholder="IFSC Code"
                placeholderTextColor="#555555"
                value={ifscCode}
                onChangeText={setIfscCode}
              />
            </View>
            <View style={styles.input}>
              <TextInput
                style={styles.inputText}
                placeholder="Bank Name"
                placeholderTextColor="#555555"
                value={bankName}
                onChangeText={setBankName}
              />
            </View>
          </>
        )}
      </View>

      <Footer />
    </View>
   </Wrapper>
  );
};

export default WithdrawScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardContainer: {
    width: width * 0.9,
    alignItems: "center",
    position: "relative",
    marginTop: 50,
  },
  card: {
    backgroundColor: "#2E0C7A80",
    borderWidth: 2,
    borderColor: "#7056A0",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    width: width * 0.9,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
  },
  priceContainer: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  totalCoinsText: {
    fontSize: 25,
    fontWeight: "400",
    color: "#FFFFFF",
    marginBottom: 10,
    fontFamily: "PoetsenOne-Regular",
  },
  coinIcon: {
    width: 50,
    height: 50,
    alignContent: "center",
    objectFit: "contain",
    top: 5,
  },
  coinValueText: {
    fontSize: 30,
    fontWeight: "400",
    color: "#FFE156",
    fontFamily: "PoetsenOne-Regular",
  },
  bankUPI: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: width * 0.9,
    height: 50,
    backgroundColor: "#2B1867",
    borderRadius: 12,
    overflow: "hidden",
  },
  upiButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    backgroundColor: "transparent",
  },
  bankButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
  },
  gradientStyle: {
  ...StyleSheet.absoluteFillObject, // Ensures gradient covers the entire button
  borderRadius: 12, // Keep corners rounded
},
  activeButton: {
    overflow: "hidden", // Ensure the gradient doesn't overflow
    borderRadius: 12,  // Keep the button corners smooth,
    width:'50%'
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
  },
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    width: width * 0.9,
    height: 300,
  },
  input: {
    width: "100%",
    height: 50,
    borderRadius: 14,
    justifyContent: "center",
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
  },
  inputText: {
    fontSize: 16,
    color: "#555555",
    fontFamily: "PoetsenOne-Regular",
  },
});
