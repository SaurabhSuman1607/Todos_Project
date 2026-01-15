import styles from "./ToDoFilters.module.css";
import { useEffect, useState } from "react";
import { COMPLETED_FILTERS, PRIORITY_FILTERS } from "../constants/filters";

export function ToDoFilters({ setFilters }) {
  let [Completed, setCompleted] = useState("all");
  let [Priority, setPriority] = useState("all");

  useEffect(() => {
    const filters = {
      completed: COMPLETED_FILTERS[Completed].value,
      priority: PRIORITY_FILTERS[Priority].value,
    };

    setFilters(filters);
  }, [Completed, Priority]);

  return (
    <section>
      <h3>Filters</h3>

      <div className={styles.Filters}>
        <label htmlFor="completed">Completed</label>
        <select
          id="completed"
          value={Completed}
          onChange={(event) => setCompleted(event.target.value)}
        >
          {Object.entries(COMPLETED_FILTERS).map(([key, { label }]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>

        <label htmlFor="priority">Priority</label>
        <select
          id="priority"
          value={Priority}
          onChange={(event) => setPriority(event.target.value)}
        >
          {Object.entries(PRIORITY_FILTERS).map(([key, { label }]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
      </div>
    </section>
  );
}
