import { useContext } from "react";
import TasksContext from "../context/TasksContext";
import { TasksContextType } from "../types/types";

export const useTasks = (): TasksContextType => {
  const context = useContext(TasksContext);
  console.log("TasksContext Value:", context); // Debug-logg
  if (!context) throw new Error("useTasks must be used within TasksProvider");
  return context;
};

export default useTasks;
