import styles from "../task-item/task-item.module.css";

export function TaskItem({ task, onDelete, onComplete }) {
  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(task.id);
  };

  const handleComplete = () => {
    onComplete(task.id);
  };

  return (
    <li
      onClick={handleComplete}
      className={`${styles.item} ${task.isDone && styles.doneItem}`}
    >
      <span className={task.isDone && styles.doneItemText}>{task.value}</span>{" "}
      <span className={styles.deleteButton} onClick={handleDelete}>
        {" "}
        delete
      </span>
    </li>
  );
}
