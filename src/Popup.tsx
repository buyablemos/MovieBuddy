import React from 'react';

interface PopupProps {
    message: string;
    onClose: () => void;
}

const Popup:React.FC<PopupProps>= ({ message, onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-5 rounded shadow-md">
                <h2 className="text-lg font-bold">{message}</h2>
                <button
                    onClick={onClose}
                    className="mt-4 bg-gray-300 hover:bg-blue-500 focus:outline-none"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default Popup;
