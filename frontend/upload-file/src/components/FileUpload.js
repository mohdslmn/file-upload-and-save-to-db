// import { useState } from 'react';
// import './FileUpload.css';

// export default function FileUpload() {
//   const [file, setFile] = useState(null);
//   const [message, setMessage] = useState(null);

//   const handleFileChange = (event) => {
//     const selectedFile = event.target.files?.[0];
//     if (selectedFile) {
//       const fileExtension = selectedFile.name.split('.').pop()?.toLowerCase();
//       if (fileExtension === 'csv' || fileExtension === 'xlsx') {
//         setFile(selectedFile);
//         setMessage(null);
//       } else {
//         setFile(null);
//         setMessage({ type: 'error', text: 'Please select a .csv or .xlsx file' });
//       }
//     }
//   };

//   const handleUpload = async () => {
//     if (!file) {
//       setMessage({ type: 'error', text: 'Please select a file first' });
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       const response = await fetch('http://localhost:3000/api/upload', {
//         method: 'POST',
//         body: formData,
//       });

//       const result = await response.json();

//       if (response.ok) {
//         setMessage({ type: 'success', text: result.message });
//       } else {
//         setMessage({ type: 'error', text: result.message });
//       }
//     } catch (error) {
//       setMessage({ type: 'error', text: 'An error occurred while uploading the file' });
//     }
//   };

//   return (
//     <div className="file-upload-container">
//       <h1>File Upload</h1>
//       <div className="input-container">
//         <input type="file" onChange={handleFileChange} accept=".csv,.xlsx" />
//       </div>
//       <button onClick={handleUpload} disabled={!file}>
//         Upload
//       </button>
//       {message && (
//         <div
//           className={`alert ${message.type === 'error' ? 'alert-error' : 'alert-success'}`}
//         >
//           <strong>{message.type === 'error' ? 'Error: ' : 'Success: '}</strong>
//           {message.text}
//         </div>
//       )}
//     </div>
//   );
// }

'use client';

import React, { useState } from 'react';

export default function FileUpload() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      const fileExtension = selectedFile.name.split('.').pop()?.toLowerCase();
      if (fileExtension === 'csv' || fileExtension === 'xlsx') {
        setFile(selectedFile);
        setMessage(null);
      } else {
        setFile(null);
        setMessage({ type: 'error', text: 'Please select a .csv or .xlsx file' });
      }
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage({ type: 'error', text: 'Please select a file first' });
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:3000/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: result.message });
      } else {
        setMessage({
          type: 'error',
          text: result.message || 'An error occurred while uploading the file',
        });
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'An error occurred while uploading the file. Please try again.',
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>File Upload</h1>
      <div style={styles.inputContainer}>
        <input
          type="file"
          onChange={handleFileChange}
          accept=".csv,.xlsx"
          disabled={isUploading}
          style={styles.input}
        />
      </div>
      <button
        onClick={handleUpload}
        disabled={!file || isUploading}
        style={isUploading || !file ? styles.disabledButton : styles.button}
      >
        {isUploading ? 'Uploading...' : 'Upload'}
      </button>
      {message && (
        <div
          style={{
            ...styles.alert,
            backgroundColor: message.type === 'error' ? '#f8d7da' : '#d4edda',
            color: message.type === 'error' ? '#721c24' : '#155724',
          }}
        >
          <h4 style={styles.alertTitle}>
            {message.type === 'error' ? 'Error' : 'Success'}
          </h4>
          <p style={styles.alertDescription}>{message.text}</p>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '500px',
    margin: '50px auto',
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  inputContainer: {
    marginBottom: '20px',
  },
  input: {
    width: '100%',
    padding: '8px',
    fontSize: '16px',
  },
  button: {
    backgroundColor: '#007bff',
    color: '#ffffff',
    padding: '10px 20px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  disabledButton: {
    backgroundColor: '#c0c0c0',
    color: '#ffffff',
    padding: '10px 20px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'not-allowed',
  },
  alert: {
    marginTop: '20px',
    padding: '15px',
    borderRadius: '4px',
  },
  alertTitle: {
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  alertDescription: {
    margin: 0,
  },
};
