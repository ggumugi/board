import React, { useState, useMemo, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginUserThunk } from '../../features/authSlice'

const Login = () => {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const { loading, error } = useSelector((state) => state.auth)

   const handleLogin = useCallback(
      (e) => {
         e.preventDefault()
         if (email.trim() && password.trim()) {
            dispatch(loginUserThunk({ email, password }))
               .unwrap()
               .then(() => navigate('/')) // 성공 = 메인페이지
               .catch((error) => {
                  console.error('로그인 실패 : ', error)
               }) // 실패 시 에러
         }
      },
      [dispatch, email, password, navigate]
   )

   const loginButtonContent = useMemo(() => (loading ? '로딩중' : '로그인'), [loading]) // 로딩 상태가 변결될 때만 버튼 내용이 다시 렌더링됨

   return (
      <>
         <h4>로그인</h4>

         {error && <h4>{error}</h4>}

         <form onSubmit={handleLogin}>
            <input label="이메일" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input label="비밀번호" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />

            <button type="submit" disabled={loading}>
               {loginButtonContent}
            </button>
         </form>

         <p>
            계정이 없으신가요? <Link to="/signup">회원가입</Link>
         </p>
      </>
   )
}

export default Login
