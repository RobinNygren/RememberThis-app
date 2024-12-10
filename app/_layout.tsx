import React, { useEffect } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Ionicons from "@expo/vector-icons/Ionicons";
import TabsLayout from "./(tabs)/_layout";
import AddTaskScreen from "./drawer/AddTaskScreen";
import CalendarScreen from "./drawer/CalendarScreen";
import TasksProvider from "./context/TasksProvider";
import { useNavigationState } from "@react-navigation/native";

const Drawer = createDrawerNavigator();

export default function RootLayout() {
  const navState = useNavigationState((state) => state);

  useEffect(() => {
    console.log("Drawer state changed:", navState);
  }, [navState]);

  return (
    <TasksProvider>
      <Drawer.Navigator
        initialRouteName="Tabs"
        screenOptions={{
          headerShown: true,
          drawerType: "front", // Drawer ovanpå innehållet
          overlayColor: "rgba(0, 0, 0, 0.5)", // Halvtransparent overlay
        }}
      >
        <Drawer.Screen
          name="Tabs"
          component={TabsLayout}
          options={{
            title: "Home",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="AddTask"
          component={AddTaskScreen}
          options={{
            title: "Add Task",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="add-outline" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="Calendar"
          component={CalendarScreen}
          options={{
            title: "Calendar",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="calendar-outline" size={size} color={color} />
            ),
          }}
        />
      </Drawer.Navigator>
    </TasksProvider>
  );
}
