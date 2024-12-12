import { useEffect, useState, useReducer } from "react";
import TasksContext from "./TasksContext";
import { Task, TaskType, TasksState } from "../types/types";
import { tasksReducer } from "./tasksReducer";
import { useFetch } from "../hooks/useFetch";
import { usePost } from "../hooks/usePost";
import { usePut } from "../hooks/usePut";
import { useDelete } from "../hooks/useDelete";
import { Text, Alert, Platform } from "react-native";

const initialTasksState: TasksState = {
  daily: [],
  weekly: [],
  monthly: [],
  loading: false, // Sätt loading till false initialt
};

const TasksProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(tasksReducer, initialTasksState);

  const fetchMap = {
    daily: useFetch<Task[]>("/daily"),
    weekly: useFetch<Task[]>("/weekly"),
    monthly: useFetch<Task[]>("/monthly"),
  };

  const postMap = {
    daily: usePost<Task>("/daily"),
    weekly: usePost<Task>("/weekly"),
    monthly: usePost<Task>("/monthly"),
  };

  const putMap = {
    daily: usePut<Task>("/daily"),
    weekly: usePut<Task>("/weekly"),
    monthly: usePut<Task>("/monthly"),
  };

  const deleteMap = {
    daily: useDelete("/daily"),
    weekly: useDelete("/weekly"),
    monthly: useDelete("/monthly"),
  };

  const fetchTasks = async (type?: TaskType) => {
    try {
      if (type) {
        const tasks = await fetchMap[type].fetchData();
        if (tasks) {
          dispatch({ type: "SET_TASKS", payload: { type, tasks } });
        }
      } else {
        await Promise.all(
          (["daily", "weekly", "monthly"] as TaskType[]).map(
            async (taskType) => {
              const tasks = await fetchMap[taskType].fetchData();
              if (tasks) {
                dispatch({
                  type: "SET_TASKS",
                  payload: { type: taskType, tasks },
                });
              }
            }
          )
        );
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
      Alert.alert(
        "Error Fetching Tasks",
        "An error occurred while fetching tasks. Please try again later."
      );
    }
  };

  const addTask = async (task: Task, type: TaskType) => {
    try {
      await postMap[type].postData(task);
      dispatch({ type: "ADD_TASK", payload: { type, task } });
    } catch (error) {
      console.error("Error adding task:", error);
      Alert.alert("Error adding task", "Please try again later.");
    }
  };

  const updateTask = async (task: Task, type: TaskType) => {
    try {
      await putMap[type].putData(`/${task.id}`, task);
      dispatch({ type: "UPDATE_TASK", payload: { type, task } });
    } catch (error) {
      console.error("Error updating task:", error);
      Alert.alert("Error updating task", "Please try again later.");
    }
  };

  const deleteTask = async (id: string, type: TaskType) => {
    if (Platform.OS === "web") {
      // Webbspecifik confirm-dialog
      const confirm = window.confirm(
        "Are you sure you want to delete this task?"
      );
      if (!confirm) {
        return; // Avbryt om användaren klickar "Cancel"
      }
      try {
        await deleteMap[type].deleteData(`/${id}`);
        dispatch({ type: "DELETE_TASK", payload: { type, id } });
      } catch (error) {
        console.error("Error deleting task:", error);
        alert("Could not delete the task. Please try again.");
      }
    } else {
      // Native Alert för mobiler
      Alert.alert("Delete Task", "Are you sure you want to delete this task?", [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            try {
              await deleteMap[type].deleteData(`/${id}`);
              dispatch({ type: "DELETE_TASK", payload: { type, id } });
            } catch (error) {
              console.error("Error deleting task:", error);
              Alert.alert(
                "Error Deleting Task",
                "Could not delete the task. Please try again."
              );
            }
          },
          style: "destructive",
        },
      ]);
    }
  };

  useEffect(() => {
    const initializeTasks = async () => {
      dispatch({ type: "SET_LOADING", payload: true });
      await fetchTasks();
      dispatch({ type: "SET_LOADING", payload: false });
    };
    initializeTasks();
  }, []);

  if (state.loading) {
    return <Text>Loading tasks...</Text>;
  }

  // Ge initial tom state så att komponenterna kan använda kontexten direkt
  const initialState = {
    daily: state.daily || [],
    weekly: state.weekly || [],
    monthly: state.monthly || [],
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
