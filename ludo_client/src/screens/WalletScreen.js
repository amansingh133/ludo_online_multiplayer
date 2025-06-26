import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity,
    TextInput,
    ImageBackground,
} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import Wrapper from '../components/Wrapper'
import Header from '../components/Header'
import Footer from '../components/Footer';
import { useNavigation } from '@react-navigation/native';
import Swiper from 'react-native-deck-swiper';

const { width } = Dimensions.get("window");

const WalletScreen = () => {
    const navigation = useNavigation();
    const [cards] = useState([
        { id: 1, image: require('../assets/images/add-money.png'), text: '2player' },
        { id: 2, image: require('../assets/images/withdraw.png'), text: '4player' },
        { id: 3, image: require('../assets/images/passbook-image.png'), text: 'playFriend' },
    ]);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);

    const getCardTransformation = (index) => {
        if (index === currentCardIndex) {
            // Current card: Full size, centered
            return [{ translateX: 0 }, { translateY: 0 }, { scale: 1 }];
        }
        if (index === (currentCardIndex + 1) % cards.length) {
            // Next card: Slightly to the right and down, visible partially
            return [{ translateX: 250 }, { translateY: -0 }, { scale: 1 }];
        }
        // Other cards
        return [{ translateX: 260 }, { translateY: -7 }, { scale: 0.9 }];
    };

    return (
        <Wrapper>
            <View style={styles.container}>
                <Header title="WALLET" ></Header>

                {/* total coins container */}
                <View style={styles.topContainer}>
                    <View style={styles.price}>
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

                {/* bottom container */}

                {/* <View style={styles.helpContainer}>

                </View> */}

                {/* footer */}
                <Footer></Footer>
            </View>

        </Wrapper>
    )
}

export default WalletScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "transparent",
        justifyContent: "space-between",
        alignItems: "center",
    },
    topContainer: {
        width: width * 0.9,
        alignItems: "center",
        position: "absolute",
        top: 90
    },
    price: {
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
        width: 250,
        height: 250,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth:2
        // borderWidth:2
    },
    cardImage: {
        resizeMode: 'contain',
        width: '100%',
        height: '100%',
    },
    helpContainer:{
        position:'absolute',
        top:0,
        width: width * 0.9,
        borderWidth:2,
        height:200
    },
})