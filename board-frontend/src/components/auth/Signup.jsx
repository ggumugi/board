import { useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { registerUserThunk } from '../../features/authSlice'
import { Link } from 'react-router-dom'

const Signup = () => {
   const [email, setEmail] = useState('')
   const [nick, setNick] = useState('')
   const [password, setPassword] = useState('')
   const [confirmPassword, setConfirmPassword] = useState('')
   const [isSignupComplete, setIsSignupComplete] = useState(false) // 회원가입 완료 상태 추가

   const dispatch = useDispatch()
   const { loading, error } = useSelector((state) => state.auth)

   const handleSignup = useCallback(() => {
      if (!email.trim() || !nick.trim() || !password.trim() || !confirmPassword.trim()) {
         alert('모든 필드를 입력해주세요.')
         return
      }

      if (password !== confirmPassword) {
         alert('비밀번호가 일치하지 않습니다.')
         return
      }
      dispatch(registerUserThunk({ email, nick, password }))
         .unwrap()
         .then(() => {
            setIsSignupComplete(true)
         })
         .catch((error) => {
            console.error('회원가입 실패 : ', error)
         })
   }, [email, nick, password, confirmPassword, dispatch])

   if (isSignupComplete) {
      return (
         <>
            <h1>회원가입이 완료되었습니다.</h1>
            <Link to="/">홈으로</Link>
         </>
      )
   }
   return (
      <div>
         <h1>회원가입</h1>

         {error && <h1>{error}</h1>}
         <p>이메일</p>
         <input label="이메일" value={email} onChange={(e) => setEmail(e.target.value)} />
         <br />
         <p>이름</p>
         <input label="사용자 이름" value={nick} onChange={(e) => setNick(e.target.value)} />
         <br />
         <p>비밀번호</p>
         <input label="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} />
         <br />
         <p>비밀번호 확인</p>
         <input label="비밀번호 확인" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
         <br />
         <button onClick={handleSignup} disabled={loading} style={{ marginTop: '20px' }}>
            {loading ? '로딩중' : '회원가입'}
         </button>
      </div>
   )
}
export default Signup
