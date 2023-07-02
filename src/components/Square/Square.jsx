export const Square = ({ value, onSquareClick, className }) => {
  return (
    <button className="square" onClick={onSquareClick} class={className}>
      {value}
    </button>
  );
};
