import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { TaskListProps, TaskType } from "../types/types";

const TaskList = ({ tasks }: TaskListProps) => {
  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View
          style={[styles.taskItem, { borderColor: getColorByType(item.type) }]}
        >
          <Text style={styles.taskText}>{item.task}</Text>
          <Text>{`Date: ${item.date}`}</Text>
          <Text>{`Reminder: ${item.reminder}`}</Text>
        </View>
      )}
    />
  );
};

// Helper function to get color by type
const getColorByType = (type: TaskType) => {
  const colors: Record<TaskType, string> = {
    daily: "#4A90E2",
    weekly: "#50E3C2",
    monthly: "#E94E77",
  };
  return colors[type] || "#ccc"; // Default color if no match
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
