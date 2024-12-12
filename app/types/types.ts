export type Task = {
  id: string;
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
  updateTask: (task: Task, type: TaskType) => Promise<void>;
  deleteTask: (id: string, type: TaskType) => Promise<void>;
  fetchTasks: () => Promise<void>;
};

export type TaskListProps = {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
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

export type TasksState = {
  daily: Task[];
  weekly: Task[];
  monthly: Task[];
  loading: boolean;
};

export type TasksAction =
  | { type: "SET_TASKS"; payload: { type: TaskType; tasks: Task[] } }
  | { type: "ADD_TASK"; payload: { type: TaskType; task: Task } }
  | { type: "UPDATE_TASK"; payload: { type: TaskType; task: Task } }
  | { type: "DELETE_TASK"; payload: { type: TaskType; id: string } }
  | { type: "SET_LOADING"; payload: boolean };

// OBS: Default export används inte, endast för att förhindra varningar
const defaultExport = {};
export default defaultExport;
