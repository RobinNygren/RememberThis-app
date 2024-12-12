import React from "react";
import { View, Text, FlatList, Button, StyleSheet } from "react-native";
import { TaskListProps, Task, TaskType } from "../types/types";
import { getTaskColor } from "../utils/getTaskColor";
import { useTasks } from "../hooks/useTasks";

const TaskList = ({ tasks, type }: { tasks: Task[]; type: TaskType }) => {
  const { updateTask, deleteTask } = useTasks();

  const handleEdit = (task: Task) => {
    const updatedTask = { ...task, task: `${task.task} (updated)` };
    updateTask(updatedTask, type);
  };

  const handleDelete = (id: string) => {
    deleteTask(id, type);
  };

  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View
          style={[styles.taskItem, { backgroundColor: getTaskColor(type) }]}
        >
          <Text style={styles.taskText}>{item.task}</Text>
          <Text>{`Date: ${item.date}`}</Text>
          <Text>{`Reminder: ${item.reminder}`}</Text>
          <View style={styles.buttonContainer}>
            <Button title="Edit" onPress={() => handleEdit(item)} />
            <Button title="Delete" onPress={() => handleDelete(item.id)} />
          </View>
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});

export default TaskList;
