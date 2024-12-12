import { TasksState, TasksAction } from "../types/types";

export const tasksReducer = (
  state: TasksState,
  action: TasksAction
): TasksState => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload };

    case "SET_TASKS":
      return {
        ...state,
        [action.payload.type]: action.payload.tasks,
      };
    case "ADD_TASK":
      return {
        ...state,
        [action.payload.type]: [
          ...state[action.payload.type],
          action.payload.task,
        ],
      };
    case "UPDATE_TASK":
      return {
        ...state,
        [action.payload.type]: state[action.payload.type].map((task) =>
          task.id === action.payload.task.id ? action.payload.task : task
        ),
      };
    case "DELETE_TASK":
      return {
        ...state,
        [action.payload.type]: state[action.payload.type].filter(
          (task) => task.id !== action.payload.id
        ),
      };
    default:
      return state;
  }
};
