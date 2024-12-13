import "react-native-gesture-handler";
import { enableScreens } from "react-native-screens";
import { NavigationContainer } from "@react-navigation/native";
import RootLayout from "./_layout"; // Importera RootLayout som definierar Drawer och Stack
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { registerForPushNotificationsAsync } from "./utils/notifications";
import { useEffect } from "react";

enableScreens(); // Optimera skärmar för bättre prestanda

// Wrappa RootLayout med NavigationContainer
export default function App() {
  useEffect(() => {
    const setupPushNotifications = async () => {
      const token = await registerForPushNotificationsAsync();
      if (token) {
        console.log("Push notification token:", token);
        // skicka token till server om den ska lagras
      }
    };

    setupPushNotifications();
  }, []);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <RootLayout />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
