import { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { useTasks } from "../hooks/useTasks";
import { Task, TaskType } from "../types/types";

const AddTaskScreen = () => {
  const [task, setTask] = useState("");
  const [date, setDate] = useState("");
  const [reminder, setReminder] = useState("");
  const [type, setType] = useState<TaskType>("daily");

  const { addTask } = useTasks();

  const handleAddTask = async () => {
    const newTask: Task = { id: Date.now(), task, date, reminder };
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
      <Button title="Add Task" onPress={handleAddTask} />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Button
          title="Testa Knappen"
          onPress={() => alert("Knappen fungerar!")}
        />
      </View>
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
});

export default AddTaskScreen;
