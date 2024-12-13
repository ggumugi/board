import React from 'react'
import { Container } from '@mui/material'
import { Link } from 'react-router-dom'
const LoginPage = () => {
   return (
      <Container maxWidth="md">
         <h1>홈입니다</h1>
         <Link to="/login">로그인</Link>
      </Container>
   )
}

export default LoginPage
