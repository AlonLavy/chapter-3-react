export const Square = ({ value, onSquareClick, className }) => {
  return (
    <button className={className} onClick={onSquareClick}>
      {value}
    </button>
  );
};
