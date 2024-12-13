import { Route, Routes } from 'react-router-dom'
import './styles/common.css'
import SignupPage from './pages/SignupPage'
import Login from './pages/Login'
import Home from './pages/Home'

function App() {
   return (
      <>
         <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/login" element={<Login />} />

            <Route path="/signup" element={<SignupPage />} />
         </Routes>
      </>
   )
}

export default App
