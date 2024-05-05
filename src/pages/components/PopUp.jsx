import React from "react";

const PopUp = ({ children, onClose, title, content, buttonText }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg">
        <div>
          <h3 className="text-lg font-bold mb-2">{title}</h3>
          <p>{content}</p>
        </div>
        <div className="flex justify-end mt-4">
          <button
            className="bg-red-500 text-white px-2 py-1 rounded"
            onClick={onClose}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
