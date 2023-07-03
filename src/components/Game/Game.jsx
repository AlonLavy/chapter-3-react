import { useState, createContext } from "react";
import { Board } from "../Board/Board";
import { ToggleSwitch } from "../ToggleSwitch/ToggleSwitch";

export const GameContext = createContext();
export const ToggleContext = createContext();

export const Game = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [changedIndex] = useState({});

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

  return (
    <>
      <GameContext.Provider
        value={{
          history,
          currentSquares,
          currentMove,
          changedIndex,
          jumpTo,
        }}
      >
        <div className="game">
          <div className="game-board">
            <Board
              xIsNext={xIsNext}
              squares={currentSquares}
              onPlay={handlePlay}
            />
          </div>
          <div className="game-info">
            <ToggleSwitch />
          </div>
        </div>
      </GameContext.Provider>
    </>
  );
};
