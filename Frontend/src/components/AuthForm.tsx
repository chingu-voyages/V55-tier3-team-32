import React, { useState } from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import axios , { AxiosError } from 'axios';
import { API_URL } from '../const';
import { z } from "zod";
import { useAuth } from "../hooks/AuthContext";

export const loginSchema = z.object({
  email: z.string()
    .min(0, { message: "Please fill in the email field" })
    .email({ message: "Invalid email address" }),
  password: z.string()
    .min(0, { message: "Please fill in the password field" })
    .min(6, { message: "Password must be at least 6 characters" }),
});

export const registerSchema = z.object({
  username: z.string()
    .min(0, { message: "Please fill in the username field" })
    .min(2, { message: "Username required" }),
  email: z.string()
    .min(0, { message: "Please fill in the email field" })
    .email({ message: "Invalid email address" }),
  password: z.string()
    .min(0, { message: "Please fill in the password field" })
    .min(6, { message: "Password must be at least 6 characters" }),
});

interface AuthFormProps {
    isLogin: boolean;
    setIsLogin : React.Dispatch<React.SetStateAction<boolean>>;
    // login: (token: string) => void;
}

interface AuthResponse {
  token: string;
  errors?:
    | string[]
    | {
        type: string;
        value: string;
        msg: string;
        path: string;
        location: string;
      }[];
  message?: string;
}

const AuthForm : React.FC<AuthFormProps> = ({isLogin, setIsLogin}) => {
    const [errorMessage, setErrorMessage] = useState("");
    const [registrationComplete, setRegistrationComplete] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();


    const [formDataRegister, setFromDataRegister]= useState({
        username: "",
        email: "",
        password: ""
    });

    const [formDataLogin, setFromDataLogin]= useState({
        email:"",
        password:""
    });

    const inputFieldsRegister = [
        {placeholder: "Username", name: "username", type: "text"},
        {placeholder: "Email", name: "email", type: "text"},
        {placeholder: "Password", name: "password", type: "password"}
    ]
    const inputFieldsLogin = [
        {placeholder: "Email", name: "email", type: "text"},
        {placeholder: "Password", name: "password", type: "password"}
    ]
    const onChangeRegister = (e : React.ChangeEvent<HTMLInputElement>) => {
        setFromDataRegister({ ...formDataRegister, [e.target.name]: e.target.value});
        setErrorMessage("");
        setRegistrationComplete(false);

    }

    const onChangeLogin = (e : React.ChangeEvent<HTMLInputElement>) => {
        setFromDataLogin({ ...formDataLogin, [e.target.name]: e.target.value})
        setErrorMessage("");
        setRegistrationComplete(false);
    }

    const onSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage("");

          // Zod validation
        let validation;
        if (isLogin) {
            validation = loginSchema.safeParse(formDataLogin);
        } else {
            validation = registerSchema.safeParse(formDataRegister);
        }
        console.log(validation);
        if (!validation.success) {
            setIsLoading(false);
            // Show the first error (you could show all errors)
            setErrorMessage(validation.error.errors[0].message);
            return;
        }
        try {
            let token: string
            if(isLogin){
                // Login logic
                const response = await axios.post(`${API_URL}/api/v1/users/login`, formDataLogin);
                token = response.data.token;
                setIsLoading(false);
                setFromDataLogin({
                    email: "",
                    password: ""
                });
            }else {
                // Register logic
                const response = await axios.post(`${API_URL}/api/v1/users/register`, formDataRegister);
                console.log(response.data);
                token = response.data.token;
                setIsLoading(false);
                setFromDataRegister({
                    username: "",
                    email: "",
                    password: ""
                });
                setRegistrationComplete(true);
                setIsLogin(true);
            }
            login(token);
            setErrorMessage("");
           console.log("Login successful, token:", token);
            const from = location.state?.from?.pathname || "/";
            navigate(from, { replace: true });
        } catch (err : unknown) {
            setIsLoading(false);
            if (axios.isAxiosError(err)) {
                const axiosError = err as AxiosError;
                if (axiosError.response?.data) {
                const responseData = axiosError.response.data as AuthResponse;
                if (responseData.errors && Array.isArray(responseData.errors)) {
                    if (typeof responseData.errors[0] === "string") {
                    setErrorMessage(responseData.errors.join("\n"));
                    } else {
                    const errorMessages = responseData.errors
                        .map((error) => (typeof error === "object" && error.msg) || "")
                        .filter(Boolean)
                        .join("\n");
                    setErrorMessage(errorMessages);
                    }
                } else if (responseData.message) {
                    setErrorMessage(responseData.message);
                } else {
                    setErrorMessage("An error occurred. Please try again.");
                }
                } else {
                setErrorMessage("An error occurred. Please try again.");
                }
            } else {
                setErrorMessage("An unexpected error occurred.");
            }
    }finally {
        setIsLoading(false);
        }
    }

    return(
        <div className="bg-white/10 p-8 rounded-lg shadow-md w-[40%] ">
            <h2 className="text-2xl font-bold mb-6 text-center">
                {isLogin ? "Login" : "Register"}
            </h2>
             {errorMessage && (
                <h3
                className="errorMessageRegister"
                style={{ whiteSpace: "pre-line", color: "red", marginBottom: "10px" }}
                >
                {errorMessage}
                </h3>
            )}
            {registrationComplete && (
                <h3 style={{ color: "green", marginBottom: "10px" }}>Registration complete! Please log in.</h3>
            )}
           
        
        <form onSubmit={onSubmit}>
            
            {isLogin ?(
                  <>
            {inputFieldsLogin.map((field, index)=> (
                 <div className="mb-4">
                    
                    <input
                    key={index}
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={formDataLogin[field.name as keyof typeof formDataLogin]}
                    onChange={onChangeLogin}
                    id={field.name}
                    className="w-full px-3 py-2  border border-gray-500 rounded focus:outline-none focus:ring-2 transition input-glow"
                    required
                    />
                </div>

                ))}
                  </>) : (
                    <>
                    {inputFieldsRegister.map((field, index)=> (
                        <div className="mb-4">

                            <input
                            key={index}
                            type={field.type}
                            name={field.name}
                            placeholder={field.placeholder}
                            value={formDataRegister[field.name as keyof typeof formDataRegister]}
                            onChange={onChangeRegister}
                            id={field.name}
                            className="w-full px-3 py-2 border border-gray-500 rounded focus:outline-none focus:ring-2 transition input-glow"
                            required
                            />
                        </div>
                    ))} 
                        </>)
                        }
    
          <button
            type="submit"
            className="w-full bg-orange-400 text-white py-2 rounded hover:bg-orange-500 transition duration-200"
          >
            {isLogin? isLoading ? "Signing In..." : "Sign In" : isLoading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>


    )

}

export default AuthForm;