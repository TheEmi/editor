import "../css/Playback.css";

function Playback({frameInterval, handleIntervalChange, handlePlayPause, isPlaying}) {
  return (
    <div className="play-controls">
      <p>Frame interval</p>
      <input
        type="number"
        placeholder="Set frame interval in ms"
        defaultValue={frameInterval}
        onChange={handleIntervalChange}
      ></input>
      <button className="button-64" onClick={handlePlayPause}>
        <span class="text">{isPlaying ? "Pause" : "Play"}</span>
      </button>
    </div>
  );
}
export default Playback;
