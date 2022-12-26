export const defaultTasks = [
  { id: 1, value: "homework", isDone: false },
  { id: 2, value: "coffee", isDone: false },
];

export const getCachedTasks = () =>
  !localStorage.getItem("tasks")
    ? defaultTasks
    : JSON.parse(localStorage.getItem("tasks"));
