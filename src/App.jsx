

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/homepage.jsx'
import LoginPage from './pages/loginpage.jsx'
import SignupPage from './pages/singuppage.jsx'
import AdminPage from './pages/adminpage.jsx'
import { Toaster } from 'react-hot-toast'
import Test from '../test.jsx'
function App() {
 

  return (
    <>
      <BrowserRouter>
        <Toaster></Toaster>
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signin" element={<SignupPage />} />
        <Route path ="/testing" element ={<Test/>}/>
        <Route path="/admin/*" element={<AdminPage />} />
       
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
