import { useState } from "react";
import ReactSwitch from "react-switch";

function Square({ value, onSquareClick, className }) {
  return (
    <button className="square" onClick={onSquareClick} class={className}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  const status = winner
    ? "Winner: " + winner[0]
    : "Next player: " + (xIsNext ? "X" : "O");

  const rows = [];
  for (let i = 0; i < 3; i++) {
    rows.push([]);
    for (let j = 0; j < 3; j++) {
      const index = i * 3 + j;
      const classNameGiven =
        winner && winner[1].includes(index) ? "square winner" : "square";
      rows[i].push(
        <Square
          value={squares[index]}
          onSquareClick={() => handleClick(index)}
          className={classNameGiven}
        ></Square>
      );
    }
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">{rows[0]}</div>
      <div className="board-row">{rows[1]}</div>
      <div className="board-row">{rows[2]}</div>
    </>
  );
}

export default function Game() {
  const [toggleStatus, changeToggleStatus] = useState(true);
  const [description, setDescription] = useState("ascending");
  const ToggleSwitch = () => {
    const handleChange = () => {
      changeToggleStatus(!toggleStatus);
      if (toggleStatus) {
        setDescription("decending");
      } else {
        setDescription("ascending");
      }
    };

    return (
      <div className="toggle">
        <p>{description}</p>
        <ReactSwitch checked={toggleStatus} onChange={handleChange} />
      </div>
    );
  };

  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  if (!toggleStatus) {
    history.reverse;
  }
  const moves = history.map((squares, move) => {
    let description;
    if (!toggleStatus) {
      move = history.length - 1 - move;
    }
    if (move == currentMove) {
      description = `You are at move ${move}`;
    } else if (move > 0) {
      description = `Go to move number ${move}`;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ToggleSwitch />
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [squares[a], lines[i]];
    }
  }
  return null;
}
