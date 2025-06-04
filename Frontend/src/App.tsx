import LandingPage from "./pages/LandingPage"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SearchAIPage from "./pages/SearchAIPage";
import './App.css'
import LoginPage from "./pages/LoginPage";
import { AuthProvider  } from "./hooks/AuthContext";



function App() {

 

  return (
   <Router>
      <AuthProvider>
      <Routes>
        <Route path="/signup" element={<LoginPage />} />
        <Route path="/" element={<LandingPage />} />
        {/* <Route path="/" element={<h1 className="text-orange-500 text-4xl font-bold">Hello Vite + React!</h1>} /> */}
        
        <Route path="/SearchAI" element={
          
            <SearchAIPage />
        
      } />

        </Routes>
        </AuthProvider>
   </Router>
  )
}

export default App
