import React, { useState, useEffect } from 'react';
import TaskService from './TaskService';
import { useNavigate, useParams } from 'react-router-dom';
import '../css/taskform.css';

const UpdateTask = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('MEDIUM');
  const [dueDate, setDueDate] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    TaskService.getTaskById(id)
      .then((res) => {
        const task = res.data;
        setTitle(task.title);
        setDescription(task.description);
        setPriority(task.priority);
        setDueDate(task.dueDate);
      })
      .catch((error) => console.error('Error loading task:', error));
  }, [id]);

  const updateTask = (e) => {
    e.preventDefault();
    const task = { title, description, priority, dueDate };
    TaskService.updateTask(id, task)
      .then(() => navigate('/list'))
      .catch((error) => console.error('Error updating task:', error));
  };

  return (
    <div className="form-container">
      <h2>UPDATE TASK</h2>
      <hr />
      <form onSubmit={updateTask}>
        <div className="form-group">
          <label>Task Title</label>
          <input
            type="text"
            placeholder="Enter task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            placeholder="Enter task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          />
        </div>
        <div className="form-group">
          <label>Priority</label>
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
          </select>
        </div>
        <div className="form-group">
          <label>Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </div>
        <div className="button-group">
          <button type="submit" className="btn-save">Update</button>
          <button type="button" className="btn-cancel" onClick={() => navigate('/list')}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateTask;
