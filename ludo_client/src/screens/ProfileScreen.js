import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import Wrapper from '../components/Wrapper';
// Get screen width
const { width } = Dimensions.get("window");

const ProfileScreen = () => {
  return (
  <Wrapper>
      <View style={styles.container}>
      {/* header */}
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
          <Text style={styles.title}>PROFILE</Text>

          <Text style={styles.title}></Text>
        </View>
      </LinearGradient>

      {/* profile section */}
      <View style={styles.profileContainer}>
        <Image
          source={require('../assets/images/profileIcon.png')}
          style={styles.avatar}
        />
        <View style={styles.nameContainer}>
          <Text style={styles.name}>Hardeep Mehta</Text>

          {/* Wallet Button with Gradient Border */}
          <LinearGradient
            colors={[ 'rgba(3, 195, 255, 0)', '#00C2FF', ]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.walletButtonBorder}
          >
            <View style={styles.walletButton}>
              <Text style={styles.walletText}>$100</Text>
            </View>
          </LinearGradient>

          {/* Wallet Icon Above the Button */}
          <View style={styles.walletIconContainer}>
            <Image
              source={require('../assets/images/addmoneyIcon.png')}
              style={styles.walletIcon}
            />
          </View>
        </View>
      </View>

    {/* score section */}
      <LinearGradient
        colors={['#9653E9', '#6425B3']}
        start={{ x: 0.5, y: 0.5 }}
        end={{ x: 1, y: 1 }}
        style={styles.scoreBoard}
      >
            <View style={styles.statSection}>
                <Text style={styles.statNumber}>31</Text>
                <Text style={styles.statLabel}>Won</Text>
            </View>

            {/* Center Section */}
            <View style={styles.midstatSection}>
                <Text style={styles.statNumber}>45</Text>
                <Text style={styles.statLabel}>Game Played</Text>
            </View>

            {/* Right Section */}
            <View style={styles.statSection}>
                <Text style={styles.statNumber}>14</Text>
                <Text style={styles.statLabel}>Lost</Text>
            </View>
      </LinearGradient>

      {/* inputs */}
      <View style={styles.detailContainer}>
       <View style={styles.inputs}>
          <Image
            source={require('../assets/images/callicon.png')} // Replace with your coin image path
            style={styles.icons}
             />
          <Text style={styles.inputText}>82739827909</Text>
       </View>
       <View style={styles.inputs}>
          <Image
            source={require('../assets/images/phoneIcon.png')} // Replace with your coin image path
            style={styles.icons}
             />
          <Text style={styles.inputText}>Contact US</Text>
       </View>
       <View style={styles.inputs}>
          <Image
            source={require('../assets/images/termsIcon.png')} // Replace with your coin image path
            style={styles.icons}
             />
          <Text style={styles.inputText}>Terms & Condition</Text>
       </View>
      </View>
   
     {/* logout button */}
<View style={styles.logoutBtn}>
  <LinearGradient
    colors={['#D10A0B', '#D10A0B']}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
    style={styles.logoutBtnLinearGradient}
  >
    <LinearGradient
      colors={['rgba(255, 255, 255, 0.413)', 'rgba(255, 255, 255, 0)']}
      start={{ x: 0.26, y: 0.21 }}
      end={{ x: 1, y: 1 }}
      style={styles.logoutBtnRadialGradient}
    >
      {/* Your button content goes here */}
      <Image
          source={require('../assets/images/logoutBtn.png')}
          style={styles.icons}
           />
      <Text style={styles.logoutText}>Logout</Text>
    </LinearGradient>
  </LinearGradient>
</View>

     <View></View>
    </View>
  </Wrapper>

   
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  backBtn: {
    width: 60,
    height: 60,
  },
  title: {
    fontSize: 20,
    fontFamily: 'PoetsenOne-Regular',
    fontWeight: '400',
    color: '#FFF',
    textAlign: 'center',
  },
  profileContainer: {
    backgroundColor: '#2E0C7A80',
    borderWidth: 2,
    borderColor: '#7056A0',
    borderRadius: 30,
    alignItems: 'center',
    padding: 20,
    flexDirection: 'row',
    width: width * 0.9,
    gap: 20,
  },
  avatar: {
    width: 70,
    height: 70,
  resizeMode: 'contain', 

  },
  nameContainer: {
    gap:15
  },
  name: {
    color: '#fff',
    fontSize:24,
    fontFamily: 'PoetsenOne-Regular',
  },
  walletButtonBorder: {
    padding: 3,
    borderRadius: 20,
   width:'120px'
  },
  walletButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#003090',
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 20,
    justifyContent: 'center',
  },
  walletIconContainer: {
    alignItems: 'center', // Center the icon horizontally
    position:'absolute',
    top:45,
    left:'-9px'
  },
  walletIcon: {
    width: 30,
    height: 30,
   
  },
  walletText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '400',
    fontFamily: 'PoetsenOne-Regular',
  },
  scoreBoard:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 16,
    padding: 50,
    marginHorizontal: 10,
    width: width * 0.9,
  },
  midstatSection:{
    alignItems: 'center',
    bottom:'25px'
  },
  statSection: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '400',
    color: '#F2FF00', 
    fontFamily: 'PoetsenOne-Regular',

  },
  statLabel: {
    fontSize: 16,
    fontWeight: '400',
    color: '#FFFFFF', 
    fontFamily: 'PoetsenOne-Regular',

  },
  detailContainer:{
    gap:10
  },
  inputs: {
    width: width * 0.9,
    height: 60,
    borderRadius: 18,
    alignItems: 'center',
    backgroundColor: '#5074BD',
    flexDirection:'row',
    gap:20,
    paddingHorizontal:20
  },
  inputText: {
    fontSize: 18,
    color: '#fff',
    fontFamily: 'PoetsenOne-Regular',
  },
  icons:{
    width:20,
    height:20
  },
  logoutBtn:{
    width: width * 0.9,
    height:50,
    
  },
  logoutBtnLinearGradient: {
    width: width * 0.9,
    height:50,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 18,
    overflow: 'hidden',
    flexDirection:'row',
    gap:10
},

logoutBtnRadialGradient: {
  width: width * 0.9,
  height:50,
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 18,
  overflow: 'hidden',
  flexDirection:'row',
  gap:10

},

logoutText: {
  fontSize: 18,
  fontWeight: '400',
  color: '#FFF',
  fontFamily: 'PoetsenOne-Regular',
}
});
