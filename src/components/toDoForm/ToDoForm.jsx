import styles from "./toDoForm.module.css";
import { useState } from "react";
import { Default_PRIORITY, PRIORITIES } from "../constants/priorities";
import { ToDoFormFields } from "../ToDoFormFields/ToDoFormFields";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { getToDoFUnctionSchema } from "../schemas/todo";

export function ToDoForm({ onTaskAdd }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(getToDoFUnctionSchema()),
    defaultValues: {
      description: "",
      deadline: "",
      priority: Default_PRIORITY,
      completed: false,
    },
  });

  function handleCreate(data) {
    onTaskAdd(data);
    reset();
  }

  let [isVisible, setIsVisible] = useState(false);

  return (
    <section>
      <h3 className={styles.Title}>
        New To-Do
        <button onClick={() => setIsVisible(!isVisible)}>
          {" "}
          {isVisible ? "Hide Task" : "Show Task"}{" "}
        </button>
      </h3>

      <form className={styles.Form} onSubmit={handleSubmit(handleCreate)}>
        <ToDoFormFields
          isVisible={isVisible}
          register={register}
          errors={errors}
        />

        <input type="submit" value="Add" />
      </form>
    </section>
  );
}
