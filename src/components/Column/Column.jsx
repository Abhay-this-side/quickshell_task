import React, { useState, useMemo } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { AiOutlinePlus } from 'react-icons/ai';
import './Column.css';
import { Card } from '../Card/Card';
import { PRIORITY_MAP } from '../../constants/priority';

export const Column = ({ title, tickets, users, icon, groupBy }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showAddTicket, setShowAddTicket] = useState(false);

  const handleAddTicket = () => {
    setShowAddTicket(true);
    // Implemented actual add ticket functionality here
  };

  const handleHideAll = () => {
    console.log('Hide all tickets in', title);
    setShowDropdown(false);
  };

  const handleClearSection = () => {
    console.log('Clear section', title);
    setShowDropdown(false);
  };

  // Determined the most common priority in this column
  const getMostCommonPriority = (tickets) => {
    const priorityCount = {
      0: 0,
      1: 0,
      2: 0,
      3: 0,
      4: 0,
    };

    tickets.forEach(ticket => {
      const priority = ticket.priority ?? 0; // Default to 0 (No priority) if undefined
      priorityCount[priority]++;
    });

    // Finded the highest count priority
    const mostCommonPriority = Object.keys(priorityCount).reduce((a, b) => 
      priorityCount[a] > priorityCount[b] ? a : b
    );

    return mostCommonPriority;
  };

  const mostCommonPriority = useMemo(() => getMostCommonPriority(tickets), [tickets]);

  const priorityLabel = PRIORITY_MAP[mostCommonPriority]?.label || "No priority";
  const priorityIcon = PRIORITY_MAP[mostCommonPriority]?.icon || "⚫"; // Fallback icon

  return (
    <div className="column">
      <div className="column-header">
        <div className="header-left">
          {icon && <span className="column-icon">{icon}</span>}
  
          {groupBy === 'priority' ? (
            <span className="priority-label">
              {priorityIcon} {priorityLabel}
            </span>
          ) : (
            <h3>{title}</h3>  // Only render the title if not grouping by priority
          )}
          
          <span className="ticket-count">{tickets.length}</span>
        </div>

        {title !== 'Cancelled' && (
          <div className="header-actions">
            <button 
              className="icon-button"
              onClick={handleAddTicket}
              title="Add new ticket"
            >
              <AiOutlinePlus />
            </button>

            <div className="dropdown-container">
              <button 
                className="icon-button"
                onClick={() => setShowDropdown(!showDropdown)}
                title="More options"
              >
                <BsThreeDots />
              </button>

              {showDropdown && (
                <div className="column-dropdown">
                  <button onClick={handleHideAll}>Hide All Tickets</button>
                  <button onClick={handleClearSection}>Clear This Section</button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {showAddTicket && title !== 'Cancelled' && (
        <div className="add-ticket-form">
          <input 
            type="text" 
            placeholder="Enter ticket title..."
            className="ticket-input"
          />
          <div className="form-actions">
            <button 
              className="btn-add"
              onClick={() => setShowAddTicket(false)}
            >
              Add
            </button>
            <button 
              className="btn-cancel"
              onClick={() => setShowAddTicket(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="column-content">
        {tickets.map(ticket => (
          <Card 
            key={ticket.id} 
            ticket={ticket} 
            user={users.find(user => user.id === ticket.userId)}
          />
        ))}
      </div>
    </div>
  );
};
