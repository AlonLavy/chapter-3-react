import React, { useContext } from "react";
import { GameContext } from "../Game/Game";

export const ListButton = () => {
  const {
    currentSquares,
    currentMove,
    history,
    changedIndex,
    toggleStatus,
    jumpTo,
  } = useContext(GameContext);

  const description = (move) => {
    if (move === currentMove) {
      return `You are at move ${move + 1}`;
    } else if (move >= 0 && (changedIndex[move] || changedIndex[move] === 0)) {
      return move % 2 === 0
        ? `X placed at [${Math.floor(changedIndex[move] / 3) + 1}, ${
            (changedIndex[move] % 3) + 1
          }]`
        : `O placed at [${Math.floor(changedIndex[move] / 3) + 1}, ${
            (changedIndex[move] % 3) + 1
          }]`;
    } else if (!changedIndex[move]) {
      return `It's ${!(move % 2) ? "X" : "O"}'s turn to play move ${move + 1}`;
    }
    return "";
  };

  return history.map((_, move) => {
    const changes = [];
    for (let i = 0; i < currentSquares.length; i++) {
      if (currentSquares[i] === null) {
        changes.push(false);
      } else if (currentMove > 0) {
        changes.push(currentSquares[i] !== history[currentMove - 1][i]); //Oneliner
      } else if (currentSquares[i] !== null) {
        changes.push(true);
      }
    }

    if (move === currentMove - 1) {
      changedIndex[move] = changes.indexOf(true);
    }
    if (!toggleStatus) {
      move = history.length - 1 - move;
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description(move)}</button>
      </li>
    );
  });
};
