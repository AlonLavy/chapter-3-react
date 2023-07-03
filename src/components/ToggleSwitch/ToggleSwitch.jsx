import ReactSwitch from "react-switch";
import { ToggleContext } from "../Game/Game";
import { useContext } from "react";

export const ToggleSwitch = () => {
  const { toggleStatus, changeToggleStatus } = useContext(ToggleContext);
  return (
    <div className="toggle">
      <p>{toggleStatus ? "decending" : "ascending"}</p>
      <ReactSwitch
        checked={toggleStatus}
        onChange={() => changeToggleStatus(!toggleStatus)}
      />
    </div>
  );
};
