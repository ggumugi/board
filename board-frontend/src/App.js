import { Route, Routes } from 'react-router-dom'
import './styles/common.css'
import SignupPage from './pages/SignupPage'

function App() {
   return (
      <>
         <Routes>
            <Route path="/" element={<SignupPage />} />
         </Routes>
      </>
   )
}

export default App
