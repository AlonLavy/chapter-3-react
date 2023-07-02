import { useState } from "react";
import ReactSwitch from "react-switch";
import { Board } from "../Board/Board";

export const Game = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [changedIndex] = useState({});
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

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  const handlePlay = (nextSquares) => {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  };

  const jumpTo = (nextMove) => {
    setCurrentMove(nextMove);
  };

  if (!toggleStatus) {
    history.reverse;
  }
  const moves = history.map((squares, move) => {
    const changes = [];
    for (let i = 0; i < currentSquares.length; i++) {
      if (currentSquares[i] === null) {
        changes.push(false);
      } else if (currentMove > 0) {
        changes.push(currentSquares[i] !== history[currentMove - 1][i]);
      } else {
        if (currentSquares[i] !== null) {
          changes.push(true);
        }
      }
    }
    if (move == currentMove - 1) {
      changedIndex[move] = changes.indexOf(true);
    }
    if (!toggleStatus) {
      move = history.length - 1 - move;
    }
    let description = (move) => {
      if (move == currentMove) {
        description = `You are at move ${move + 1}`;
      } else if (
        move >= 0 &&
        (changedIndex[move] || changedIndex[move] === 0)
      ) {
        description =
          move % 2 == 0
            ? `X placed at [${Math.floor(changedIndex[move] / 3) + 1}, ${
                (changedIndex[move] % 3) + 1
              }]`
            : `O placed at [${Math.floor(changedIndex[move] / 3) + 1}, ${
                (changedIndex[move] % 3) + 1
              }]`;
      } else if (!changedIndex[move]) {
        description = `It's ${move % 2 ? "X" : "O"}'s turn to play move ${
          move + 1
        }`;
      }
      return description;
    };
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description(move)}</button>
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
        <ol reversed={!toggleStatus}>{moves}</ol>
      </div>
    </div>
  );
};
