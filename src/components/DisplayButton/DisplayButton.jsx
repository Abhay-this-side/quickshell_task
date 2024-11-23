import React, { useState } from 'react';
import { useBoard } from '../../context/BoardContext';
import './DisplayButton.css';

export const DisplayButton = () => {
  const { groupBy, setGroupBy, sortBy, setSortBy } = useBoard();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="display-button-container" >
      <button className="display-button" onClick={() => setIsOpen(!isOpen)}>
        Display ▼
      </button>
      
      {isOpen && (
        <div className="dropdown-menu">
          <div className="dropdown-item">
            <span>Grouping</span>
            <select 
              value={groupBy} 
              onChange={(e) => setGroupBy(e.target.value)}
            >
              <option value="status">Status</option>
              <option value="user">User</option>
              <option value="priority">Priority</option>
            </select>
          </div>
          
          <div className="dropdown-item">
            <span>Ordering</span>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};
