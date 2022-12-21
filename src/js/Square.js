import "../css/Square.css";
import { useState, useEffect} from "react";

function Square(props) {
  const [color, setColor] = useState(props.color);
  const [containsMouse, setContainsMouse] = useState(false);

  useEffect(() => {
    setColor(props.color);
  }, [props.color, props.currentIndex]);

  useEffect(() => {
      if (props.isDragging && containsMouse) {  
        
        props.onDrag(props.indexX, props.indexY);
      }
  }, [props, containsMouse]);  

  function handleMouseEnter(){
    setContainsMouse(true);
  }
  function handleMouseLeave(){
    setContainsMouse(false);
  }
  function preventDrag(event){
    event.preventDefault ? event.preventDefault() : event.returnValue = false
  }
  return (
    <div
      className="Square"
      style={{ backgroundColor: color }}
      onClick={() => {
        props.onClick(props.indexX, props.indexY);
      }}
      onMouseEnter={handleMouseEnter}
      onMouseDown={preventDrag}
      onMouseLeave={handleMouseLeave}
    ></div>
  );
}

export default Square;
