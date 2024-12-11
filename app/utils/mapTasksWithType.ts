import { Task, TaskType } from "../types/types";

export const mapTasksWithType = (
  daily: Task[],
  weekly: Task[],
  monthly: Task[]
) => {
  return [
    ...daily.map((task) => ({ ...task, type: "daily" as TaskType })),
    ...weekly.map((task) => ({ ...task, type: "weekly" as TaskType })),
    ...monthly.map((task) => ({ ...task, type: "monthly" as TaskType })),
  ];
};
