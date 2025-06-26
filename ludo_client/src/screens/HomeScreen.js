import React, { useState } from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
  Text} from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { useNavigation } from '@react-navigation/native';
import Wrapper from '../components/Wrapper';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { LinearGradient } from "expo-linear-gradient";


const { width, height } = Dimensions.get('window');

const HomeScreen = () => {
  const navigation = useNavigation();
  const [cards] = useState([
    { id: 1, image: require('../assets/images/2playerBoard.png'), text: '2player' },
    { id: 2, image: require('../assets/images/4playerBoard.png'), text: '4player' },
    { id: 3, image: require('../assets/images/playwithfriend.png'), text: 'playFriend' },
  ]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const getCardTransformation = (index) => {
    if (index === currentCardIndex) {
      // Current card: Full size, centered
      return [{ translateX: 0 }, { translateY: 0 }, { scale: 1 }];
    }
    if (index === (currentCardIndex + 1) % cards.length) {
      // Next card: Slightly to the right and down, visible partially
      return [{ translateX: 300 }, { translateY: -0 }, { scale: 1 }];
    }
    // Other cards
    return [{ translateX: 360 }, { translateY: -7 }, { scale: 0.9 }];
  };


  // const handleCardPress = (cardText) => {
  //   if (cardText === 'Wallet') {
  //     navigation.navigate('token');
  //   } else if (cardText === 'Game') {
  //     navigation.navigate('WalletSection');
  //   } else if (cardText === 'Refer') {
  //     navigation.navigate('refer');
  //   }
  // };


  return (
    <Wrapper>
      <View style={styles.container}>
        <Header />
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/images/ludo-logo.png")}
            style={styles.logo}
          />
        </View>

    	    {/* slider */}
        <View style={styles.swiperContainer}>
          <Swiper
            cards={cards}
            renderCard={(card, index) => (
              <TouchableOpacity
                // onPress={() => handleCardPress(card.text)}
                key={card.id}
                style={[styles.card, { transform: getCardTransformation(index) }]}
              >
                <ImageBackground
                  source={card.image}
                  style={styles.cardImage}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            )}
            onSwiped={(cardIndex) => {
              setCurrentCardIndex((prevIndex) => (cardIndex + 1) % cards.length);
            }}
            cardIndex={0}
            stackSize={3}
            stackSeparation={0} // Avoid unnecessary gaps
            backgroundColor="transparent"
            disableTopSwipe
            disableBottomSwipe
            infinite
          />

        </View>

        {/* footer */}
              <LinearGradient
                  colors={["#9653E9", "#6425B3"]}
                  start={{ x: 0.5, y: 0.5 }}
                  end={{ x: 1, y: 1 }}
                  style={[styles.gradient, { width: width }]} // Dynamically set the width
                >
                  <View style={styles.footer}>
                    {/* Refer Icon */}
                    <View style={styles.iconContainer}>
                      <Image
                        source={require("../assets/images/referIcon.png")}
                        style={styles.icon}
                      />
                      <Text style={styles.iconText}>REFER</Text>
                    </View>
            
                    {/* Home Icon */}

                    <View style={styles.iconhoverContainer}>
                      <Image
                        source={require("../assets/images/Home-hover.png")}
                        style={styles.iconwallet}
                      />
                      <Text style={styles.iconTexthover}>HOME</Text>
                    </View>
                    
            
                    {/* Wallet Icon */}
                    <View style={styles.iconContainer}>
                      <Image
                        source={require("../assets/images/walletIcon.png")}
                        style={styles.icon}
                      />
                      <Text style={styles.iconText}>WALLET</Text>
                    </View>
                  </View>
                </LinearGradient>

      </View>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  swiperContainer: {
    position: 'absolute',
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  card: {
    margin: 'auto',
    width: '100%',
    height: 350,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  cardImage: {
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
  },
  logoContainer: {
    alignItems: "center",
    position: 'absolute',
    top: 40
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // padding: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    height: 60,
  },
  iconContainer: {
    alignItems: "center",
    marginTop: 6,
  },
  icon: {
    width: 30,
    height: 25,
  },
  iconText: {
    fontSize: 13,
    color: "#FFF",
    marginTop: 8,
    lineHeight: 18.14,
    fontWeight: "400",
    fontFamily: "Wallpoet-Regular",
  },
  iconwallet:{
    width:55,
    height:50,
    position:'absolute',
    bottom:10,
    resizeMode: "contain",
  },
  iconhoverContainer:{
    gap:20,
    
  },
  iconTexthover:{
    top:18,
    fontFamily: "Wallpoet-Regular",
    fontWeight: "400",
    color:'#fff',
    fontSize: 13,
    left:5
  }
});

export default HomeScreen;
