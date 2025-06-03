import { useState } from "react";
import NavbarSign from "../components/NavbarSign";
import { useAuth } from "../hooks/useAuth";
import AuthForm from "../components/AuthForm";


export default function LoginPage() {
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);


  const toggleForm = () => {
    setIsLogin(!isLogin);
  };
    
  return (
    <div className="w-full bg-[#1a1a17] flex flex-col min-h-screen overflow-hidden relative">
      <NavbarSign />
      <div className="flex flex-col mt-40 justify-center items-center">
        
      <AuthForm isLogin={isLogin} setIsLogin={setIsLogin} login={login}/>
    
      <p className="mt-4 text-sm  text-white">
                {isLogin
                  ? "Don't have an account?  "
                  : "Already have an account?  "}{" "}
                <span
                  className="text-orange-500 cursor-pointer underline pl-3"
                  onClick={toggleForm}
                >
                  {isLogin ? "  Register here" : "  Login here"}
                </span>
              </p>
    </div>
    </div>
  );
}