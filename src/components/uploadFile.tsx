import React, { useState, ChangeEvent } from 'react';
import { storage } from '@/utils/clientAppwrite';
import { ID } from 'appwrite';

function MultipleFileUpload() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files) {
      const validFiles = Array.from(files);
      setSelectedFiles([...selectedFiles, ...validFiles]);
    }
  };

  const handleRemoveFile = (index: number) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
  };

  const handleUpload = () => {
    // Perform the upload logic using the selected files
    if (selectedFiles.length > 0) {
      // You can use XMLHttpRequest or fetch to send the files to the server
      // For simplicity, we'll just log the file details here
      selectedFiles.forEach(async (file) => {
        await storage.createFile("658fad6a1cfcc5125a99", ID.unique(), file);
      });
      
    } else {
      console.log('No files selected.');
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} multiple />
      <div>
        {selectedFiles.map((file, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src={URL.createObjectURL(file)}
              alt={file.name}
              style={{ maxWidth: '100px', maxHeight: '100px', marginRight: '10px' }}
            />
            <span>{file.name}</span>
            <button onClick={() => handleRemoveFile(index)}>Remove</button>
          </div>
        ))}
      </div>
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default MultipleFileUpload;
