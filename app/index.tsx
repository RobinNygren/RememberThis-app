import "react-native-gesture-handler";
import { enableScreens } from "react-native-screens";
import { NavigationContainer } from "@react-navigation/native";
import RootLayout from "./_layout"; // Importera RootLayout som definierar Drawer och Stack
import { GestureHandlerRootView } from "react-native-gesture-handler";

enableScreens(); // Optimera skärmar för bättre prestanda

// Wrappa RootLayout med NavigationContainer
export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <RootLayout />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
