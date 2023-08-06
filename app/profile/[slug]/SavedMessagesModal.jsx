import React from 'react';

const SavedMessagesModal = ({ show, handleClose, savedMessages }) => {
  if (!show) {
    return null;
  }

  // CSS styles for the bubble and other elements
  const styles = {
    modalContainer: {
      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    },
    bubble: {
      backgroundColor: '#fff',
      borderRadius: '20px',
      padding: '10px',
      boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
      display: 'inline-block',
    },
    text: {
      color: '#6b7280', // Light gray color for the text
      fontSize: '1.25rem',
    },
    closeButton: {
      backgroundColor: '#e53e3e',
      color: '#fff',
      padding: '4px 12px',
      borderRadius: '9999px',
      position: 'absolute',
      bottom: '1rem',
      right: '1rem',
    },
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Background Overlay with Shadow */}
      <div className="fixed inset-0 bg-black bg-opacity-50"></div>

      {/* Modal Content */}
      <div style={styles.modalContainer} className="bg-gradient-to-b from-purple-300 to-purple-500 bg-opacity-75 p-8 rounded-lg relative max-w-md xl:max-w-xl w-full">

        <div className="relative overflow-y-auto max-h-96">
          {savedMessages.map((message, index) => (
            <div key={index} className="mb-4">
              <div style={styles.bubble}>
                <p style={styles.text}>
                  {index + 1}. {message}
                </p>
              </div>
            </div>
          ))}
        </div>
        <button
          style={styles.closeButton}
          onClick={handleClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SavedMessagesModal;
