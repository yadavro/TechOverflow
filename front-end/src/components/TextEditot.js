import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // import styles

const TextEditor = ({nextClick,onContentChange,showNextButton = true}) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const MIN_CHAR_LIMIT = 20;
  const modules = {
    toolbar: [
      [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
      [{size: []}],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      ['link', 'image'],
      [{ 'code-block': true }], 
      ['clean']  
    ],
  };

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet',
    'link', 'image',
    'code-block' 
  ];

  const handleChange = (content) => {
    setValue(content);

    // Remove HTML tags and count only the text content
    const plainText = content.replace(/<[^>]+>/g, '').trim();
    if (plainText.length < MIN_CHAR_LIMIT) {
      setError(`Content must be at least ${MIN_CHAR_LIMIT} characters long.`);
    } else {
      setError('');
    }
  };

  const handleNext = () => {
    const plainText = value.replace(/<[^>]+>/g, '').trim();
    
    // Check if the content meets the character limit
    if (plainText.length >= MIN_CHAR_LIMIT) {
      onContentChange(value); // Pass the content to the parent      
      nextClick();  // Call the parent function to move to the next step
    }
  };

  return (
    <div style={styles.container}>
    <ReactQuill 
      value={value}
      onChange={handleChange}
      modules={modules}
      formats={formats}
      placeholder="Start writing..."
      style={styles.quillEditor} // Add custom styles here if needed
    />
    {error && <p style={styles.error}>{error}</p>}
    {showNextButton && (
        <button 
          type='button'
          style={styles.button}
          disabled={value.replace(/<[^>]+>/g, '').length < MIN_CHAR_LIMIT}
          onClick={handleNext}
        >
          Next
        </button>
      )}
  </div>
);
};
const styles = {
    container: {
      margin: '20px 0',
      padding: '10px',
      backgroundColor: '#f9f9f9',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    quillEditor: {
      height: '200px', // Set a height for the editor
    },
    error: {
      color: 'red',
      marginTop: '10px',
    },
    button: {
      marginTop: '60px',
      padding: '10px 15px',
      backgroundColor: '#007BFF',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    }
};

export default TextEditor;
