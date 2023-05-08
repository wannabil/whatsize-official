import React, { useState } from 'react';

function Board(props) {
  return (
    <div className="board">
      {props.cells.map((cell, index) => (
        <div key={index} className="cell" onClick={() => props.handleMove(index)}>
          {cell}
        </div>
      ))}
    </div>
  );
}

function Game() {
  const [cells, setCells] = useState(Array(9).fill(null));
  const [player, setPlayer] = useState('X');

  function handleMove(index) {
    if (cells[index] === null) {
      const newCells = [...cells];
      newCells[index] = player;
      setCells(newCells);
      setPlayer(player === 'X' ? 'O' : 'X');
    }
  }

  function checkForWinner() {
    const possibleWinningMoves = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < possibleWinningMoves.length; i++) {
      const [a, b, c] = possibleWinningMoves[i];
      if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
        return cells[a];
      }
    }

    return null;
  }

  const winner = checkForWinner();

  return (
    <div className="game">
      <Board cells={cells} handleMove={handleMove} />
      {winner ? <div className="winner">Winner: {winner}</div> : null}
      {!winner && !cells.includes(null) ? <div className="draw">Draw!</div> : null}
      <button className="reset" onClick={() => setCells(Array(9).fill(null))}>
        Reset
      </button>
    </div>
  );
}

export default Game;
