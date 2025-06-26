import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { persistor, store } from "./src/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import Navigation from "./src/navigation/Navigation";
import { AppState } from "react-native";
import soundManager from "./src/utils/soundManagerExpo";

SplashScreen.preventAutoHideAsync();

const App = () => {
  const [loaded, error] = useFonts({
    "Philosopher-Bold": require("./src/assets/fonts/Philosopher-Bold.ttf"),
    "Philosopher-Regular": require("./src/assets/fonts/Philosopher-Regular.ttf"),
    "Wallpoet-Regular": require("./src/assets/fonts/Wallpoet-Regular.ttf"),
    "PoetsenOne-Regular": require("./src/assets/fonts/PoetsenOne-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }

    if (loaded) {
      soundManager.preloadSounds();

      const handleAppStateChange = (nextAppState) => {
        if (nextAppState === "inactive" || nextAppState === "background") {
          soundManager.pauseAllSounds();
        } else if (nextAppState === "active") {
          soundManager.preloadSounds();
        }
      };

      const appStateListener = AppState.addEventListener(
        "change",
        handleAppStateChange
      );

      return () => {
        appStateListener.remove();
        soundManager.unloadSounds();
      };
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Navigation />
      </PersistGate>
    </Provider>
  );
};

export default App;
