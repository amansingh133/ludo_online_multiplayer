import { Platform } from "react-native";

export const determineUrl = () => {
  let url;

  if (Platform.OS === "android" || Platform.OS === "ios") {
    url = `http://192.168.1.5:5000`;
  } else if (Platform.OS) {
    url = `http://localhost:5000`;
  }

  return url;
};
