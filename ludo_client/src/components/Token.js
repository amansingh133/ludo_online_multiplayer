import {
  Animated,
  Easing,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Platform,
} from "react-native";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { BackgroundImage } from "../utils/GetIcons";
import Svg, { Circle } from "react-native-svg";
import { useSelector } from "react-redux";
import {
  selectCellSelection,
  selectDiceNo,
  selectPocketTokenSelection,
} from "../redux/gameReducers/gameSelectors";
import { selectUser } from "../redux/userReducers/userSelector";

const Token = React.memo(
  ({ color, cell, player, onPress, pieceId, tokenCountInCell }) => {
    const rotation = useRef(new Animated.Value(0)).current;
    const currentPlayerTokenSelection = useSelector(selectPocketTokenSelection);
    const currentPlayerCellSelection = useSelector(selectCellSelection);
    const diceNo = useSelector(selectDiceNo);
    const playerPieces = useSelector((state) => state.game[`player${player}`]);
    const tokenImage = BackgroundImage.GetImage(color);
    const user = useSelector(selectUser);

    const isTokenEnabled = useMemo(
      () =>
        user?.playerNo === `player${player}` &&
        player === currentPlayerTokenSelection,
      [user, player, currentPlayerTokenSelection]
    );

    const isCellEnabled = useMemo(
      () =>
        user?.playerNo === `player${player}` &&
        player === currentPlayerCellSelection,
      [user, player, currentPlayerCellSelection]
    );

    const isForwardable = useCallback(() => {
      const piece = playerPieces?.find((item) => item.id === pieceId);
      return piece && piece.travelCount + diceNo <= 57;
    }, [playerPieces, pieceId, diceNo]);

    const shouldAnimate = useMemo(() => {
      if (cell) {
        return isCellEnabled && isForwardable();
      }
      return isTokenEnabled;
    }, [cell, isCellEnabled, isForwardable, isTokenEnabled]);

    useEffect(() => {
      let rotateAnimation;

      if (shouldAnimate) {
        rotateAnimation = Animated.loop(
          Animated.timing(rotation, {
            toValue: 1,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: Platform.OS !== "web",
          })
        );
        rotateAnimation.start();
      } else {
        rotation.setValue(0);
      }

      return () => {
        rotateAnimation?.stop();
      };
    }, [shouldAnimate, rotation]);

    const rotateInterpolate = rotation.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"],
    });

    const tokenContainerStyle = useMemo(
      // () => [
      //   styles.container,
      //   {
      //     transform: [{ scale: shouldAnimate ? 1.2 : 1 }],
      //     zIndex: shouldAnimate ? 101 : 99,
      //   },
      // ],

      () => {
        let scale = 1;

        if (cell && tokenCountInCell > 1 && !shouldAnimate) {
          scale = 0.7;
        }

        if (shouldAnimate) {
          scale = 1.2;
        }

        return [
          styles.container,
          {
            transform: [{ scale }],
            zIndex: shouldAnimate ? 101 : 99,
          },
        ];
      },

      [shouldAnimate, tokenCountInCell, cell]
    );

    return (
      <TouchableOpacity
        style={tokenContainerStyle}
        activeOpacity={0.5}
        disabled={!(cell ? isCellEnabled && isForwardable() : isTokenEnabled)}
        onPress={onPress}
      >
        <View style={styles.hollowCircle}>
          {shouldAnimate && (
            <View style={styles.dashedCircleContainer}>
              <Animated.View
                style={[
                  styles.dashedCircle,
                  { transform: [{ rotate: rotateInterpolate }] },
                ]}
              >
                <Svg height="18" width="18">
                  <Circle
                    cx="9"
                    cy="9"
                    r="8"
                    stroke="#3d251e"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    strokeDashoffset="0"
                    fill="transparent"
                  />
                </Svg>
              </Animated.View>
            </View>
          )}
        </View>

        <Image
          source={tokenImage}
          style={{ width: 32, height: 32, position: "absolute", top: -16 }}
        />
      </TouchableOpacity>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    alignSelf: "center",
  },
  hollowCircle: {
    width: 15,
    height: 15,
    position: "absolute",
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Token;
