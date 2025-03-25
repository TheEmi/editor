import { useState } from 'react';
import "../css/SaveFile.css";

function SaveFile({ matrixStates, setMatrixStates }) {
  const [fileName, setFileName] = useState('');

  function handleFileNameChange(event) {
    setFileName(event.target.value);
  }

  function handleSaveClick() {
    // convert the matrixStates array to a JSON string
    const matrixStatesJson = JSON.stringify(matrixStates);

    const blob = new Blob([matrixStatesJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();

    // remove the link element from the document
    document.body.removeChild(link);
  }

  function handleFileChange(event) {
    // get the selected file from the input element
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.onload = (event) => {
      // parse the JSON string from the file and set it as the matrixStates
      const matrixStates = JSON.parse(event.target.result);
      setMatrixStates(matrixStates);
    };

    // start reading the file
    reader.readAsText(file);
  }

  return (
    <div className='SaveFile'>
      <input type="text" value={fileName} placeholder="Enter file name" onChange={handleFileNameChange} />
      <button onClick={handleSaveClick}>Save</button>
      <input type="file" onChange={handleFileChange} />
    </div>
  );
}
export default SaveFile;