import { useState, useEffect } from "react";
import { api } from "../components/api";

// we are using constructer URLSearchParams to create query string from filters object
export function useToDo() {
  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({});
  const [errorMessage, setErrorMessage] = useState();
  const [isLoading, setLoaders] = useState(false);

  async function fetchToDo() {
    setLoaders(true);
    try {
      const data = await api.toDos.getAll(filters);
      setTasks(data);
    } catch (error) {
      setErrorMessage("Error fetching todos data ");
    } finally {
      setLoaders(false);
    }
  }

  useEffect(() => {
    fetchToDo();
  }, [filters]);

  async function taskHandler(newTask) {
    setLoaders(true);
    try {
      const data = await api.toDos.postData(newTask);
      await fetchToDo();
    } catch (error) {
      setErrorMessage("Error adding new task");
    } finally {
      setLoaders(false);
    }
  }

  async function handleUpdate(taskId, updatedTask) {
    setLoaders(true);
    try {
      await api.toDos.updateData(taskId, updatedTask);
      await fetchToDo();
    } catch (error) {
      setErrorMessage("Failed to update the task");
    } finally {
      setLoaders(false);
    }
  }

  async function handleDelete(taskId) {
    setLoaders(true);
    try {
      await api.toDos.deleteData(taskId);
      await fetchToDo();
    } catch (error) {
      setErrorMessage("Failed to delete the task");
    } finally {
      setLoaders(false);
    }
  }

  return {
    isLoading,
    data: tasks,
    filter: setFilters,
    fetch: fetchToDo,
    create: taskHandler,
    update: handleUpdate,
    delete: handleDelete,
    error: {
      message: errorMessage,
      clear: () => setErrorMessage(),
    },
  };
}
