import "../css/Square.css";

function Square(props) {

  function handleMouseEnter(){
    if (props.isDragging) {  
      props.onDrag(props.indexX, props.indexY);
    }
  }
  function preventDrag(event){
    props.onDrag(props.indexX, props.indexY);
    event.preventDefault ? event.preventDefault() : event.returnValue = false
  }
  return (
    <div
      className="square"
      style={{ backgroundColor: props.color }}
      onClick={() => {
        props.onClick(props.indexX, props.indexY);
      }}
      onMouseEnter={handleMouseEnter}
      onMouseDown={preventDrag}
    ></div>
  );
}

export default Square;
