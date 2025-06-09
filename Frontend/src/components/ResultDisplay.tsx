interface ResultDisplayProps {
    result: string;
    resultTitle: string;
    handleEdit: () => void;
    handleNewPrompt: () => void;
  
}
import React from 'react';

const ResultDisplay: React.FC<ResultDisplayProps> = ({
    result,
    resultTitle,
    handleEdit,
    handleNewPrompt,
  
}) => {
    return (
        <div className="w-full h-full round-lg bg-gray-100 p-4 ">
            <h2>{resultTitle}</h2>
            <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
                <p className="text-gray-800">{result}</p>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
                <button
                    onClick={handleEdit}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                    Edit
                </button>
                <button
                    onClick={handleNewPrompt}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                >
                    New Prompt
                </button>
            </div>
        </div>
    );
}
export default ResultDisplay;