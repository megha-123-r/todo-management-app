import React, { useState } from 'react';
import TaskService from './TaskService';
import { useNavigate } from 'react-router-dom';
import '../css/searchtask.css';

const SearchTask = () => {
  const navigate = useNavigate();

  const [searchId, setSearchId] = useState('');
  const [taskById, setTaskById] = useState(null);
  const [idError, setIdError] = useState('');

  const [searchTitle, setSearchTitle] = useState('');
  const [tasksByTitle, setTasksByTitle] = useState([]);

  const [searchPriority, setSearchPriority] = useState('HIGH');
  const [tasksByPriority, setTasksByPriority] = useState([]);

  const handleSearchById = () => {
    setIdError('');
    setTaskById(null);
    TaskService.getTaskById(searchId)
      .then((res) => setTaskById(res.data))
      .catch(() => setIdError('Task not found with ID: ' + searchId));
  };

  const handleSearchByTitle = () => {
    setTasksByTitle([]);
    TaskService.searchByTitle(searchTitle)
      .then((res) => setTasksByTitle(res.data))
      .catch((error) => console.error('Error searching by title:', error));
  };

  const handleSearchByPriority = () => {
    setTasksByPriority([]);
    TaskService.searchByPriority(searchPriority)
      .then((res) => setTasksByPriority(res.data))
      .catch((error) => console.error('Error searching by priority:', error));
  };

  return (
    <div className="search-container">
      <h2>SEARCH TASK</h2>
      <hr />
      <button className="btn btn-back" onClick={() => navigate('/')}>Home</button>

      {/* Search by ID */}
      <div className="search-section">
        <h3>Search by ID</h3>
        <div className="search-row">
          <input
            type="number"
            placeholder="Enter Task ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
          <button className="btn btn-search" onClick={handleSearchById}>Search</button>
        </div>
        {idError && <p className="error-msg">{idError}</p>}
        {taskById && (
          <div className="result-card">
            <p className="result-found">Task Found</p>
            <p><strong>ID:</strong> {taskById.id}</p>
            <p><strong>Title:</strong> {taskById.title}</p>
            <p><strong>Description:</strong> {taskById.description}</p>
            <p><strong>Priority:</strong> {taskById.priority}</p>
            <p><strong>Due Date:</strong> {taskById.dueDate}</p>
            <p><strong>Status:</strong> {taskById.status}</p>
          </div>
        )}
      </div>

      {/* Search by Title */}
      <div className="search-section">
        <h3>Search by Title</h3>
        <div className="search-row">
          <input
            type="text"
            placeholder="Enter Title"
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
          />
          <button className="btn btn-search" onClick={handleSearchByTitle}>Search</button>
        </div>
        {tasksByTitle.length > 0 && (
          <div className="result-card">
            {tasksByTitle.map((task) => (
              <p key={task.id}><strong>ID:</strong> {task.id} &nbsp; <strong>Title:</strong> {task.title} &nbsp; <strong>Status:</strong> {task.status}</p>
            ))}
          </div>
        )}
        {tasksByTitle.length === 0 && searchTitle && <p className="no-result">No tasks found.</p>}
      </div>

      {/* Search by Priority */}
      <div className="search-section">
        <h3>Search by Priority</h3>
        <div className="search-row">
          <select value={searchPriority} onChange={(e) => setSearchPriority(e.target.value)}>
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
          </select>
          <button className="btn btn-search" onClick={handleSearchByPriority}>Search</button>
        </div>
        {tasksByPriority.length > 0 && (
          <div className="result-card">
            <p className="result-found">{searchPriority} Priority Tasks</p>
            {tasksByPriority.map((task) => (
              <p key={task.id}>{task.id} &nbsp; {task.title}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchTask;
