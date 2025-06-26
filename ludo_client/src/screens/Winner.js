import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity,textStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react'
import Wrapper from '../components/Wrapper'
import Svg, { Defs, RadialGradient, Stop, Rect } from "react-native-svg";
import { ScrollView, FlatList } from 'react-native'; 

const { width } = Dimensions.get("window");

const Winner = () => {
    const players = [
        { id: 1, name: 'You', isWinner: true },
        { id: 2, name: 'John', isWinner: false },
        { id: 3, name: 'Doe', isWinner: false },
        { id: 4, name: 'Doe', isWinner: false },
      ];

  return (
    <Wrapper>
    <View style={styles.container}>
      <LinearGradient
        colors={['#9653E9', '#6425B3']}
        start={{ x: 0.5, y: 0.5 }}
        end={{ x: 1, y: 1 }}
        style={[styles.gradient, { width: width }]} // Dynamically set the width
      >
        <View style={styles.header}>
          {/* Back Button */}
          <TouchableOpacity>
            <Image
              source={require('../assets/images/backBtn.png')} // Replace with your image path
              style={styles.backBtn}
            />
          </TouchableOpacity>

          {/* Title */}
          <Text style={styles.title}>RESULT</Text>

          {/* price */}
          <View style={styles.priceContainer}>
            <View style={styles.coinContainer}>
                <Image
                source={require('../assets/images/coin.png')} // Replace with your image path
                style={styles.coin}
                />
            </View>
            <View style={styles.price}>
                <Text style={styles.priceText}>310K</Text>
            </View>
            <View  style={styles.addButton}>
            <Text style={styles.addButtonText}>+</Text>
            </View>
          </View>
         
        </View>
      </LinearGradient>

      {/* Winner Container */}
      <View style={styles.WinnerContainer}>
       <View style={styles.congratulationContainer}>
        <Image
            source={require('../assets/images/congratualtionImage.png')} // Add your image path here
            style={styles.winnerImage}
            />
            <Text style={styles.congratulationText}>Congratulation</Text>
       </View>
        <Image
          source={require('../assets/images/winnertopbar.png')} // Add your image path here
          style={styles.topbarImage}
        />

        {/* Result */}
        <ScrollView style={styles.resultScroll} contentContainerStyle={styles.resultContent}>
          {players.map((player, index) => (
            <View key={player.id} style={styles.resultBox}>
              {/* Number (Player Position or Rank) */}
              <View style={styles.tokenNumberContainer}>
                <Image
                    source={require('../assets/images/tokenNoImage.png')} // Add your image path here
                    style={styles.number}
                />
                <Text style={styles.tokenId}>{player.id}</Text>
                </View>
              {/* Token and Name */}
              <View style={styles.tokenContainer}>
                <Image
                  source={require('../assets/images/blueToken.png')} // Add your image path here
                  style={styles.tokenImage}
                />
                <Text style={styles.name}>{player.name}</Text>
              </View>

              {/* Winner or Loss */}
              <View style={styles.winnerText}>
                <Text style={styles.winner}>
                  {player.isWinner ? 'Winner' : 'Lost'}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <LinearGradient
            colors={['#F78707', '#C94803']}
            start={[0, 0]}
            end={[0, 1]}
            style={styles.btn}
          >
            <Text style={styles.home}>Home</Text>
          </LinearGradient>

          <LinearGradient
            colors={['#74CAFF', '#003748']}
            start={[0, 0]}
            end={[0, 1]}
            style={styles.btn}
          >
            <Text style={styles.home}>Play Again</Text>
          </LinearGradient>
        </View>
      </View>
      <View></View>
    </View>
  </Wrapper>
  )
}

export default Winner

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'transparent',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    
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
  priceContainer:{ 
    // borderWidth:2,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  coinContainer:{
    position:'absolute',
    left:-10,
    zIndex:999999
  },
  coin:{
    width:60,
    height:60,
  },
  price:{
    justifyContent:'center',
    backgroundColor:'#06003F',
    borderRadius:8,
    padding:8,
    paddingHorizontal:50,
    position:'relative',
    zIndex:-111
  },
  priceText:{
    color:'#fff',
    textAlign:'center',
    fontFamily: 'PoetsenOne-Regular',
    fontWeight:'500',
  },
  addButton: {
    backgroundColor: "#4EAB43",
    padding:8,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    position:'absolute',
    right:-2
  },
  addButtonText: {
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
  },
  WinnerContainer: {
    backgroundColor: "#9653E9",
    borderWidth: 2,
    borderColor: "#7056A0",
    borderRadius: 30,
    alignItems: "center",
    width: width * 0.9,
    position:'relative'
  },
  gradient: {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
      congratulationContainer:{
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
      },
      congratulationText:{
        justifyContent: 'center',
        alignItems: 'center',
        position:'absolute',
        zIndex:999,
        top: -2,
        color:'#fff',
        fontFamily: 'PoetsenOne-Regular',
        fontWeight:'400',
        fontSize:14,
      },
      winnerImage: {
        position:'absolute',
        top:-100,
        width:200,
        height:180,
        borderRadius: 30, 
        resizeMode: 'contain', 
        zIndex:1
      },
      topbarImage:{
        resizeMode:'contain',
        width:200,
        height:120,
      },
      resultContainer:{
      },
      resultBox:{
        flexDirection:'row',
        borderWidth:2,
        borderColor:'#00000080',
        backgroundColor:'#382D76',
        padding:5,
        gap:5,
        borderRadius:12
      },
      number:{
        width:50,
        height:50,
        resizeMode: 'contain', 
      },
      resultScroll: {
        maxHeight: 300, // Set a max height to limit the scrollable area
        width: '100%',
    },
    resultContent: {
        paddingBottom: 10,
    },
      tokenContainer:{
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:10,
        backgroundColor:'#240D53',
        borderRadius:12,
        width:'55%',
        gap:10
      },
      tokenImage:{
        width:40,
        height:40,
        resizeMode: 'contain', 
      },
      name:{
         fontFamily: 'PoetsenOne-Regular',
         color:'#fff',
         fontSize:16  
      },
      winnerText:{
        justifyContent:'center',
        alignItems:'center',
        borderRadius:12,
        backgroundColor:'#240D53',
        paddingHorizontal:10,
        width:'25%'
      },
      winner:{
        fontFamily: 'PoetsenOne-Regular', 
        textAlign:'center' ,
        color:'#fff',
        fontSize:14  
      },
      buttonContainer:{
        width:width*0.9,
        flexDirection:'row',
        gap:10,
        justifyContent:'center',
        alignItems:'center',
        paddingVertical:20
      },
      btn:{
        width: "45%",
        height: 50,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      home:{
        color:'#fff',
        fontFamily: 'PoetsenOne-Regular',
        fontSize:20
      },
      tokenNumberContainer: {
        position: 'relative',
        width: 50,
        // height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        },
      tokenId: {
        position: 'absolute',
        fontSize: 18,
        fontFamily: 'PoetsenOne-Regular',
        color: '#F4DD62',
        fontWeight: 'bold',
        },

})