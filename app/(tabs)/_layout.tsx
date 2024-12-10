import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import DailyScreen from "./DailyScreen";
import WeeklyScreen from "./WeeklyScreen";
import MonthlyScreen from "./MonthlyScreen";

const Tab = createBottomTabNavigator();

export default function TabsLayout() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false, // Dölj header för flikarna
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
