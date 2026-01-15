import styles from "./ToDoFormFields.module.css";
import { useState } from "react";
import { Default_PRIORITY, PRIORITIES } from "../constants/priorities";
import { useForm } from "react-hook-form";

export function ToDoFormFields({
  todo = {},
  isVisible = true,
  register,
  errors = {},
}) {
  return (
    <div className={styles.FormFields}>
      <div className={styles.FormField}>
        <input
          type="text"
          aria-label="Name*"
          placeholder="Name*"
          name="name"
          autoComplete="off"
          defaultValue={todo.name}
          {...register("name")}
        />
        {!!errors.name && (
          <span className={styles.FormFieldError}>{errors.name.message}</span>
        )}
      </div>

      {isVisible && (
        <>
          <div className={styles.FormField}>
            <textarea
              aria-label="Description"
              placeholder="Description"
              name="description"
              rows="3"
              defaultValue={todo.description}
              {...register("description")}
            />
            {!!errors.description && (
              <span className={styles.FormFieldError}>
                {errors.description.message}
              </span>
            )}
          </div>

          <div className={styles.FormGroup}>
            <div className={styles.FormField}>
              <label htmlFor="deadline">Deadline</label>
              <input
                type="date"
                id="deadline"
                name="deadline"
                defaultValue={todo.deadline}
                aria-invalid={!!errors.deadline}
                {...register("deadline")}
              />
              {!!errors.deadline && (
                <span className={styles.FormFieldError}>
                  {errors.deadline.message}
                </span>
              )}
            </div>

            <div className={styles.FormField}>
              <label htmlFor="priority">Priority</label>
              <select
                defaultValue={todo.priority ?? Default_PRIORITY}
                id="priority"
                {...register("priority")}
              >
                {Object.entries(PRIORITIES).map(([key, { label }]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
              {!!errors.priority && (
                <span className={styles.FormFieldError}>
                  {errors.priority.message}
                </span>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
