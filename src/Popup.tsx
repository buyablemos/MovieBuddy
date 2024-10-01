import React from 'react';

interface PopupProps {
    message: string;
    onClose: () => void;
}

const Popup:React.FC<PopupProps>= ({ message, onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="popup">
                <h2 className=" text-lg font-bold">{message}</h2>
                <button
                    onClick={onClose}
                    className="custom-button mt-4 mb-0"
                >

                    <p>Close</p>
                </button>
            </div>
        </div>
    );
};

export default Popup;
