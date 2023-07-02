import { Square } from "../Square/Square";

export const Board = ({ xIsNext, squares, onPlay }) => {
  const handleClick = (i) => {
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
  };

  const winner = calculateWinner(squares);
  const status = winner
    ? "Winner: " + winner.who
    : "Next player: " + (xIsNext ? "X" : "O");

  const rows = [];
  for (let i = 0; i < 3; i++) {
    rows.push([]);
    for (let j = 0; j < 3; j++) {
      const squareIndex = i * 3 + j;
      const classesForSquare =
        winner && winner.how.includes(squareIndex) ? "square winner" : "square";
      rows[i].push(
        <Square
          value={squares[squareIndex]}
          onSquareClick={() => handleClick(squareIndex)}
          className={classesForSquare}
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
};

const calculateWinner = (squares) => {
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
      return { who: squares[a], how: lines[i] };
    }
  }
  return null;
};
