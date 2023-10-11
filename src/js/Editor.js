import { useState, useEffect } from "react";
import "../css/Editor.css";
import Square from "./Square";
import SelectColor from "./SelectColor";
import PhotoshopPicker  from "react-color"; // import the color picker component
import SelectMode from "./SelectMode";
import Timeline from "./Timeline";
import SaveFile from "./SaveFile";

function Editor() {
  const [matrix, setMatrix] = useState(
    new Array(19).fill(null).map(() => new Array(19).fill("#000000"))
  );
  const [saved, setSaved] = useState(
    new Array(19).fill(null).map(() => new Array(19).fill("#000000"))
  );
  const [matrixStates, setMatrixStates] = useState([
    { matrix: JSON.parse(JSON.stringify(matrix)) },
  ]);

  const [currentStateIndex, setCurrentStateIndex] = useState(0);

  const [selectedColor, setSelectedColor] = useState("#ff0000"); // add a state variable to track the selected color
  const [isDragging, setIsDragging] = useState(false);
  const [mode, setMode] = useState("single"); // add a state variable to track the selected mode
  const [isPlaying, setIsPlaying] = useState(false);
  const [frameInterval, setFrameInterval] = useState(100);
  function clicked(x, y) {
    const newMatrix = matrix.slice();

    if (mode === "single") {
      // update only the square at position (x, y)
      newMatrix[x][y] = selectedColor;
    } else if (mode === "column") {
      // update all of the squares in the same column as (x, y)
      for (let i = 0; i < matrix.length; i++) {
        newMatrix[i][y] = selectedColor;
      }
    } else if (mode === "row") {
      // update all of the squares in the same row as (x, y)
      for (let j = 0; j < matrix[0].length; j++) {
        newMatrix[x][j] = selectedColor;
      }
    } else if (mode === "diagonalS") {
      // update all of the squares in the same diagonal as (x, y)
      let i = x;
      let j = y;
      while (i > 0 && j > 0) {
        i--;
        j--;
      }
      while (i < matrix.length && j < matrix[0].length) {
        newMatrix[i][j] = selectedColor;
        i++;
        j++;
      }
    } else if (mode === "diagonalP") {
      // update all of the squares in the same diagonal as (x, y)
      let i = x;
      let j = y;
      while (i > 0 && j < matrix[0].length - 1) {
        i--;
        j++;
      }
      while (i < matrix.length && j >= 0) {
        newMatrix[i][j] = selectedColor;
        i++;
        j--;
      }
    }

    setMatrix(newMatrix);
    saveMatrix();
  }
  function saveMatrix() {
    const newMatrixStates = matrixStates.slice(); // make a copy of the matrixStates array
    const newMatrix = JSON.parse(JSON.stringify(matrix)); // make a deep copy of the matrix object
    newMatrixStates[currentStateIndex] = { matrix: newMatrix }; // update the matrix state at the current index
    setMatrixStates(newMatrixStates); // update the matrixStates state variable
  }
  useEffect(() => {
    if (isPlaying) {
      // if isPlaying is true, start a 100ms interval
      const interval = setInterval(() => {
        // increase the current frame index by 1
        setCurrentStateIndex((currentStateIndex + 1) % matrixStates.length);
      }, frameInterval);
      return () => clearInterval(interval); // clear the interval when the component unmounts
    }
  }, [isPlaying, currentStateIndex, matrixStates.length, frameInterval]);

  function drag(x, y) {
    // update the color of the square at position (x, y) in the matrix
    const newMatrix = matrix.slice(); // make a copy of the matrix
    newMatrix[x][y] = selectedColor; // update the color at position (x, y)
    setMatrix(newMatrix); // update the matrix state variable
    saveMatrix();
  }
  function handleMouseDown(event) {
    setIsDragging(true);
    event.preventDefault ? event.preventDefault() : (event.returnValue = false);
  }

  function handleMouseUp() {
    setIsDragging(false);
  }
  function handleModeChange(newMode) {
    setMode(newMode);
  }

  function handlePlayPause() {
    setIsPlaying(!isPlaying); // toggle the isPlaying state variable
  }
  function navigateBack() {
    if (currentStateIndex > 0) setCurrentStateIndex(currentStateIndex - 1);
  }

  useEffect(() => {
    if (
      currentStateIndex >= 0 &&
      currentStateIndex <= matrixStates.length - 1
    ) {
      setMatrix(matrixStates[currentStateIndex].matrix);
    }
  }, [matrixStates, currentStateIndex]);

  function navigateForward() {
    if (currentStateIndex < matrixStates.length - 1)
      setCurrentStateIndex(currentStateIndex + 1);
  }

  function addState() {
    const newMatrixStates = matrixStates.slice();
    newMatrixStates.splice(currentStateIndex + 1, 0, {
      matrix: JSON.parse(JSON.stringify(matrix)),
    });
    setMatrixStates(newMatrixStates);
    setCurrentStateIndex(currentStateIndex + 1);
  }

  function removeCurrentFrame() {
    const newMatrixStates = matrixStates.slice();
    newMatrixStates.splice(currentStateIndex, 1);
    setMatrixStates(newMatrixStates);
    setCurrentStateIndex((currentStateIndex) % matrixStates.length);
  }
  
  function addBlankFrame() {
    const newMatrixStates = matrixStates.slice(); // make a copy of the matrixStates array
    newMatrixStates.splice(currentStateIndex + 1, 0, {
      matrix: new Array(19).fill(null).map(() => new Array(19).fill("#000000")),
    }); // insert a new blank frame after the current index
    setMatrixStates(newMatrixStates);
    setCurrentStateIndex(currentStateIndex + 1);
  }
  function handleCopyMatrix() {
    const newMatrix = JSON.parse(JSON.stringify(matrix));
    setSaved(newMatrix);
  }
  function handlePasteMatrix() {
    const newSaved = JSON.parse(JSON.stringify(saved));
    const newMatrixStates = matrixStates.slice(); // make a copy of the matrixStates array
    newMatrixStates[currentStateIndex] = { matrix: newSaved }; // update the matrix state at the current index
    setMatrixStates(newMatrixStates); // update the matrixStates state variable
    setMatrix(newSaved);
  }
  
  function handleIntervalChange(event){
    setFrameInterval(parseInt(event.target.value));
  }
  return (
    <div className="TimelineContainer">
      <div className="EditorLayout">
        <div className="ToolColumn">
          <PhotoshopPicker // add a color picker component
            color={selectedColor}
            onChange={(color) => setSelectedColor(color.hex)}
          />
          <input type="color" />
          <SelectColor onSelect={setSelectedColor} />
          <SelectMode onSelect={handleModeChange} />
          <SaveFile
            matrixStates={matrixStates}
            setMatrixStates={setMatrixStates}
          />
          <div className="PlayControls">
          <p>Frame interval</p>
          <input type="number" placeholder="Set frame interval in ms" defaultValue={frameInterval} onChange={handleIntervalChange}></input>
          <button className="PlayButton" onClick={handlePlayPause}>
            {isPlaying ? "Pause" : "Play"}
          </button>
          </div>
        </div>
        <div
          className="Editor"
          onMouseDown={handleMouseDown} // add the mouseDown event handler
          onMouseUp={handleMouseUp} // add the mouseUp event handler
        >
          {matrix.map((line, x) => {
            return line.map((element, y) => {
              return (
                <Square
                  key={x + ":" + y}
                  color={element} // pass the square's color as a prop
                  indexX={x}
                  indexY={y}
                  currentIndex={currentStateIndex}
                  onClick={clicked}
                  onDrag={drag} // pass the drag event handler as a prop
                  isDragging={isDragging}
                ></Square>
              );
            });
          })}
        </div>
      </div>
      <Timeline
        className="Timeline"
        handleDeleteFrame={removeCurrentFrame}
        handlePlayPause={handlePlayPause}
        matrixStates={matrixStates}
        currentStateIndex={currentStateIndex}
        onNavigateBack={navigateBack}
        onNavigateForward={navigateForward}
        onAddBlankState={addBlankFrame}
        onAddState={addState}
        setCurrentStateIndex={setCurrentStateIndex}
        onCopyMatrix={handleCopyMatrix}
        onPasteMatrix={handlePasteMatrix}
      />
    </div>
  );
}

export default Editor;
