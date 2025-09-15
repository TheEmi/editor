import "../css/SelectColor.css";
import { useStore } from "./Logic";

function SelectColor() {
  const colors = ["#FF0000", "#0000FF", "#00FF00", "#000000", "#ffffff"];//colors to pick from
  const selectedColor = useStore(state=>state.selectedColor);
  const setSelectedColor = useStore(state=>state.setSelectedColor);
  return (
    <div className="toolbar">
      {colors.map((color) => (
        <button
          key={color}
          style={{ backgroundColor: color }}
          onClick={(e)=>setSelectedColor(color)}
          className={String(selectedColor).toUpperCase() === color ? "selected" : ""}
        ></button>
      ))}
    </div>
  );
}

export default SelectColor;
