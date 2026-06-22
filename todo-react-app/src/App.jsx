import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './components/Home';
import ListTask from './components/ListTask';
import AddTask from './components/AddTask';
import UpdateTask from './components/UpdateTask';
import ViewTask from './components/ViewTask';
import SearchTask from './components/SearchTask';
import FilterTask from './components/FilterTask';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/list" element={<ListTask />} />
          <Route path="/add" element={<AddTask />} />
          <Route path="/update/:id" element={<UpdateTask />} />
          <Route path="/view/:id" element={<ViewTask />} />
          <Route path="/search" element={<SearchTask />} />
          <Route path="/filter" element={<FilterTask />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
