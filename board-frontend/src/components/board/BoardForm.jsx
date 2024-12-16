import React, { useState, useCallback, useMemo } from 'react'

// 등록, 수정 폼 컴포넌트
const PostForm = ({ onSubmit, initialValues = {} }) => {
   const [imgUrl, setImgUrl] = useState(initialValues.img ? process.env.REACT_APP_API_URL + initialValues.img : '')
   const [imgFile, setImgFile] = useState(null)
   const [comment, setComment] = useState('')
   const handleImageChange = useCallback((e) => {
      const file = e.target.files && e.target.files[0]
      if (!file) return

      setImgFile(file)
      const reader = new FileReader()

      reader.onload = (e) => {
         setImgUrl(e.target.result)
      }

      reader.readAsDataURL(file)
   }, [])

   const handleSubmit = useCallback((e) => {}, [])
   return (
      <form onSubmit={handleSubmit}>
         {/* 이미지 업로드 필드 */}
         <button>
            이미지 업로드
            <input type="file" name="img" accept="image/*" hidden onChange={handleImageChange} />
         </button>

         {imgUrl && (
            <div>
               <img src={imgUrl} alt="업로드 이미지 미리보기" style={{ width: '400px' }} />
            </div>
         )}

         {/* 게시물 내용 입력 필드 */}
         <textarea name="게시물 내용" value={comment} onChange={(e) => setComment(e.target.value)} />

         {/* 등록 / 수정 버튼 */}
         <button type="submit">
            {/* {submitButtonLabel} */}
            등록
         </button>
      </form>
   )
}

export default PostForm
