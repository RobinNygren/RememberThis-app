import { TaskType } from "../types/types";

// Färger för olika typer av tasks
// Record<TaskType, string> skapar ett objekt där nycklarna är "daily", "weekly", och "monthly" (TaskType)
// och värdena är strängar, dvs. färgerna

const TASK_COLORS: Record<TaskType, string> = {
  daily: "#4A90E2", // Blå
  weekly: "#50E3C2", // Grön
  monthly: "#E94E77", // Röd
};

export const getTaskColor = (type: TaskType): string => {
  return TASK_COLORS[type] || "#ccc"; // Standardfärg om typen inte matchar
};

export default TASK_COLORS; // om man vill exportera färgerna för att använda dem direkt
