import LandingPage from "./pages/LandingPage"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import './App.css'

function App() {
 

  return (
   <Router>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      {/* <Route path="/" element={<h1 className="text-orange-500 text-4xl font-bold">Hello Vite + React!</h1>} /> */}
      
    </Routes>
   </Router>
  )
}

export default App
