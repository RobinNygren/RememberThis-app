import { View, Text, FlatList, StyleSheet } from "react-native";
import { useTasks } from "../hooks/useTasks";
import TaskList from "../components/TaskList";

const MonthlyScreen = () => {
  const { monthly } = useTasks();

  return (
    <View style={styles.container}>
      <TaskList tasks={monthly.map((task) => ({ ...task, type: "monthly" }))} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

export default MonthlyScreen;
