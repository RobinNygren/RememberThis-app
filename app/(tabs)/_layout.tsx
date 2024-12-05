import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DailyScreen from "./DailyScreen";
import WeeklyScreen from "./WeeklyScreen";
import MonthlyScreen from "./MonthlyScreen";

const Tab = createBottomTabNavigator();

export default function TabsLayout() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Daily"
        options={{ title: "Daily Tasks" }}
        component={DailyScreen}
      />
      <Tab.Screen
        name="Weekly"
        options={{ title: "Weekly Tasks" }}
        component={WeeklyScreen}
      />
      <Tab.Screen
        name="Monthly"
        options={{ title: "Monthly Tasks" }}
        component={MonthlyScreen}
      />
    </Tab.Navigator>
  );
}
