import { createContext } from "react";
import { Task, TaskType, TasksContextType } from "../types/types";

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export default TasksContext;
