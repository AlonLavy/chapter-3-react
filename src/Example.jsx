import { useState } from "react";

export const Example = () => {
  const [value, setValue] = useState(0);

  return (
    <div>
      <p>Value is: {value}</p>
      <button
        onClick={() => {
          setValue(value + 1);
          console.log(value);
        }}
      >
        Incement
      </button>
    </div>
  );
};
