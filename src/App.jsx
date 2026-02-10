

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/homepage.jsx'
import LoginPage from './pages/loginpage.jsx'
import SignupPage from './pages/singuppage.jsx'
import AdminPage from './pages/adminpage.jsx'
import { Toaster } from 'react-hot-toast'
import Test from '../test.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
function App() {
 

  return (
    <>
      <BrowserRouter>
      <GoogleOAuthProvider clientId="847558995277-017sa8dsnag4ia0n8gqqv4uvathjr77d.apps.googleusercontent.com">
        <Toaster></Toaster>
        <Routes>
      
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signin" element={<SignupPage />} />
        <Route path ="/testing" element ={<Test/>}/>
        <Route path="/admin/*" element={<AdminPage />} />
        <Route path="/*" element={<HomePage />} />
       
        </Routes>
        </GoogleOAuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
