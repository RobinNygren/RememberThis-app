import { View, Text, FlatList, StyleSheet } from "react-native";
import { useTasks } from "../hooks/useTasks";
import TaskList from "../components/TaskList";

const WeeklyScreen = () => {
  const { weekly } = useTasks();

  return (
    <View style={styles.container}>
      <TaskList tasks={weekly.map((task) => ({ ...task, type: "weekly" }))} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

export default WeeklyScreen;
