import { useEffect, useState, useCallback } from "react";
import "../css/Timeline.css";
import { useStore } from "./Logic";

function Timeline() {
  const {
    matrixStates,
    currentStateIndex,
    handleUndo,
    handleCopyMatrix,
    handlePasteMatrix,
    navigateForward,
    navigateBack,
    addBlankFrame,
    addState,
    removeCurrentFrame,
    handlePlayPause,
    handleSelectorChange,
  } = useStore();
  const [selectorPosition, setSelectorPosition] = useState(currentStateIndex);
  const [trackStyle, setTrackStyle] = useState({ background: "#50555C" });

  const handleKeyPress = useCallback((event) => {
    if (event.key === "a") navigateBack();
    if (event.key === "d") navigateForward();
    if (event.key === "b") addBlankFrame();
    if (event.key === "n") addState();
    if (event.key === "r") removeCurrentFrame();
    if (event.key === " ") {
      event.preventDefault();
      handlePlayPause();
    }
    if (event.ctrlKey && event.key === "z") {
      handleUndo();
    }
  }, [navigateBack, navigateForward, addBlankFrame, addState, removeCurrentFrame, handlePlayPause, handleUndo]);

  useEffect(() => {
    // attach the event listener
    document.addEventListener("keydown", handleKeyPress);
    // remove the event listener
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  useEffect(() => {
    setSelectorPosition(currentStateIndex);
    setTrackStyle({
      background:
        `linear-gradient(to right,rgb(182, 182, 182) ` +
        (currentStateIndex * 100) / (matrixStates.length - 1) +
        `%, #201E1F 0%`,
    });
  }, [currentStateIndex, matrixStates.length]);

  function onSelectorChange(event) {
    setSelectorPosition(parseInt(event.target.value));
    handleSelectorChange(parseInt(event.target.value)); // update the current frame index
  }

  return (
    <div className="timeline">
      <p className="frame-counter">Current frame: {currentStateIndex}</p>
      <button onClick={navigateBack} disabled={selectorPosition === 0}>
        {"<"}
      </button>
      <input
        className="slider-bar"
        type="range"
        style={trackStyle}
        min={0}
        max={matrixStates.length - 1}
        value={selectorPosition}
        onChange={onSelectorChange}
      />
      <button
        onClick={navigateForward}
        disabled={selectorPosition === matrixStates.length - 1}
      >
        {">"}
      </button>
      <button onClick={addState}>+</button>
      <button onClick={addBlankFrame}>Add Blank</button>
      <button onClick={removeCurrentFrame}>Delete</button>
      <button onClick={handleCopyMatrix}>Copy</button>
      <button onClick={handlePasteMatrix}>Paste</button>
    </div>
  );
}

export default Timeline;
