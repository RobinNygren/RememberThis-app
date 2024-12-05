import { View, Text, FlatList, StyleSheet } from "react-native";
import { useTasks } from "../hooks/useTasks";

const MonthlyScreen = () => {
  const { monthly } = useTasks();

  return (
    <View style={styles.container}>
      <FlatList
        data={monthly}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text style={styles.taskText}>{item.task}</Text>
            <Text>{`Date: ${item.date}`}</Text>
            <Text>{`Reminder: ${item.reminder}`}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  taskItem: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
  },
  taskText: {
    fontWeight: "bold",
  },
});

export default MonthlyScreen;
