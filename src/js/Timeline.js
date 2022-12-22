import { useEffect, useState, useCallback } from "react";
import "../css/Timeline.css";

function Timeline({
  handleDeleteFrame,
  handlePlayPause,
  matrixStates,
  currentStateIndex,
  onNavigateBack,
  onNavigateForward,
  onAddBlankState,
  onAddState,
  setCurrentStateIndex,
}) {
  const [selectorPosition, setSelectorPosition] = useState(currentStateIndex);
  const [trackStyle, setTrackStyle] = useState({ background: "#50555C" });

  const handleKeyPress = useCallback((event) => {
    if (event.key === "a") onNavigateBack();
    if (event.key === "d") onNavigateForward();
    if (event.key === "b") onAddBlankState();
    if (event.key === "n") onAddState();
    if (event.key === "r") handleDeleteFrame();
    if (event.key === " ") handlePlayPause()
  }, [handleDeleteFrame, onNavigateBack,onNavigateForward,handlePlayPause,onAddState,onAddBlankState]);

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
        `linear-gradient(to right, #50B2C0 ` +
        (currentStateIndex * 100) / (matrixStates.length - 1) +
        `%, #201E1F 0%`,
    });
  }, [currentStateIndex, matrixStates.length]);

  function handleSelectorChange(event) {
    setSelectorPosition(parseInt(event.target.value));
    setCurrentStateIndex(parseInt(event.target.value)); // update the current frame index
  }
  
  return (
    <div className="timeline">
      <p className="frameCounter">Current frame: {currentStateIndex}</p>
      <button
        onClick={onNavigateBack}
        disabled={selectorPosition === 0}
      >{"<"}</button>
      <input
        className="sliderBar"
        type="range"
        style={trackStyle}
        min={0}
        max={matrixStates.length - 1}
        value={selectorPosition}
        onChange={handleSelectorChange}
      />
      <button
        onClick={onNavigateForward}
        disabled={selectorPosition === matrixStates.length - 1}
      >{">"}</button>
      <button onClick={onAddState}>+</button>
      <button onClick={onAddBlankState}>Add Blank</button>
      <button onClick={handleDeleteFrame}>Delete</button>
    </div>
  );
}

export default Timeline;
