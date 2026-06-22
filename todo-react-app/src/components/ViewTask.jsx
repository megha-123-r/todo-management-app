import React, { useEffect, useState } from 'react';
import TaskService from './TaskService';
import { useNavigate, useParams } from 'react-router-dom';
import '../css/viewtask.css';

const ViewTask = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    TaskService.getTaskById(id)
      .then((res) => setTask(res.data))
      .catch((error) => console.error('Error fetching task:', error));
  }, [id]);

  if (!task) return <div className="view-container"><p>Loading...</p></div>;

  return (
    <div className="view-container">
      <h2>TASK DETAILS</h2>
      <hr />
      <div className="view-detail">
        <span className="view-label">Task ID:</span>
        <span className="view-value">{task.id}</span>
      </div>
      <div className="view-detail">
        <span className="view-label">Title:</span>
        <span className="view-value">{task.title}</span>
      </div>
      <div className="view-detail">
        <span className="view-label">Description:</span>
        <span className="view-value">{task.description}</span>
      </div>
      <div className="view-detail">
        <span className="view-label">Priority:</span>
        <span className={`view-value priority-${task.priority.toLowerCase()}`}>{task.priority}</span>
      </div>
      <div className="view-detail">
        <span className="view-label">Due Date:</span>
        <span className="view-value">{task.dueDate}</span>
      </div>
      <div className="view-detail">
        <span className="view-label">Status:</span>
        <span className={`view-value status-${task.status.toLowerCase()}`}>{task.status}</span>
      </div>
      <hr />
      <div className="view-buttons">
        <button className="btn btn-back" onClick={() => navigate('/list')}>Back</button>
      </div>
    </div>
  );
};

export default ViewTask;
