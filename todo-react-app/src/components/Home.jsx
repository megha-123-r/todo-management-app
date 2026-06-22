import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/home.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-card">
        <h1 className="home-title">TO-DO MANAGEMENT SYSTEM</h1>
        <hr className="home-divider" />
        <p className="home-welcome">Welcome !</p>
        <p className="home-subtitle">Manage your daily tasks efficiently.</p>
        <hr className="home-divider" />
        <div className="home-buttons">
          <button className="btn btn-view" onClick={() => navigate('/list')}>
            View Tasks
          </button>
          <button className="btn btn-add" onClick={() => navigate('/add')}>
            Add New Task
          </button>
          <button className="btn btn-search" onClick={() => navigate('/search')}>
            Search Task
          </button>
          <button className="btn btn-filter" onClick={() => navigate('/filter')}>
            Filter Tasks
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
