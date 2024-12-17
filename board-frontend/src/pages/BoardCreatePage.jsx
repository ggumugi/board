import BoardForm from '../components/board/BoardForm'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { createBoardThunk } from '../features/boardSlice'
import { useCallback } from 'react'

const BoardCreatePage = () => {
   const navigate = useNavigate()
   const dispatch = useDispatch()

   const handleSubmit = useCallback(
      (boardData) => {
         // postData  -  사용자가 입력한 게시물 데이터
         dispatch(createBoardThunk(boardData))
            .unwrap()
            .then(() => {
               navigate('/') // 등록 후 메인 페이지 이동
            })
            .catch((err) => {
               console.error('게시물 등록 실패 : ', err)
               alert('게시물을 등록할 수 없습니다.')
            })
      },
      [dispatch, navigate]
   )
   return (
      <div>
         <h1>게시물 등록</h1>
         <BoardForm onSubmit={handleSubmit} />
      </div>
   )
}

export default BoardCreatePage
