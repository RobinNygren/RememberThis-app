import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DrawerLayout from "./drawer/_layout";
import TasksProvider from "./context/TasksProvider";

const Stack = createNativeStackNavigator();

export default function RootLayout() {
  return (
    <TasksProvider>
      <Stack.Navigator>
        {/* DrawerNavigator som huvudstruktur */}
        <Stack.Screen
          name="Drawer"
          component={DrawerLayout}
          options={{ headerShown: false }}
        />
        {/* 404 Fallback */}
        {/*  <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "404 - Not Found" }}
      /> */}
      </Stack.Navigator>
    </TasksProvider>
  );
}
