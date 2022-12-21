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

    // create a blob object with the JSON string as the data
    const blob = new Blob([matrixStatesJson], { type: 'application/json' });

    // create a URL object that represents the blob
    const url = URL.createObjectURL(blob);

    // create a link element and set its href attribute to the URL of the blob
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName; // set the file name for the downloaded file

    // append the link element to the document and click it to initiate the download
    document.body.appendChild(link);
    link.click();

    // remove the link element from the document
    document.body.removeChild(link);
  }

  function handleFileChange(event) {
    // get the selected file from the input element
    const file = event.target.files[0];

    // create a FileReader object to read the file
    const reader = new FileReader();

    // set the onload event handler for the FileReader object
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