export type Task = {
  id: number;
  task: string;
  date: string; // Format: YYYY-MM-DD
  reminder: string; // Format: HH:mm
  type: TaskType;
};

export type TaskType = "daily" | "weekly" | "monthly";

export type TasksContextType = {
  daily: Task[];
  weekly: Task[];
  monthly: Task[];
  addTask: (task: Task, type: TaskType) => Promise<void>;
  fetchTasks: () => Promise<void>;
};

export type TaskListProps = {
  tasks: Task[];
};

export type FetchState<T> = {
  data: T | null;
  error: string | null;
  loading: boolean;
};

export type AgendaItem = {
  name: string;
};

export type Day = {
  dateString: string; // YYYY-MM-DD format
  day: number;
  month: number;
  year: number;
  timestamp: number;
};

// workaround för att bli av med varningar om att ingen default export finns
const defaultExport = {};
export default defaultExport;
