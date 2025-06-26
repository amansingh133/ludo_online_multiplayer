import { Dimensions, Platform } from "react-native";

export const deviceHeight = Dimensions.get("window").height;
export const deviceWidth = Dimensions.get("window").width;
export const boardSize = deviceWidth * 0.96;
export const platform = Platform.OS;
