
import axios ,{ AxiosError } from 'axios';
import {useState } from 'react';
import { API_URL } from '../const';
import Sidebar from '../components/Slidbar';
import { useHistory } from '../hooks/UseHistory';
// import { useAuth } from '../hooks/AuthContext';
import ResultDisplay from '../components/ResultDisplay';
import NavbarSign from '../components/NavbarSign';
import Footer from '../components/Footer';


export interface FormState{
    title: string;
    response: string;   
}
interface ErrorResponseData {
    message: string;
    errors?:{
        type: string;
        msg: string;
        path: string;
        location: string;   
        value: string;
    }[]

}
interface ValidationError {
    type: string;
    msg: string;
    path: string;
    location: string;
    value: string;
}

const  SearchAIPage = () => {
    const [error, setError] = useState<string | null>(null);
    const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
    const [formData, setFormData] = useState<FormState>({
        title: "",
        response: "",
    })
    const { userHistory, loading, handleDeleteHistory } = useHistory();
    const [result, setResult] = useState<string>("");
    const [resultTitle, setResultTitle] = useState<string>("");
    const [showResult, setShowResult] = useState<boolean>(false);
    // const [viewingHistory, setViewingHistory] = useState<boolean>(true);
    // const { isLoggedIn } = useAuth();

  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
            const aiResponse = await axios.post(
                `${API_URL}/search-ai`,
                formData.title,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                                  
                    }
                }
            );
            const generatedResponse = aiResponse.data.response;
            setFormData({ ...formData, response: generatedResponse });
        }catch (error) {
            console.error("Error fetching AI response:", error);
            if (axios.isAxiosError(error)&& error.response && error.response.data) {
                const errorData = error.response.data as ErrorResponseData;
                if (errorData.errors) {
                    setValidationErrors(errorData.errors);
                }else {
                    setValidationErrors([{ type: "error", msg: errorData.message, path: "", location: "", value: "" }]);
                }
            }else if (axios.isAxiosError(error)) {
               const axiosError = error as AxiosError;
               if (axiosError.response && axiosError.response.data) {
                   const errorData = axiosError.response.data as ErrorResponseData;
                   setError(
                    `Server Error: ${
                        errorData.message || axiosError.response.statusText
                    }`
                   );

        }else if(axiosError.request) {
            setError("Network Error: No response received from server.");
        } else {
            setError("An unexpected error occurred.");
        }
    }else {
        setError("An unexpected error occurred.");
    }
}
    }

    const { response } = formData;
  return(
    <div className="w-full h-full bg-[#1A1A17] flex flex-col min-h-screen overflow-hidden relative" >
        <NavbarSign />
        <div className="flex mt-20 mb-20 h-[80vh] w-full justify-center items-center pl-4 pr-4">
            {/* History of Search Part */}
            <div className="w-1/3 h-full bg-[#2C2C29] p-4 rounded-lg shadow-lg">
             <Sidebar
                setResult={setResult}
                setResultTitle={setResultTitle}
                setShowResult={setShowResult}
                
                userHistory={userHistory}
                loading={loading}
                handleDeleteHistory={(id) => handleDeleteHistory(id)}
             />
            </div>
            {/* Search AI Part */}
            { showResult ? (
                <ResultDisplay
                    result={result}
                    resultTitle={resultTitle}
                    handleEdit={() => {
                        setFormData({ ...formData, response: result });
                        setResult("");
                        setResultTitle("");
                        setShowResult(false);
                    }
                    }
                    handleNewPrompt={() => {
                        setFormData({ title: "", response: "" });
                        setResult("");
                        setResultTitle("");
                        setShowResult(false);
                    }
                    }
                    
                />
            ) : (
            <div className="w-2/3 h-full bg-[#2c2c29] p-4 rounded-lg shadow-lg ml-4">  
                <div className="w-full h-full p-4  rounded-lg">
                <form onSubmit={handleSubmit} className="flex h-full flex-col">
                    <textarea
                        className="w-full h-full p-2 bg-[#1A1A17] text-white rounded-lg focus:outline-none focus:ring-2 transition input-glow" 
                        placeholder={"Your search Result here..."}
                        rows={10}
                        style={{ resize: 'none' }}
                        name="response"
                        id="search-query"
                        value={response}
                    
                    ></textarea>
                    <input 
                        type="text" 
                        className="mt-4 p-2 bg-[#1A1A17] text-white rounded-lg focus:outline-none focus:ring-2 transition input-glow" 
                        placeholder="Enter your search query title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        name="title"
                        id="search-title"
                    />
                    <button 
                        type="submit" 
                        className="mt-4 text-white py-2  bg-orange-400  hover:bg-orange-500 px-4 rounded-lg "
                     
                    >
                        Search AI
                    </button>
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                    {validationErrors.length > 0 && (
                        <ul className="text-red-500 mt-2">
                            {validationErrors.map((error, index) => (
                                <li key={index}>
                                    {error.msg} (Path: {error.path})
                                </li>
                            ))}
                        </ul>
                    )}
                </form>
                </div>

            </div>)}
            
        </div>
        <Footer />
    </div>
  )

}
export default SearchAIPage;