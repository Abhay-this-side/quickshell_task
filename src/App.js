import React from 'react';
import { BoardProvider } from './context/BoardContext';
import { DisplayButton } from './components/DisplayButton/DisplayButton';
import { Board } from './components/Board/Board';

function App() {
  return (
    <BoardProvider>
      <DisplayButton />
      <Board />
    </BoardProvider>
  );
}

export default App;