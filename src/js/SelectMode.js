import { useState, useCallback, useEffect } from "react";
import "../css/SelectMode.css";
import { useStore } from "./Logic";

function SelectMode(props) {
  const {mode, setMode} = useStore();
  
  const changeWithKey = useCallback(
    (mode) => {
      setMode(mode);
    },
    [setMode]
  );
  const handleKeyPress = useCallback((event) => {
    if (event.key === "c") changeWithKey("column");
    if (event.key === "v") changeWithKey("row");
    if (event.key === "s") changeWithKey("single");
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