import { useEffect } from "react";
import TasksContext from "./TasksContext";
import { Task, TaskType } from "../types/types";
import { useFetch } from "../hooks/useFetch";

const TasksProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    data: daily,
    fetchData: fetchDaily,
    postData: postDaily,
  } = useFetch<Task[], Task>("/daily");
  const {
    data: weekly,
    fetchData: fetchWeekly,
    postData: postWeekly,
  } = useFetch<Task[], Task>("/weekly");
  const {
    data: monthly,
    fetchData: fetchMonthly,
    postData: postMonthly,
  } = useFetch<Task[], Task>("/monthly");

  const fetchTasks = async () => {
    await Promise.all([fetchDaily(), fetchWeekly(), fetchMonthly()]);
  };

  const addTask = async (task: Task, type: TaskType) => {
    if (type === "daily") await postDaily(task);
    if (type === "weekly") await postWeekly(task);
    if (type === "monthly") await postMonthly(task);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <TasksContext.Provider
      value={{
        daily: daily || [],
        weekly: weekly || [],
        monthly: monthly || [],
        addTask,
        fetchTasks,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export default TasksProvider;
