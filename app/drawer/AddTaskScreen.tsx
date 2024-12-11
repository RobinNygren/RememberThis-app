import { useState } from "react";
import { View, TextInput, Text, StyleSheet, Pressable } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useTasks } from "../hooks/useTasks";
import { Task, TaskType } from "../types/types";
import TASK_COLORS from "../utils/getTaskColor";

const AddTaskScreen = () => {
  const [task, setTask] = useState("");
  const [date, setDate] = useState("");
  const [reminder, setReminder] = useState("");
  const [type, setType] = useState<TaskType>("daily"); // Default: daily

  const { addTask } = useTasks();

  const handleAddTask = async () => {
    const newTask: Task = { id: Date.now(), task, date, reminder, type };
    await addTask(newTask, type);
    setTask("");
    setDate("");
    setReminder("");
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Task"
        value={task}
        onChangeText={setTask}
        style={styles.input}
      />
      <TextInput
        placeholder="Date (YYYY-MM-DD)"
        value={date}
        onChangeText={setDate}
        style={styles.input}
      />
      <TextInput
        placeholder="Reminder (HH:mm)"
        value={reminder}
        onChangeText={setReminder}
        style={styles.input}
      />
      {/* Välj typ av task */}
      <Picker
        selectedValue={type}
        onValueChange={(itemValue) => setType(itemValue as TaskType)}
        style={styles.picker}
      >
        <Picker.Item label="Daily" value="daily" />
        <Picker.Item label="Weekly" value="weekly" />
        <Picker.Item label="Monthly" value="monthly" />
      </Picker>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: TASK_COLORS[type] },
          pressed && styles.buttonPressed,
        ]}
        onPress={handleAddTask}
      >
        <Text style={styles.buttonText}>Add Task</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  picker: {
    height: 50,
    marginBottom: 20,
  },
  button: {
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonPressed: {
    opacity: 0.8, // Visuell feedback vid tryck
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default AddTaskScreen;
