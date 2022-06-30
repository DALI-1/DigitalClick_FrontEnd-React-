import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";



const fileTypes = ["JPEG", "PNG", "GIF"];

export default function UploadDragDrop() {
  const [file, setFile] = useState(null);
  const handleChange = (file) => {
    setFile(file);
  };
  return (
    <div className="App" style={{textalign: "center"}}>
      

      <FileUploader
        multiple={true}
        handleChange={handleChange}
        name="file"
        types={fileTypes}
      />
      <small style={{color: "black"}}>{file ? `File name: ${file[0].name}` : ""}</small>
    </div>
  );
}