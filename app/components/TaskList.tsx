import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { TaskListProps, TaskType } from "../types/types";
import { getTaskColor } from "../utils/getTaskColor";

const TaskList = ({ tasks }: TaskListProps) => {
  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View
          style={[
            styles.taskItem,
            { backgroundColor: getTaskColor(item.type) },
          ]}
        >
          <Text style={styles.taskText}>{item.task}</Text>
          <Text>{`Date: ${item.date}`}</Text>
          <Text>{`Reminder: ${item.reminder}`}</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  taskItem: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 2,
    borderRadius: 5,
  },
  taskText: {
    fontWeight: "bold",
  },
});

export default TaskList;
