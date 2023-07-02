import ReactSwitch from "react-switch";

export const ToggleSwitch = ({
  description,
  setDescription,
  toggleStatus,
  changeToggleStatus,
}) => {
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
