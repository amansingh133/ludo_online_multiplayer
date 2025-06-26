import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "../screens/SplashScreen";
import HomeScreen from "../screens/DemoHomeScreen";
import LudoBoard from "../screens/LudoBoard";
import WaitingScreen from "../screens/WaitingScreen";
import { navigationRef } from "../utils/NavigationUtils";
import ResultScreen from "../screens/DemoResultsScreen";
import DemoResultScreen from "../screens/RegisterScreen";
import LoginScreen from "../screens/LoginScreen";
import OtpScreen from "../screens/OtpScreen";
import AddMoney from "../screens/AddMoney";
import WithdrawScreen from "../screens/WithdrawScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ReferScreen from "../screens/ReferScreen";
import EntryFee from "../screens/EntryFee";
import LoadingScreen from "../screens/LoadingScreen";
import Winner from "../screens/Winner";
import WalletScreen from "../screens/WalletScreen";

import DemoHomeScreen from "../screens/DemoHomeScreen";
import RegisterScreen from "../screens/RegisterScreen";
import DemoSelectorScreen from "../screens/DemoSelectorScreen";

const Stack = createNativeStackNavigator();

function Navigation() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName="DemoHomeScreen"
        screenOptions={() => ({
          headerShown: false,
        })}
      >
        <Stack.Screen
          name="LudoBoard"
          options={{
            animation: "fade",
          }}
          component={LudoBoard}
        />

        <Stack.Screen
          name="HomeScreen"
          options={{
            animation: "fade",
          }}
          component={HomeScreen}
        />
        <Stack.Screen
          name="DemoHomeScreen"
          options={{
            animation: "fade",
          }}
          component={DemoHomeScreen}
        />
        <Stack.Screen
          name="SplashScreen"
          options={{
            animation: "fade",
          }}
          component={SplashScreen}
        />
        <Stack.Screen
          name="DemoSelectorScreen"
          options={{
            animation: "fade",
          }}
          component={DemoSelectorScreen}
        />
        <Stack.Screen
          name="WaitingScreen"
          options={{
            animation: "fade",
          }}
          component={WaitingScreen}
        />
        <Stack.Screen
          name="DemoResultsScreen"
          options={{
            animation: "fade",
          }}
          component={DemoResultScreen}
        />
        <Stack.Screen
          name="RegisterScreen"
          options={{
            animation: "fade",
          }}
          component={RegisterScreen}
        />
        <Stack.Screen
          name="LoginScreen"
          options={{
            animation: "fade",
          }}
          component={LoginScreen}
        />
        <Stack.Screen
          name="OtpScreen"
          options={{
            animation: "fade",
          }}
          component={OtpScreen}
        />
        <Stack.Screen
          name="AddMoney"
          options={{
            animation: "fade",
          }}
          component={AddMoney}
        />
        <Stack.Screen
          name="WithdrawScreen"
          options={{
            animation: "fade",
          }}
          component={WithdrawScreen}
        />
        <Stack.Screen
          name="ProfileScreen"
          options={{
            animation: "fade",
          }}
          component={ProfileScreen}
        />
        <Stack.Screen
          name="ReferScreen"
          options={{
            animation: "fade",
          }}
          component={ReferScreen}
        />
        <Stack.Screen
          name="Winner"
          options={{
            animation: "fade",
          }}
          component={Winner}
        />
        <Stack.Screen
          name="EntryFee"
          options={{
            animation: "fade",
          }}
          component={EntryFee}
        />
        <Stack.Screen
          name="LoadingScreen"
          options={{
            animation: "fade",
          }}
          component={LoadingScreen}
        />
        <Stack.Screen
          name="WalletScreen"
          options={{
            animation: "fade",
          }}
          component={WalletScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
