import { useEffect } from "react";
import "../css/Editor.css";
import Square from "./Square";
import SelectColor from "./SelectColor";
import PhotoshopPicker from "react-color"; // import the color picker component
import SelectMode from "./SelectMode";
import Timeline from "./Timeline";
import SaveFile from "./SaveFile";
import Playback from "./Playback";
import { useStore } from "./Logic";

function Editor() {
  const {
    matrix,
    setFrameInterval,
    handleMouseUp,
    handleMouseDown,
    selectedColor,
    setSelectedColor,
    matrixStates,
    loadMatrixStates,
    frameInterval,
    handlePlayPause,
    isPlaying,
    isDragging,
    clicked,
    drag,
    playFrame,
  } = useStore();


  useEffect(() => {
    if (isPlaying) {
      // if isPlaying is true, start a 100ms interval
      const interval = setInterval(() => {
        // increase the current frame index by 1
        playFrame();
      }, frameInterval);
      return () => clearInterval(interval); // clear the interval when the component unmounts
    }
  }, [isPlaying, frameInterval, playFrame]);

  function handleIntervalChange(event) {
    setFrameInterval(parseInt(event.target.value));
  }

  return (
    <div className="timeline-container">
      <div className="editor-layout">
        <div className="tool-column">
          <div className="colors">
            <PhotoshopPicker // add a color picker component
              className="color-picker"
              color={selectedColor}
              onChange={(color) => setSelectedColor(color.hex)}
            />
            <SelectColor/>
          </div>
          <SelectMode />
          <div className="playback-save">
            <Playback
              frameInterval={frameInterval}
              handleIntervalChange={handleIntervalChange}
              handlePlayPause={handlePlayPause}
              isPlaying={isPlaying}
            />
            <SaveFile
              matrixStates={matrixStates}
              loadMatrixStates={loadMatrixStates}
            />
          </div>
        </div>
        <div
          className="editor"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        >
          {matrix.map((line, x) => {
            return line.map((element, y) => {
              return (
                <Square
                  key={x + ":" + y}
                  color={element} // pass the square's color as a prop
                  indexX={x}
                  indexY={y}
                  onClick={clicked}
                  onDrag={drag} // pass the drag event handler as a prop
                  isDragging={isDragging}
                ></Square>
              );
            });
          })}
        </div>
      </div>
      <Timeline className="time-line" />
    </div>
  );
}

export default Editor;
