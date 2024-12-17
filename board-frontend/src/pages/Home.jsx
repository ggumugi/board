import React from 'react'
import { Container } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { logoutUserThunk } from '../features/authSlice'
const Home = ({ isAuthenticated, user }) => {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const handleLogout = useCallback(() => {
      dispatch(logoutUserThunk())
         .unwrap()
         .then(() => {
            navigate('/')
         })
         .catch((err) => {
            alert(err)
         })
   }, [dispatch, navigate])
   return (
      <Container maxWidth="md">
         <h1>홈입니다</h1>
         {isAuthenticated ? (
            <>
               <p>{user?.nick} 님, 환영합니다.</p>
               <button onClick={handleLogout}>로그아웃</button>
               <Link to="/board/create">글쓰기</Link>
            </>
         ) : (
            <>
               <Link to="/login">로그인</Link>
            </>
         )}
      </Container>
   )
}

export default Home
