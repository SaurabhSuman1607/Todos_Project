import styles from "./App.module.css";
import { ToDoForm } from "./components/toDoForm/toDoForm";
import { ToDoList } from "./components/toDoList/toDoList";
import { ToDoFilters } from "./components/ToDoFilters/ToDoFilters";
import { useToDo } from "./hooks/toDo";
import { Alert } from "./components/Alert/alert";
import { Loader } from "./components/Loader/loader";

function App() {
  const todos = useToDo();

  return (
    <div className={styles.App}>
      <div className={styles.Header}>
        <img
          className={styles.Logo}
          src={import.meta.env.BASE_URL + "to-do.png"}
        />
        <h2 className={styles.Title}>To_Do App</h2>
      </div>

      <div className={styles.AppContainer}>
        {todos.isLoading && <Loader />}
        {!!todos.error.message && (
          <Alert onClear={todos.error.clear}>{todos.error.message} </Alert>
        )}
        <ToDoForm onTaskAdd={todos.create} />
        <ToDoFilters setFilters={todos.filter} />
        <ToDoList
          tasks={todos.data}
          onUpdate={todos.update}
          onDelete={todos.delete}
        />
      </div>
    </div>
  );
}

export default App;
