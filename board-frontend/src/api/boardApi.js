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

// 로그인
export const loginUser = async (credentials) => {
   try {
      const response = await boardApi.post('/auth/login', credentials)
      return response
   } catch (err) {
      console.error(`API Request 오류 : ${err.message}`)
      throw err // 리퀘스트 할 때 오류 발생시 에러를 registerUser()함수를 실행한 곳으로 던짐
   }
}
// 로그아웃
// 로그아웃은 credentials 필요 없고 get 임
export const logoutUser = async () => {
   try {
      const response = await boardApi.get('/auth/logout')
      return response
   } catch (err) {
      console.error(`API Request 오류 : ${err.message}`)
      throw err // 리퀘스트 할 때 오류 발생시 에러를 registerUser()함수를 실행한 곳으로 던짐
   }
}

export const checkAuthStatus = async () => {
   try {
      const response = await boardApi.get('/auth/status')
      return response
   } catch (err) {
      console.error(`API Request 오류 : ${err.message}`)
      throw err
   }
}

// 게시물 등록
export const createBoard = async (boardData) => {
   try {
      //postData = 등록할 게시물 데이터가 담겨있는 json 객체

      const config = {
         headers: {
            'Content-Type': 'multipart/form-data', // 데이터 형식 지정
         },
      }
      const response = await boardApi.post('/board', boardData, config)
      return response
   } catch (err) {
      console.error(`API Request 오류 : ${err.message}`)
      throw err
   }
}

// 게시물 수정
export const updateBoard = async (id, boardData) => {
   try {
      //postData = 등록할 게시물 데이터가 담겨있는 json 객체

      const config = {
         headers: {
            'Content-Type': 'multipart/form-data', // 데이터 형식 지정
         },
      }
      const response = await boardApi.put(`/board/${id}`, boardData, config)
      return response
   } catch (err) {
      console.error(`API Request 오류 : ${err.message}`)
      throw err
   }
}
// 게시물 삭제
export const deleteBoard = async (id) => {
   try {
      const response = await boardApi.delete(`/board/${id}`)
      return response
   } catch (err) {
      console.error(`API Request 오류 : ${err.message}`)
      throw err
   }
}
// 특정 게시물 가져오기
export const getBoardById = async (id) => {
   try {
      const response = await boardApi.get(`/board/${id}`)
      return response
   } catch (err) {
      console.error(`API Request 오류 : ${err.message}`)
      throw err
   }
}
// 전체 게시물 가져오기
export const getBoards = async (page) => {
   try {
      const response = await boardApi.get(`/board?page=${page}`)
      return response
   } catch (err) {
      console.error(`API Request 오류 : ${err.message}`)
      throw err
   }
}

// export const getBoardsById = async (id, page) => {
//    try {
//       const response = await boardApi.get(`/board/${id}?page=${page}`)
//       return response
//    } catch (err) {
//       console.error(`API Request 오류 : ${err.message}`)
//       throw err
//    }
// }
