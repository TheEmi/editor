import { useState } from "react";
import "../css/SelectMode.css";

function SelectMode(props) {
  const [mode, setMode] = useState("single"); // set the default mode to "single"

  function handleModeChange(event) {
    setMode(event.target.value);
    props.onSelect(event.target.value); // call the onSelect prop with the selected mode
  }

  return (
    <div className="SelectMode">
      <label>
        <input
          type="radio"
          name="mode"
          value="single"
          checked={mode === "single"}
          onChange={handleModeChange}
        />
        Single
      </label>
      <br />
      <label>
        <input
          type="radio"
          name="mode"
          value="column"
          checked={mode === "column"}
          onChange={handleModeChange}
        />
        Column
      </label>
      <br />
      <label>
        <input
          type="radio"
          name="mode"
          value="row"
          checked={mode === "row"}
          onChange={handleModeChange}
        />
        Row
      </label>
      <br />
      <label>
        <input
          type="radio"
          name="mode"
          value="diagonalP"
          checked={mode === "diagonalP"}
          onChange={handleModeChange}
        />
        Diagonala Principala
      </label>
      <br />
      <label>
        <input
          type="radio"
          name="mode"
          value="diagonalS"
          checked={mode === "diagonalS"}
          onChange={handleModeChange}
        />
        Diagonal secundara
      </label>
    </div>
  );
}
export default SelectMode;