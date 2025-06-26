import { View, Text, StyleSheet, Platform } from "react-native";
import { deviceWidth } from "../constants/Scaling";

const CardSelector = ({ title, isSelected, onPress }) => {
  return (
    <View
      style={[
        styles.card,
        { width: deviceWidth * 0.4 },
        isSelected && styles.selectedCard,
      ]}
      onTouchEnd={onPress}
    >
      <Text style={styles.cardTitle}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 50,
    backgroundColor: "#4c669f",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 2,
    borderRadius: 10,
    elevation: 5,
    borderColor: "#d5be3e",
    marginTop: 20,
    // shadowColor: "#d5be3e",
    // shadowOpacity: 0.5,
    // shadowOffset: { width: 1, height: 1 },
    // shadowRadius: 10,
    ...Platform.select({
      web: {
        boxShadow: "1px 1px 10px rgba(213, 190, 62, 0.5)",
      },
      default: {
        elevation: 5,
        shadowColor: "#d5be3e",
        shadowOpacity: 0.5,
        shadowOffset: { width: 1, height: 1 },
        shadowRadius: 10,
      },
    }),
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  selectedCard: {
    backgroundColor: "#d5be3e",
    borderWidth: 2,
    borderColor: "#fff",
  },
});

export default CardSelector;
