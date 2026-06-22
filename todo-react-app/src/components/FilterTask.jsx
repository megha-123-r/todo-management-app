import React, { useState } from 'react';
import TaskService from './TaskService';
import { useNavigate } from 'react-router-dom';
import '../css/filtertask.css';

const FilterTask = () => {
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [applied, setApplied] = useState(false);

  const applyFilter = () => {
    setApplied(true);
    if (selectedStatus === 'ALL') {
      TaskService.getAllTasks()
        .then((res) => setFilteredTasks(res.data))
        .catch((error) => console.error('Error:', error));
    } else {
      TaskService.filterByStatus(selectedStatus)
        .then((res) => setFilteredTasks(res.data))
        .catch((error) => console.error('Error filtering:', error));
    }
  };

  return (
    <div className="filter-container">
      <h2>FILTER TASKS</h2>
      <hr />
      <button className="btn btn-back" onClick={() => navigate('/')}>Home</button>

      <div className="filter-section">
        <h3>Status</h3>
        <div className="radio-group">
          {['ALL', 'PENDING', 'COMPLETED'].map((status) => (
            <label key={status} className="radio-label">
              <input
                type="radio"
                name="status"
                value={status}
                checked={selectedStatus === status}
                onChange={() => setSelectedStatus(status)}
              />
              {status.charAt(0) + status.slice(1).toLowerCase()}
            </label>
          ))}
        </div>
        <button className="btn btn-apply" onClick={applyFilter}>Apply Filter</button>
      </div>

      {applied && (
        <div className="filter-results">
          <h3>
            {selectedStatus === 'ALL' ? 'All Tasks' : `${selectedStatus.charAt(0) + selectedStatus.slice(1).toLowerCase()} Tasks`}
          </h3>
          {filteredTasks.length === 0 ? (
            <p className="no-result">No tasks found.</p>
          ) : (
            <div className="result-card">
              {filteredTasks.map((task) => (
                <p key={task.id}>{task.id} &nbsp; {task.title} &nbsp;
                  <span className={task.status === 'COMPLETED' ? 'status-completed' : 'status-pending'}>
                    [{task.status}]
                  </span>
                </p>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterTask;
