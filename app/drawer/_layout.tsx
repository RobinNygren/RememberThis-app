import { createDrawerNavigator } from "@react-navigation/drawer";
import TabsLayout from "../(tabs)/_layout";
import AddTaskScreen from "./AddTaskScreen";

const Drawer = createDrawerNavigator();

export default function DrawerLayout() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen
        name="Home"
        options={{ title: "Home" }}
        component={TabsLayout}
      />
      <Drawer.Screen
        name="AddTask"
        options={{ title: "Add Task" }}
        component={AddTaskScreen}
      />
    </Drawer.Navigator>
  );
}
