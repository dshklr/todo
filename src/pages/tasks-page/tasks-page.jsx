import { useState } from "react";
import { TasksList } from "../../components/tasks-list/tasks-list";
import { getCachedTasks } from "../../helpers";
import styles from "./tasks-page.module.css";

export function TasksPage() {
  const [list, setList] = useState(getCachedTasks());
  const [input, setInput] = useState("");
  const [isValid, setIsValid] = useState(true);

  const updateList = (list) => {
    setList(list);
    localStorage.setItem("tasks", JSON.stringify(list));
  };

  const addToDo = () => {
    if (input.trim().length === 0) {
      setIsValid(false);
    } else {
      const newToDo = {
        id: Math.random(),
        value: input,
        isDone: false,
      };

      updateList([...list, { ...newToDo }]);
      setInput("");
    }
  };

  const deleteToDo = (id) => {
    const newList = list.filter((todo) => todo.id !== id);

    updateList(newList);
  };

  const handleInputChange = (e) => {
    setIsValid(true);
    setInput(e.target.value);
  };

  const handleOnClickDone = (id) => {
    const index = list.findIndex((item) => item.id === id);
    const newList = [...list];
    const updatedItem = { ...list[index], isDone: !list[index].isDone };

    newList[index] = updatedItem;

    updateList(newList);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addToDo();
    }
  };

  const { completedTasks, notCompletedTasks } = list.reduce(
    (acc, item) => {
      item.isDone
        ? acc.completedTasks.push(item)
        : acc.notCompletedTasks.push(item);

      return acc;
    },
    {
      completedTasks: [],
      notCompletedTasks: [],
    }
  );

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <input
            className={`${styles.input} ${!isValid && styles.inputError}`}
            onChange={handleInputChange}
            value={input}
            onKeyDown={handleKeyDown}
          />
          <button className={styles.button} onClick={addToDo}>
            &#8594;
          </button>
        </div>
        <TasksList
          tasks={notCompletedTasks}
          onComplete={handleOnClickDone}
          onDelete={deleteToDo}
        />
        <div className={styles.divider} />
        <TasksList
          tasks={completedTasks}
          onComplete={handleOnClickDone}
          onDelete={deleteToDo}
        />
      </div>
    </div>
  );
}
