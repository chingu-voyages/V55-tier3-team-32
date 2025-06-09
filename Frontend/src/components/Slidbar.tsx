import React, { type  Dispatch , type SetStateAction } from 'react';
import { useAuth } from '../hooks/AuthContext';
import { useNavigate } from 'react-router-dom';

interface SidebarProps {
    setResult: Dispatch<SetStateAction<string>>;
    setResultTitle: Dispatch<SetStateAction<string>>;
    setShowResult: Dispatch<SetStateAction<boolean>>;
    
    userHistory: any[];
    loading: boolean;
    handleDeleteHistory: (id: number) => void;

}

const Sidebar : React.FC <SidebarProps> = (
    {
        setResult,
        setResultTitle,
        setShowResult,
        
        userHistory,
        loading,
        handleDeleteHistory,
    }
) => {
    const {username, logout} = useAuth();
    const navigate = useNavigate();

    const handleLogout = ()=> {
        logout();
        navigate('/');
    }

    const handleHistoryClick = (item: any) => {
        setResult(item.response);
        setResultTitle(item.title);
        setShowResult(true);
        
        // Optionally, you can also navigate to a specific page if needed
        // navigate('/result'); // Uncomment if you want to navigate to a result page
    }
    return (
        <div className="sidebar">
            <div> 
                <ul>
                    {loading ? (
                        <li>Loading...</li>
                    ) : (
                       userHistory && userHistory.length >0 ? (
                        userHistory.map((item : any , index) => (
                            <li key={index}>
                                <div className="history-item" onClick={()=> handleHistoryClick(item)}>
                                    <h3>{item.title}</h3>
                                </div>
                                <button onClick={() => handleDeleteHistory(item.id)}>
                                    <svg
                                        className="h-4 w-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </li>
                       ))
                       ): (
                           <div className="flex flex-col items-center justify-center h-[300px] text-gray-400 text-sm">
                                <svg
                                className="h-10 w-10 mb-2 text-gray-300"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M8 7V3m8 4V3M3 11h18M5 19h14M5 15h14m-9 4h4"
                                />
                                </svg>
                                <span>No history found</span>
                                <span className="text-xs text-gray-500">
                                Start by making a new prompt!
                                </span>
                            </div>
                       )
                    )}
                </ul>
            </div>
          
            <div className="flex items-center justify-center mt-6 space-x-2">
                <span className="text-sm text-gray-600">Logged in as:</span>
                <span className="text-sm font-semibold text-[#5C2E0C]">
                    {username || "Guest"}
                </span>
            </div>
            <div className="mt-2 text-center">
                <div
                    onClick={handleLogout}
                    className="text-sm text-[#5C2E0C] font-semibold cursor-pointer"
                >
                    Logout
                </div>
            </div>
        </div>
    );
}

export default Sidebar;