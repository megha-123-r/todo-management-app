import React, { useEffect, useState } from 'react';
import TaskService from './TaskService';
import { useNavigate } from 'react-router-dom';
import '../css/listtask.css';

const ListTask = () => {
  const [tasks, setTasks] = useState([]);
  const [deleteConfirm, setDeleteConfirm] = useState({ show: false, id: null, title: '' });
  const navigate = useNavigate();

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = () => {
    TaskService.getAllTasks()
      .then((res) => setTasks(res.data))
      .catch((error) => console.error('Error fetching tasks:', error));
  };

  const confirmDelete = (id, title) => {
    setDeleteConfirm({ show: true, id, title });
  };

  const handleDelete = () => {
    TaskService.deleteTask(deleteConfirm.id)
      .then(() => {
        setTasks(tasks.filter((task) => task.id !== deleteConfirm.id));
        setDeleteConfirm({ show: false, id: null, title: '' });
      })
      .catch((error) => console.error('Error deleting task:', error));
  };

  const handleMarkComplete = (id) => {
    TaskService.markAsCompleted(id)
      .then(() => loadTasks())
      .catch((error) => console.error('Error marking complete:', error));
  };

  const priorityClass = (priority) => {
    if (priority === 'HIGH') return 'badge badge-high';
    if (priority === 'MEDIUM') return 'badge badge-medium';
    return 'badge badge-low';
  };

  const statusClass = (status) => {
    return status === 'COMPLETED' ? 'badge badge-completed' : 'badge badge-pending';
  };

  return (
    <div className="list-container">
      <h1 className="title">TASK LIST</h1>
      <div className="list-header">
        <button className="btn btn-add" onClick={() => navigate('/add')}>
          + Add Task
        </button>
        <button className="btn btn-back" onClick={() => navigate('/')}>
          Home
        </button>
      </div>

      {deleteConfirm.show && (
        <div className="confirm-overlay">
          <div className="confirm-box">
            <p>Are you sure you want to delete <strong>"{deleteConfirm.title}"</strong> ?</p>
            <div className="confirm-buttons">
              <button className="btn btn-yes" onClick={handleDelete}>Yes</button>
              <button className="btn btn-no" onClick={() => setDeleteConfirm({ show: false, id: null, title: '' })}>No</button>
            </div>
          </div>
        </div>
      )}

      <table className="task-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Priority</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td><span className={priorityClass(task.priority)}>{task.priority}</span></td>
              <td>{task.dueDate}</td>
              <td><span className={statusClass(task.status)}>{task.status}</span></td>
              <td>
                <button className="btn btn-view" onClick={() => navigate(`/view/${task.id}`)}>View</button>
                <button className="btn btn-edit" onClick={() => navigate(`/update/${task.id}`)}>Edit</button>
                {task.status === 'PENDING' && (
                  <button className="btn btn-complete" onClick={() => handleMarkComplete(task.id)}>Mark Complete</button>
                )}
                <button className="btn btn-delete" onClick={() => confirmDelete(task.id, task.title)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListTask;
