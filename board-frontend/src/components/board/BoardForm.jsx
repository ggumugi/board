import React, { useState, useCallback, useMemo } from 'react'

// 등록, 수정 폼 컴포넌트
const BoardForm = ({ onSubmit, initialValues = {} }) => {
   const [imgUrl, setImgUrl] = useState(initialValues.img ? process.env.REACT_APP_API_URL + initialValues.img : '')
   const [title, setTitle] = useState('')
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

   const handleImageClick = useCallback(() => {
      document.getElementById('file-input').click()
   }, [])

   const handleSubmit = useCallback(
      (e) => {
         e.preventDefault()

         if (!comment.trim()) {
            alert('내용을 입력하세요.')
            return
         }

         if (!imgFile) {
            alert('이미지를 파일을 추가하세요.')
            return
         }

         const formData = new FormData()
         formData.append('title', title)
         formData.append('comment', comment)
         formData.append('img', imgFile)

         onSubmit(formData)
      },
      [comment, imgFile, onSubmit]
   )
   return (
      <form onSubmit={handleSubmit} encType="multipart/form-data">
         <p>제목</p>
         <textarea name="게시물 제목" value={title} onChange={(e) => setTitle(e.target.value)} />

         {/* 이미지 업로드 필드 */}
         <button type="button" onClick={handleImageClick}>
            이미지 업로드
         </button>
         <input id="file-input" type="file" name="img" accept="image/*" hidden onChange={handleImageChange} />

         {imgUrl && (
            <div>
               <img src={imgUrl} alt="업로드 이미지 미리보기" style={{ width: '400px' }} />
            </div>
         )}

         {/* 게시물 내용 입력 필드 */}
         <p>내용</p>
         <textarea name="게시물 내용" value={comment} onChange={(e) => setComment(e.target.value)} />

         {/* 등록 / 수정 버튼 */}
         <button type="submit">
            {/* {submitButtonLabel} */}
            등록
         </button>
      </form>
   )
}

export default BoardForm
