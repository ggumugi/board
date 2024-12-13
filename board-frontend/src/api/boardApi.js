import axios from 'axios'

const BASE_URL = process.env.REACT_APP_API_URL

//axios 인스턴스 생성
const boardApi = axios.create({
   baseURL: BASE_URL,
   headers: {
      'Content-Type': 'application/json',
   },
   withCredentials: true, // 세션 쿠키를 요청에 포함
})

// 회원가입
export const registerUser = async (userData) => {
   try {
      const response = await boardApi.post('/auth/join', userData)
      return response
   } catch (err) {
      console.error(`API Request 오류 : ${err.message}`)
      throw err // 리퀘스트 할 때 오류 발생시 에러를 registerUser()함수를 실행한 곳으로 던짐
   }
}