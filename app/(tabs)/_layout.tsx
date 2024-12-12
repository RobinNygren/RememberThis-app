import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import DailyScreen from "./DailyScreen";
import WeeklyScreen from "./WeeklyScreen";
import MonthlyScreen from "./MonthlyScreen";
import { Platform } from "react-native";

const isWeb = Platform.OS === "web";

const Tab = createBottomTabNavigator();

export default function TabsLayout() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false, // Dölj header för flikarna
        tabBarStyle: {
          height: isWeb ? 60 : 60, // Justera höjd för webben
          backgroundColor: "#fff",
        },
        tabBarLabelStyle: {
          fontSize: isWeb ? 10 : 14, // Mindre text på webben
        },
      }}
    >
      <Tab.Screen
        name="Daily"
        options={{
          title: "Daily Tasks",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chevron-up" size={size} color={color} />
          ),
        }}
        component={DailyScreen}
      />
      <Tab.Screen
        name="Weekly"
        options={{
          title: "Weekly Tasks",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chevron-up" size={size} color={color} />
          ),
        }}
        component={WeeklyScreen}
      />
      <Tab.Screen
        name="Monthly"
        options={{
          title: "Monthly Tasks",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chevron-up" size={size} color={color} />
          ),
        }}
        component={MonthlyScreen}
      />
    </Tab.Navigator>
  );
}
