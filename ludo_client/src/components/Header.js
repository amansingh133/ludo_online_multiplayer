import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'react-native';

// Get screen width
const { width } = Dimensions.get("window");

const Header = ({ title, onPress, style, textStyle }) => {
  return (
    <>
       <StatusBar hidden={true} />
       <LinearGradient  
      colors={['#9653E9', '#6425B3']} 
      start={{ x: 0.5, y: 0.5 }}
      end={{ x: 1, y: 1 }}
      style={[styles.gradient, { width: width }]}
    >
      <View style={styles.header}>
        {/* Back Button */}
        <TouchableOpacity>
          <Image
            source={require('../assets/images/backBtn.png')} 
            style={styles.backBtn}
          />
        </TouchableOpacity>

        {/* Title */}
        <Text style={styles.title}>{title}</Text>

        {/* User Avatar */}
        <Image
          source={require('../assets/images/profileImage.png')} 
          style={styles.avatar}
        />
      </View>
    </LinearGradient>
    </>
 
  );
};

const styles = StyleSheet.create({

  header: {
    flexDirection: "row", 
    alignItems: "center",
    justifyContent: "space-between", 
    paddingHorizontal:10
  },
  backBtn: {
    width: 60,
    height: 60,
  },
  title: {
    fontSize: 20,
    fontFamily: 'PoetsenOne-Regular',
    fontWeight:'400',
    color: "#FFF",
    textAlign: "center",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 20,
  },
});

export default Header;
