// import { Container, Typography, Pagination, Stack } from '@mui/material'
// import { Link, useParams } from 'react-router-dom'
// import { useEffect, useState, useCallback } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { fetchBoardsByIdThunk } from '../features/boardSlice'
// import BoardItem from '../components/board/BoardItem'
// const BoardMy = ({ isAuthenticated }) => {
//    const { id } = useParams()
//    const [page, setPage] = useState(1)
//    const dispatch = useDispatch()
//    const { boards, loading, pagination, error } = useSelector((state) => state.boards)
//    const { user } = useSelector((state) => state.auth)

//    useEffect(() => {
//       dispatch(fetchBoardsByIdThunk(id, page))
//    }, [dispatch, id, page])
//    const handlePageChange = useCallback((event, value) => {
//       setPage(value)
//    }, [])
//    return (
//       <Container maxWidth="md">
//          <h1>{user?.nick} 님의 게시글 입니다.</h1>
//          <Link to="/">홈으로 가기</Link>
//          {boards.length > 0 ? (
//             <>
//                {boards.map((board) => (
//                   <BoardItem key={board.id} board={board} isAuthenticated={isAuthenticated} user={user} />
//                ))}
//                <Stack spacing={2} sx={{ mt: 3, alignItems: 'center' }}>
//                   <Pagination count={pagination.totalPages} page={page} onChange={handlePageChange} />
//                </Stack>
//             </>
//          ) : (
//             !loading && (
//                <Typography variant="body1" align="center">
//                   게시물이 없습니다.
//                </Typography>
//             )
//          )}
//       </Container>
//    )
// }

// export default BoardMy
