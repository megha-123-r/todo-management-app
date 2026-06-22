import axios from 'axios';

const TODO_URL = 'http://localhost:8080/tc';

const TaskService = {

  getAllTasks: () =>
    axios.get(`${TODO_URL}/list`),

  saveTask: (task) =>
    axios.post(`${TODO_URL}/save`, task),

  getTaskById: (id) =>
    axios.get(`${TODO_URL}/get/${id}`),

  updateTask: (id, task) =>
    axios.put(`${TODO_URL}/update/${id}`, task),

  deleteTask: (id) =>
    axios.delete(`${TODO_URL}/delete/${id}`),

  markAsCompleted: (id) =>
    axios.put(`${TODO_URL}/complete/${id}`),

  searchByTitle: (title) =>
    axios.get(`${TODO_URL}/searchByTitle`, { params: { title } }),

  searchByPriority: (priority) =>
    axios.get(`${TODO_URL}/searchByPriority`, { params: { priority } }),

  filterByStatus: (status) =>
    axios.get(`${TODO_URL}/filter`, { params: { status } }),
};

export default TaskService;
