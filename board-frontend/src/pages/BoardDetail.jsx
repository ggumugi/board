import { Card, CardMedia, CardContent, Typography, Box, CardActions, Button, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { Link, useParams } from 'react-router-dom'
import dayjs from 'dayjs' // 날짜 시간 포맷해주는 패키지
import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBoardThunk, fetchBoardByIdThunk } from '../features/boardSlice'

const BoardDetail = ({ isAuthenticated, user }) => {
   const { id } = useParams()
   const { board, loading, error } = useSelector((state) => state.boards)
   const dispatch = useDispatch()
   const onClickDelete = useCallback(
      (id) => {
         dispatch(deleteBoardThunk(id))
            .unwrap()
            .then(() => {
               window.location.href = '/'
            })
            .catch((err) => {
               console.error('게시물 삭제 실패 : ', err)
               alert('게시물을 삭제할 수 없습니다.')
            })
      },
      [dispatch]
   )
   useEffect(() => {
      dispatch(fetchBoardByIdThunk(id))
   }, [dispatch, id])

   if (loading) return <p>로딩 중...</p>
   if (error) return <p>에러발생 : {error}</p>

   return (
      <>
         {board && board.User.id && (
            <Card style={{ margin: '60px 0' }}>
               <CardMedia sx={{ height: 600 }} image={`${process.env.REACT_APP_API_URL}${board.img}`} title={board.title} />
               <CardContent>
                  <Link to={`/my/${board.User.id}`} style={{ textDecoration: 'none' }}>
                     <Typography sx={{ color: 'primary.main' }}>@{board.User.nick} </Typography>
                  </Link>
                  <Typography>{board.title}</Typography>

                  <Typography>{board.comment}</Typography>
                  <br />
                  <Typography>{dayjs(board.createdAt).format('YYYY-MM-DD HH:mm:ss')}</Typography>
               </CardContent>
               <CardActions>
                  <Button size="small" color="primary">
                     <FavoriteBorderIcon fontSize="small" />
                  </Button>
                  {/* isAuthenticated가 true 이면서 board.User.id와 user.id가 같을때 렌더링 => 내가 작성한 게시글만 수정, 삭제 */}
                  {/* 로그인한 상태 이면서 로그인한 사람과 글을 작성한 사람이 같으면 렌더링 */}
                  {isAuthenticated && board.User.id === user.id && (
                     <Box sx={{ p: 2 }}>
                        <Link to={`/board/edit/${board.id}`}>
                           <IconButton aria-label="edit" size="small">
                              <EditIcon fontSize="small" />
                           </IconButton>
                        </Link>
                        <IconButton aria-label="delete" size="small" onClick={() => onClickDelete(board.id)}>
                           <DeleteIcon fontSize="small" />
                        </IconButton>
                     </Box>
                  )}
               </CardActions>
            </Card>
         )}
         <Link to={'/'}>뒤로가기</Link>
      </>
   )
}

export default BoardDetail
