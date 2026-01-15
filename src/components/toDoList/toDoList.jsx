import { useState } from "react";
import styles from "./toDoList.module.css";
import { Default_PRIORITY, PRIORITIES } from "../constants/priorities";
import { ToDoListItems } from "../toDoListItems/toDoListItems";

export function ToDoList({ tasks, onUpdate, onDelete }) {
  return (
    <section className={styles.toDoList}>
      <h3>To Do List</h3>
      {!tasks.length && <p>Sorry nothing here as of now </p>}
      <ul className={styles.ToDoList}>
        {tasks.map((task) => (
          <ToDoListItems
            key={task.id}
            task={task}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        ))}
      </ul>
    </section>
  );
}
