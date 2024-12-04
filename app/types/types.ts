export type Task = {
  id: number;
  task: string;
  date: string; // Format: YYYY-MM-DD
  reminder: string; // Format: HH:mm
};

export type TaskType = "daily" | "weekly" | "monthly";

export type TasksContextType = {
  daily: Task[];
  weekly: Task[];
  monthly: Task[];
  addTask: (task: Task, type: TaskType) => Promise<void>;
  fetchTasks: () => Promise<void>;
};

export type FetchState<T> = {
  data: T | null;
  error: string | null;
  loading: boolean;
};
