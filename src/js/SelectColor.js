import { useState } from "react";
import "../css/SelectColor.css";


function SelectColor({ onSelect }) {
  const colors = ["#FF0000", "#0000FF", "#00FF00", "#000000", "#ffffff"];//colors to pick from
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  function handleClick(color) {
    setSelectedColor(color);
    onSelect(color);
  }

  return (
    <div className="toolbar">
      {colors.map((color) => (
        <button
          key={color}
          style={{ backgroundColor: color }}
          onClick={() => handleClick(color)}
          className={selectedColor === color ? "selected" : ""}
        ></button>
      ))}
    </div>
  );
}

export default SelectColor;
