import styles from "./toDoListItems.module.css";
import { Default_PRIORITY, PRIORITIES } from "../constants/priorities";
import { useState } from "react";
import { ToDoFormFields } from "../ToDoFormFields/ToDoFormFields";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { getToDoFUnctionSchema } from "../schemas/todo";

export function ToDoListItems({ task, onUpdate, onDelete }) {
  const [isEditing, setEditing] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(getToDoFUnctionSchema()),
    defaultValues: task,
  });

  function handleUpdate(event) {
    onUpdate(task.id, { ...task, completed: event.target.checked });
  }

  function handleEdit(data) {
    onUpdate(task.id, data);
    setEditing(false);
  }

  let viewTemplate = (
    <div>
      <input
        type="checkBox"
        name="completed"
        checked={task.completed}
        onChange={handleUpdate}
        className={styles.Status}
      />
      <div className={styles.Info}>
        {task.name}
        <br />
        {task.description && (
          <span className={styles.Description}>{task.description}</span>
        )}
        <div className={styles.AdditionalInfo}>
          {task.deadline}{" "}
          {task.priority !== Default_PRIORITY && PRIORITIES[task.priority] && (
            <span style={{ color: PRIORITIES[task.priority].color }}>
              {PRIORITIES[task.priority].label}
            </span>
          )}
        </div>
      </div>
      <div className={styles.Controls}>
        <button onClick={() => setEditing(true)}>📝</button>
        <button onClick={() => onDelete(task.id)}>🗑️</button>
      </div>
    </div>
  );

  let EditTemplate = (
    <form
      className={styles.Content}
      onReset={() => setEditing(false)}
      onSubmit={handleSubmit(handleEdit)}
    >
      <ToDoFormFields todo={task} register={register} />
      <div className={styles.Controls}>
        <input type="submit" value="💾" />
        <input type="reset" value="❌" />
      </div>
    </form>
  );

  return (
    <li className={styles.ToDoListItem} data-completed={task.completed}>
      {!isEditing ? viewTemplate : EditTemplate}
    </li>
  );
}
