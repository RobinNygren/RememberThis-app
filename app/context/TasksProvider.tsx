import { useEffect, useState } from "react";
import TasksContext from "./TasksContext";
import { Task, TaskType } from "../types/types";
import { useFetch } from "../hooks/useFetch";
import { usePost } from "../hooks/usePost";
import { usePut } from "../hooks/usePut";
import { useDelete } from "../hooks/useDelete";
import { Text, Alert } from "react-native";

const TasksProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: daily, fetchData: fetchDaily } = useFetch<Task[]>("/daily");
  const { data: weekly, fetchData: fetchWeekly } = useFetch<Task[]>("/weekly");
  const { data: monthly, fetchData: fetchMonthly } =
    useFetch<Task[]>("/monthly");

  const { postData: postDaily } = usePost<Task>("/daily");
  const { postData: postWeekly } = usePost<Task>("/weekly");
  const { postData: postMonthly } = usePost<Task>("/monthly");

  const { putData: putDaily } = usePut<Task>("/daily");
  const { putData: putWeekly } = usePut<Task>("/weekly");
  const { putData: putMonthly } = usePut<Task>("/monthly");

  const { deleteData: deleteDaily } = useDelete("/daily");
  const { deleteData: deleteWeekly } = useDelete("/weekly");
  const { deleteData: deleteMonthly } = useDelete("/monthly");

  const [loading, setLoading] = useState(true); // Lägg till loading state

  const fetchTasks = async (type?: TaskType) => {
    try {
      if (type === "daily") await fetchDaily();
      if (type === "weekly") await fetchWeekly();
      if (type === "monthly") await fetchMonthly();
      await Promise.all([fetchDaily(), fetchWeekly(), fetchMonthly()]);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const addTask = async (task: Task, type: TaskType) => {
    if (type === "daily") await postDaily(task);
    if (type === "weekly") await postWeekly(task);
    if (type === "monthly") await postMonthly(task);
    fetchTasks(type);
  };

  const updateTask = async (task: Task, type: TaskType) => {
    try {
      if (type === "daily") await putDaily(`/${task.id}`, task);
      if (type === "weekly") await putWeekly(`/${task.id}`, task);
      if (type === "monthly") await putMonthly(`/${task.id}`, task);
      fetchTasks(type);
    } catch (error) {
      console.error("Error updating task:", error);
      Alert.alert("Error", "Failed to update the task. Please try again.");
    }
  };

  const deleteTask = async (id: string, type: TaskType) => {
    try {
      if (type === "daily") await deleteDaily(`/${id}`);
      if (type === "weekly") await deleteWeekly(`/${id}`);
      if (type === "monthly") await deleteMonthly(`/${id}`);
      fetchTasks(type);
    } catch (error) {
      console.error("Error deleting task:", error);
      Alert.alert("Error", "Failed to delete the task. Please try again.");
    }
  };

  // Förhindra att hooks och rendering körs i onödan genom att sätta loading-state till false
  // när hämtning av data är klar.
  useEffect(() => {
    fetchTasks().finally(() => setLoading(false)); // Uppdatera loading state när hämtning är klar
  }, []);

  if (loading) {
    return <Text>Loading tasks...</Text>;
  }

  // Ge initial tom state så att komponenterna kan använda kontexten direkt
  const initialState = {
    daily: daily || [],
    weekly: weekly || [],
    monthly: monthly || [],
    addTask,
    updateTask,
    deleteTask,
    fetchTasks,
  };

  return (
    <TasksContext.Provider value={initialState}>
      {children}
    </TasksContext.Provider>
  );
};
export default TasksProvider;
