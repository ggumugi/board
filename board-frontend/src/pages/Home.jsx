import { Container, Typography, Pagination, Stack } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUserThunk } from '../features/authSlice'
import { fetchBoardsThunk } from '../features/boardSlice'
import BoardItem from '../components/board/BoardItem'
const Home = ({ isAuthenticated, user }) => {
   const [page, setPage] = useState(1)
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const { boards, pagination, loading } = useSelector((state) => state.boards)

   useEffect(() => {
      dispatch(fetchBoardsThunk(page))
   }, [dispatch, page])
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
   const handlePageChange = useCallback((event, value) => {
      setPage(value)
   }, [])
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
         {boards.length > 0 ? (
            <>
               {boards.map((board) => (
                  <BoardItem key={board.id} board={board} isAuthenticated={isAuthenticated} user={user} />
               ))}
               <Stack spacing={2} sx={{ mt: 3, alignItems: 'center' }}>
                  <Pagination count={pagination.totalPages} page={page} onChange={handlePageChange} />
               </Stack>
            </>
         ) : (
            !loading && (
               <Typography variant="body1" align="center">
                  게시물이 없습니다.
               </Typography>
            )
         )}
      </Container>
   )
}

export default Home
