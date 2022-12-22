import { useState, useCallback, useEffect } from "react";
import "../css/SelectMode.css";

function SelectMode(props) {
  const [mode, setMode] = useState("single"); // set the default mode to "single"
  
  const changeWithKey = useCallback(
    (mode) => {
      setMode(mode);
      props.onSelect(mode);
    },
    [setMode, props]
  );
  const handleKeyPress = useCallback((event) => {
    if (event.key === "c") changeWithKey("column");
    if (event.key === "v") changeWithKey("row");
    if (event.key === "s") changeWithKey("single");
    if (event.key === "x") changeWithKey("diagonalS");
    if (event.key === "z") changeWithKey("diagonalP");
  }, [changeWithKey]);
  useEffect(() => {
    // attach the event listener
    document.addEventListener("keydown", handleKeyPress);
    // remove the event listener
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

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
        Diagonala secundara
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
        Diagonal principala
      </label>
    </div>
  );
}
export default SelectMode;