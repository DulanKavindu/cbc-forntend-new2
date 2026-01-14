

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/homepage.jsx'
import LoginPage from './pages/loginpage.jsx'
import SignupPage from './pages/singuppage.jsx'
import AdminPage from './pages/adminpage.jsx'
function App() {
 

  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signin" element={<SignupPage />} />
        <Route path="/admin/*" element={<AdminPage />} />
       
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
