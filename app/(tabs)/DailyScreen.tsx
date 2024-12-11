import { View, Text, FlatList, StyleSheet } from "react-native";
import { useTasks } from "../hooks/useTasks";
import TaskList from "../components/TaskList";
import { mapTasksWithType } from "../utils/mapTasksWithType";

const DailyScreen = () => {
  const { daily } = useTasks(); // Hämta dagliga tasks från context

  console.log("Daily tasks:", daily); // Kontrollera att varje task har en `type`

  return (
    <View style={styles.container}>
      <TaskList tasks={daily.map((task) => ({ ...task, type: "daily" }))} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

export default DailyScreen;
