import BoardForm from '../components/board/BoardForm'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBoardByIdThunk, updateBoardThunk } from '../features/boardSlice'
import { useCallback, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const BoardEditPage = () => {
   const { id } = useParams()
   const dispatch = useDispatch()
   const { board, loading, error } = useSelector((state) => state.boards)

   useEffect(() => {
      dispatch(fetchBoardByIdThunk(id))
   }, [dispatch, id])

   const handleSubmit = useCallback(
      (boardData) => {
         dispatch(updateBoardThunk({ id, boardData }))
            .unwrap()
            .then(() => {
               // navigate('/') // 등록 후 메인 페이지 이동
               window.location.href = '/'
            })
            .catch((err) => {
               console.error('게시물 등록 실패 : ', err)
               alert('게시물을 등록할 수 없습니다.')
            })
      },
      [dispatch, id]
   )

   if (loading) return <p>로딩 중...</p>
   if (error) return <p>에러발생 : {error}</p>
   return (
      <div>
         <h1>게시물 등록</h1>
         {board && <BoardForm onSubmit={handleSubmit} initialValues={board} />}
      </div>
   )
}

export default BoardEditPage
