import axios from "axios";
import {  useState } from "react";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast/headless";
import { useGoogleLogin } from "@react-oauth/google";

export default function LoginPage() {
  const googleLogin = useGoogleLogin({
    onSuccess: (res)=>{
      console.log(res)
      axios.post(import.meta.env.VITE_BACKEND_URL+"/user/googleLogin",{
        token : res.access_token
      }).then(
        (res)=>{
          if(res.data.message == "User created"){
            toast.success("Your account is created now you can login via google.")
          }else{
            localStorage.setItem("token",res.data.token)
            if(res.data.user?.type === "admin"){
              window.location.href = "/admin"
            }else{
              window.location.href = "/"
            }
          }
        }
      )
    }
  })


  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function login() {
   
    axios.post(import.meta.env.VITE_BACKEND_URL+"/user/login", {
      email: email,
      password: password
    })
    .then((res) => {
      console.log(res.data);
      localStorage.setItem("token",res.data.token);
      if(res.data.user== null){
        toast.error(res.data.massage);
        return 
      }
      if(res.data.user.type == "admin"){
        window.location.href = "/admin";
      }
      else{
        window.location.href = "/";
      }
      
    })
    .catch((err) => {
      console.log("Login Error:", err);
      alert("Login error");
    });
  }

  return (
    <div className="w-full h-screen bg-gradient-to-tr from-red-100 to-blue-100 flex justify-center items-center">
      <div className="w-[450px] bg-white shadow-2xl rounded-3xl p-10 flex flex-col items-center">
        
        <div className="bg-blue-50 p-2 rounded-full mb-4 shadow-sm">
           <img src="/logo.avif" alt="Logo" className="w-24 h-24 rounded-full object-cover" />
        </div>

        <h1 className="text-2xl font-extrabold text-gray-800 mb-2">Welcome Back</h1>
        <p className="text-gray-500 text-sm mb-8">Login to your account to continue</p>
        
        <div className="w-full space-y-5">
          <div className="flex flex-col space-y-1">
            <span className="text-sm font-semibold text-gray-700 ml-1">Email / Username</span>
            <input 
              type="text" 
              placeholder="Enter your email" 
              value={email} 
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-400 focus:bg-white focus:outline-none transition-all"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col space-y-1">
            <span className="text-sm font-semibold text-gray-700 ml-1">Password</span>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password} 
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-400 focus:bg-white focus:outline-none transition-all"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button 
            className="w-full bg-accent text-white font-bold py-3 rounded-xl mt-4 hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-0.5 transition-all active:scale-95"
            onClick={login}
          >
            Login Now
          </button>
            <button 
            className="w-full bg-blue-500 text-white font-bold py-3 rounded-xl mt-4 hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-0.5 transition-all active:scale-95"
            onClick={googleLogin}
          >
          Google Login
          </button>
        </div>

        <p className="mt-8 text-sm text-gray-400">
          Don't have an account? <span className="text-blue-500 cursor-pointer font-medium">Sign Up</span>
        </p>
      </div>
    </div>
  );
}
    