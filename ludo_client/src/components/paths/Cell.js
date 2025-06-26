import { View, StyleSheet, Text } from "react-native";
import React, { useCallback, useEffect, useMemo } from "react";
import Token from "../Token";
import { RFValue } from "react-native-responsive-fontsize";
import { ArrowRightIcon, StarIcon } from "react-native-heroicons/outline";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentPositions,
  selectGameStatus,
} from "../../redux/gameReducers/gameSelectors";
import {
  selectColors,
  selectPlotData,
  selectUserConnection,
  selectUserStatus,
} from "../../redux/userReducers/userSelector";
import { emitSocketEvent } from "../../redux/userReducers/userActions";

const Cell = ({ color, id }) => {
  const colors = useSelector(selectColors);
  const plotData = useSelector(selectPlotData);

  const dispatch = useDispatch();
  const plottedPieces = useSelector(selectCurrentPositions);
  const userStatus = useSelector(selectUserStatus);
  const userConnection = useSelector(selectUserConnection);
  const gameStatus = useSelector(selectGameStatus);

  const isSafeSpot = useMemo(() => plotData.SafeSpots.includes(id), [id]);
  const isStarSpot = useMemo(() => plotData.StarSpots.includes(id), [id]);
  const isArrowSpot = useMemo(() => plotData.ArrowSpot.includes(id), [id]);

  const piecesAtPosition = useMemo(
    () => plottedPieces.filter((item) => item.pos == id),
    [plottedPieces, id]
  );

  const handlePress = useCallback(
    (playerNo, pieceId) => {
      if (
        userStatus === "inGame" &&
        userConnection === true &&
        gameStatus === "running"
      ) {
        dispatch(
          emitSocketEvent("cellPress", {
            playerNo,
            id: pieceId,
            pos: id,
          })
        );
      }
    },
    [dispatch, id]
  );

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isSafeSpot ? color : "white",
          borderColor: colors.borderColor,
        },
      ]}
    >
      {isStarSpot && <StarIcon size={20} color="grey" />}
      {isArrowSpot && (
        <ArrowRightIcon
          style={{
            transform: [
              {
                rotate:
                  id === 38
                    ? "180deg"
                    : id === 25
                    ? "90deg"
                    : id === 51
                    ? "-90deg"
                    : "0deg",
              },
            ],
          }}
          size={RFValue(12)}
          color="black"
        />
      )}
      {piecesAtPosition?.map((piece, index) => {
        const playerNo =
          piece.id[0] === "A"
            ? 1
            : piece.id[0] === "B"
            ? 2
            : piece.id[0] === "C"
            ? 3
            : 4;

        const pieceColor =
          playerNo === 1
            ? colors.red
            : playerNo === 2
            ? colors.green
            : playerNo === 3
            ? colors.yellow
            : colors.blue;

        return (
          <View
            key={piece.id}
            style={[
              styles.pieceContainer,
              {
                transform: [
                  // {
                  //   scale: piecesAtPosition.length === 1 ? 1 : 0.7,
                  // },
                  {
                    translateX:
                      piecesAtPosition.length === 1
                        ? 0
                        : index % 2 === 0
                        ? -6
                        : 6,
                  },
                  {
                    translateY:
                      piecesAtPosition.length === 1 ? 0 : index < 2 ? -6 : 6,
                  },
                ],
              },
            ]}
          >
            <Token
              cell={true}
              player={playerNo}
              onPress={() => handlePress(playerNo, piece.id)}
              pieceId={piece.id}
              color={pieceColor}
              tokenCountInCell={piecesAtPosition.length}
            />
          </View>
        );
      })}
      <Text style={{ fontSize: 10, color: "black", backgroundColor: "white" }}>
        {id}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 0.4,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  pieceContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    zIndex: 99,
  },
});

export default React.memo(Cell);
