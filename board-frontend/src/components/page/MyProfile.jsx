import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useCallback } from 'react'
import { getProfileThunk, getProfileIdThunk } from '../../features/pageSlice'
const MyProfile = () => {
   const { id } = useParams()

   const dispatch = useDispatch()
   const { user } = useSelector((state) => state.page)
   const fetchProfileData = useCallback(() => {
      if (id) {
         // 게시물의 이름을 클릭해서 들어온 경우
         dispatch(getProfileIdThunk(id))
            .unwrap()
            .catch((err) => {
               console.error('사용자 정보 가져오는 중 오류 발생', err)
               alert('사용자 정보 가져오기를 실패했습니다.', err)
            })
      } else {
         dispatch(getProfileThunk())
            .unwrap()
            .catch((err) => {
               console.error('사용자 정보 가져오는 중 오류 발생', err)
               alert('사용자 정보 가져오기를 실패했습니다.', err)
            })
      }
   }, [dispatch, id])

   useEffect(() => {
      fetchProfileData()
   }, [fetchProfileData])
   return (
      <>
         {user && (
            <div>
               <h2>{user.email}</h2>
               <h2>{user.nick}</h2>
               <p>자기소개</p>
               <h4>작성한 게시글</h4>
            </div>
         )}
      </>
   )
}
export default MyProfile
