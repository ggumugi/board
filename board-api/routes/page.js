const express = require('express')
const router = express.Router()
const { isLoggedIn } = require('./middlewares')
const { User } = require('../models')

router.get('/profile', isLoggedIn, async (req, res) => {
   res.json({
      success: true,
      user: req.user,
      message: '프로필 정보를 성공적으로 가져왔습니다.',
   })
})

router.get('/profile/:id', isLoggedIn, async (req, res) => {
   try {
      const userId = req.params.id // 사용자 id
      const user = await User.findOne({
         where: { id: userId },
         attributes: ['id', 'nick', 'email', 'createdAt', 'updatedAt'],
         //  include: [
         //     {
         //        model: Board,
         //        as: 'WriteBoard',
         //        attributes: ['title', 'comment', 'img'],
         //     },
         //  ],
      })
      if (!user) {
         return res.status(404).json({
            success: false,
            message: '사용자를 찾을 수 없습니다.',
         })
      }
      res.json({
         success: true,
         user,
         message: '프로필 정보를 성공적으로 가져왔습니다.',
      })
   } catch (err) {
      console.error(err)
      res.status(500).json({
         success: false,
         message: '정보를 가져오지 못했습니다.',
         error: err,
      })
   }
})

module.exports = router
