import { TaskItem } from "../task-item/task-item";
import styles from "../tasks-list/tasks-list.module.css";

export function TasksList({ tasks, onComplete, onDelete }) {
  return (
    <>
      {tasks.length === 0 ? (
        <p>no items</p>
      ) : (
        <ul className={styles.list}>
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onComplete={onComplete}
              onDelete={onDelete}
            />
          ))}
        </ul>
      )}
    </>
  );
}
