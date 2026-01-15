import axios from "axios";
const https = axios.create({
  baseURL: import.meta.env.VITE_MOCK_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 5000,
});

https.interceptors.response.use(({ data }) => data);

export const api = {
  toDos: {
    getAll(params = {}) {
      return https
        .get("todos", { params })
        .catch((error) =>
          error?.response.status === 404 ? [] : Promise.reject(error)
        );
    },
    postData(data) {
      return https.post("todos", data);
    },
    deleteData(id) {
      return https.delete(`todos/${id}`);
    },
    updateData(id, data) {
      return https.put(`todos/${id}`, data);
    },
  },
};
