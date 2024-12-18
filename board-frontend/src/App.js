import { Route, Routes } from 'react-router-dom'
import './styles/common.css'
import SignupPage from './pages/SignupPage'
import Login from './pages/Login'
import Home from './pages/Home'
import BoardCreatePage from './pages/BoardCreatePage'
import BoardEditPage from './pages/BoardEditPage'
import BoardDetail from './pages/BoardDetail'
// import BoardMy from './pages/BoardMy'
import { useDispatch, useSelector } from 'react-redux'
import { checkAuthStatusThunk } from './features/authSlice'
import { useEffect } from 'react'

function App() {
   const dispatch = useDispatch()
   const { isAuthenticated, user } = useSelector((state) => state.auth)

   // 새로고침 마다 redux 데이터가 사라지거나 서버에서 문제 발생 가능성이 있으므로 지속적인 로그인 상태 확인을 위해 사용
   useEffect(() => {
      dispatch(checkAuthStatusThunk())
   }, [dispatch])
   return (
      <>
         <Routes>
            <Route path="/" element={<Home isAuthenticated={isAuthenticated} user={user} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/board/create" element={<BoardCreatePage />} />
            <Route path="/board/edit/:id" element={<BoardEditPage />} />
            <Route path="/board/detail/:id" element={<BoardDetail isAuthenticated={isAuthenticated} user={user} />} />
            {/* <Route path="/my/:id" element={<BoardMy isAuthenticated={isAuthenticated} />} /> */}
         </Routes>
      </>
   )
}

export default App
