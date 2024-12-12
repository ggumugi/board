const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

router.post('/join', async (req, res, next) => {
   const { email, nick, password } = req.body

   try {
      const exUser = await User.findOne({ where: { email } })
      if (exUser) {
         return res.status(409).json({
            success: false,
            message: '이미 존재하는 사용자입니다.',
         })
      }

      const hash = await bcrypt.hash(password, 12)
      const newUser = await User.create({
         email,
         nick,
         password: hash,
      })

      res.status(201).json({
         success: true,
         message: '회원가입 성공!',
         user: {
            id: newUser.id,
            email: newUser.email,
            nick: newUser.nick,
         },
      })
   } catch (err) {
      console.error(err)
      res.status(500).json({
         success: false,
         message: '회원가입 중 오류가 발생했습니다.',
         error: err,
      })
   }
})

router.post('/login', async (req, res, next) => {})

router.get('/logout', async (req, res, next) => {})

router.get('/status', async (req, res, next) => {})

module.exports = router
