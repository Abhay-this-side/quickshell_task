import React from 'react';
import { PRIORITY_MAP } from '../../constants/priority';
import './Card.css';

export const Card = ({ ticket, user }) => {
  return (
    <div className="card">
      <div className="card-header">
        <span className="ticket-id">{ticket.id}</span>
        <div className="user-avatar">
          {user?.name?.[0] || '?'}
          <span
            className="status-dot"
            style={{
              backgroundColor: user?.available ? '#00ff00' : '#808080',
            }}
          />
        </div>
      </div>

      <div className="card-title">
        <span>{ticket.title}</span>
      </div>

      <div className="card-tags">
        {/* Exclamation Section */}
        <div className="tag exclamation-tag">
          <div className="exclamation-box">
            <span className="exclamation-icon">!</span>
          </div>
        </div>

        {/* Feature Section */}
        <div className="tag feature-tag">
          <span className="feature-text">{ticket.tag}</span>
        </div>
      </div>
    </div>
  );
};
