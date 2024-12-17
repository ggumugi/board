const express = require('express')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const { Board, User } = require('../models')
const { isLoggedIn } = require('./middlewares')
const router = express.Router()

// 폴더 존재 유무 확인 후 생성
try {
   fs.readdirSync('uploads')
} catch (err) {
   console.log('upload 폴더가 없습니다. 폴더를 생성합니다.')
   fs.mkdirSync('uploads')
}

// 이미지 업로드 준비 - 경로, 크기 설정
const upload = multer({
   storage: multer.diskStorage({
      destination(req, file, cb) {
         cb(null, 'uploads/')
      },
      filename(req, file, cb) {
         const ext = path.extname(file.originalname)

         cb(null, path.basename(file.originalname, ext) + Date.now() + ext)
      },
   }),

   limits: { fileSize: 10 * 1024 * 1024 },
})

// 게시물 등록 - 로그인 유무 확인 후 게시물의 제목, 내용, 이미지 등록
router.post('/', isLoggedIn, upload.single('img'), async (req, res) => {
   try {
      console.log('파일정보 : ', req.file)
      if (!req.file) {
         return res.status(400).json({
            success: false,
            message: '파일이 존재하지 않거나 이상합니다.',
         })
      }

      const board = await Board.create({
         title: req.body.title,
         comment: req.body.comment,
         img: `/${req.file.filename}`,
         UserId: req.user.id,
      })

      res.json({
         success: true,
         board: {
            id: board.id,
            title: board.title,
            comment: board.comment,
            img: board.img,
            UserId: board.UserId,
         },
      })
   } catch (err) {
      console.error(err)
      res.status(500).json({
         success: false,
         message: '게시물 등록 실패',
         error: err,
      })
   }
})

// 게시물 수정 - 로그인 유무 확인 후 게시물의 제목, 내용, 이미지 수정
router.put('/:id', isLoggedIn, async (req, res) => {
   try {
      const board = await Board.findOne({ where: { id: req.params.id, UserId: req.user.id } })
      if (!board) {
         return res.status(404).json({
            success: false,
            message: '게시물을 찾을 수 없습니다.',
         })
      }

      await board.update({
         title: req.body.title,
         comment: req.body.comment,
         img: req.file ? `/${req.file.filename}` : board.img,
      })

      const updatedBoard = await Board.findOne({
         where: { id: req.params.id },
         include: [
            {
               model: User,
               attributes: ['id', 'nick'], // id, nick 값만 가져옴
            },
         ],
      })
      res.json({
         success: true,
         board: updatedBoard,
         message: '게시물이 성공적으로 수정되었습니다.',
      })
   } catch (err) {
      console.error(err)
      res.status(500).json({
         success: false,
         message: '게시물 수정 실패',
         error: err,
      })
   }
})

// 게시물 삭제
router.delete('/:id', isLoggedIn, async (req, res) => {
   try {
      const board = await Board.findOne({ where: { id: req.params.id, UserId: req.user.id } })
      if (!board) {
         return res.status(404).json({
            success: false,
            message: '게시물을 찾을 수 없습니다.',
         })
      }
      await board.destroy()
      res.json({
         success: true,
         message: '게시물이 성공적으로 삭제되었습니다.',
      })
   } catch (err) {
      console.error(err)
      res.status(500).json({
         success: false,
         message: '게시물 삭제 실패',
         error: err,
      })
   }
})

// 특정 게시물 불러오기(id로 게시물 조회)
router.get('/:id', async (req, res) => {
   try {
      const board = await Board.findOne({
         where: { id: req.params.id },
         include: [
            {
               model: User,
               attributes: ['id', 'nick'],
            },
         ],
      })
      if (!board) {
         return res.status(404).json({
            success: false,
            message: '게시물을 찾을 수 없습니다.',
         })
      }
      res.json({
         success: true,
         board: board,
         message: '게시물 조회',
      })
   } catch (err) {
      console.error(err)
      res.status(500).json({
         success: false,
         message: '게시물 조회 실패',
         error: err,
      })
   }
})

// 전체 게시물 불러오기(페이징 기능)
router.get('/', async (req, res) => {})

module.exports = router
