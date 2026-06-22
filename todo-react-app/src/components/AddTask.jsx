import React, { useState } from 'react';
import TaskService from './TaskService';
import { useNavigate } from 'react-router-dom';
import '../css/taskform.css';

const AddTask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('MEDIUM');
  const [dueDate, setDueDate] = useState('');
  const navigate = useNavigate();

  const saveTask = (e) => {
    e.preventDefault();
    const task = { title, description, priority, dueDate, status: 'PENDING' };
    TaskService.saveTask(task)
      .then(() => navigate('/list'))
      .catch((error) => console.error('Error saving task:', error));
  };

  return (
    <div className="form-container">
      <h2>ADD TASK</h2>
      <hr />
      <form onSubmit={saveTask}>
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
          <button type="submit" className="btn-save">Save</button>
          <button type="button" className="btn-cancel" onClick={() => navigate('/')}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AddTask;
