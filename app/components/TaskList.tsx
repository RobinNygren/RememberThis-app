import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  Modal,
  TextInput,
  Pressable,
} from "react-native";
import { TaskListProps, Task, TaskType } from "../types/types";
import { getTaskColor } from "../utils/getTaskColor";
import { useTasks } from "../hooks/useTasks";

const TaskList = ({ tasks, type }: { tasks: Task[]; type: TaskType }) => {
  const { updateTask, deleteTask } = useTasks();

  const [editingTask, setEditingTask] = useState<Task | null>(null); // Håller reda på tasken som redigeras
  const [isModalVisible, setModalVisible] = useState(false); // Modalens synlighet

  const handleEdit = (task: Task) => {
    setEditingTask(task); // Sätter tasken som ska redigeras
    setModalVisible(true); // Öppnar modal
  };

  const handleSave = () => {
    if (editingTask) {
      updateTask(editingTask, type); // Uppdaterar tasken
    }
    setModalVisible(false); // Stänger modal
  };

  const handleCancel = () => {
    setModalVisible(false); // Stänger modal utan att spara
    setEditingTask(null); // Rensar redigerad task
  };

  const handleDelete = (id: string) => {
    deleteTask(id, type); // Tar bort task
  };

  return (
    <View style={{ flex: 1 }}>
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

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCancel}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Task</Text>
            <TextInput
              style={styles.input}
              value={editingTask?.task || ""}
              onChangeText={(text) =>
                setEditingTask((prev) => prev && { ...prev, task: text })
              }
              placeholder="Task"
            />
            <TextInput
              style={styles.input}
              value={editingTask?.date || ""}
              onChangeText={(text) =>
                setEditingTask((prev) => prev && { ...prev, date: text })
              }
              placeholder="Date (YYYY-MM-DD)"
            />
            <TextInput
              style={styles.input}
              value={editingTask?.reminder || ""}
              onChangeText={(text) =>
                setEditingTask((prev) => prev && { ...prev, reminder: text })
              }
              placeholder="Reminder (HH:mm)"
            />
            <View style={styles.modalButtons}>
              <Pressable style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.buttonText}>Save</Text>
              </Pressable>
              <Pressable style={styles.cancelButton} onPress={handleCancel}>
                <Text style={styles.buttonText}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  saveButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  cancelButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default TaskList;
