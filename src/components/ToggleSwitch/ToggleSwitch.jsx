import ReactSwitch from "react-switch";
import { useState } from "react";
import { ListButton } from "../ListButton/ListButton";

export const ToggleSwitch = () => {
  const [toggleStatus, changeToggleStatus] = useState(true);
  return (
    <div className="toggle">
      <p>{toggleStatus ? "decending" : "ascending"}</p>
      <ReactSwitch
        checked={toggleStatus}
        onChange={() => changeToggleStatus(!toggleStatus)}
      />
      <ol reversed={!toggleStatus}>
        <ListButton toggleStatus={toggleStatus} />
      </ol>
    </div>
  );
};
