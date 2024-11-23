import React, { useMemo } from 'react';
import { useBoard } from '../../context/BoardContext';
import { Column } from '../Column/Column';
import { PRIORITY_MAP } from '../../constants/priority';
import './Board.css';

export const Board = () => {
  const { tickets, users, groupBy, sortBy } = useBoard();

  const groupedTickets = useMemo(() => {
    const sorted = [...tickets].sort((a, b) => {
      if (sortBy === 'priority') {
        return b.priority - a.priority;
      }
      return a.title.localeCompare(b.title);
    });

    if (groupBy === 'status') {
      const groups = {
        'Todo': [],
        'In Progress': [],
        'Backlog': [],
        'Done': [],
        'Cancelled': [],
      };

      sorted.forEach(ticket => {
        if (groups.hasOwnProperty(ticket.status)) {
          groups[ticket.status].push(ticket);
        } else {
          groups['Backlog'].push(ticket);
        }
      });

      return groups;
    }

    if (groupBy === 'user') {
      const groups = {};
      users.forEach(user => {
        groups[user.id] = sorted.filter(ticket => ticket.userId === user.id);
      });
      return groups;
    }

    if (groupBy === 'priority') {
      const groups = {};
      Object.keys(PRIORITY_MAP).forEach(priority => {
        groups[priority] = sorted.filter(
          ticket => ticket.priority === parseInt(priority)
        );
      });
      return groups;
    }

    return {};
  }, [tickets, users, groupBy, sortBy]);

  const renderColumns = () => {
    return Object.entries(groupedTickets).map(([group, tickets]) => (
      <Column
        key={group}
        title={group}
        tickets={tickets}
        users={users}
        icon={null} // Add an icon if needed
        groupBy={groupBy} // Passed the grouping method to Column
      />
    ));
  };

  return (
    <div className="board">
      {renderColumns()}
    </div>
  );
};
