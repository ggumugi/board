const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const passport = require('passport')
const { isLoggedIn, isNotLoggedIn } = require('./middlewares')
const User = require('../models/user')

router.post('/join', isNotLoggedIn, async (req, res, next) => {
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

// 주소 : 8000/auth/login
router.post('/login', isNotLoggedIn, async (req, res, next) => {
   passport.authenticate('local', (authError, user, info) => {
      if (authError) {
         // 에러
         return res.status(500).json({
            success: false,
            message: '인증 중 오류 발생',
            error: authError,
         })
      }
      if (!user) {
         // 비밀번호 x or 사용자 존재 x
         return res.status(401).json({
            success: false,
            message: info.message || '로그인 실패',
         })
      }
      req.login(user, (loginError) => {
         if (loginError) {
            return res.status(500).json({ success: false, message: '로그인 중 오류 발생', error: loginError })
         }
         // 로그인 성공
         res.json({
            success: true,
            message: '로그인 성공!',
            user: {
               id: user.id,
               nick: user.nick,
            },
         })
      })
   })(req, res, next)
})

// 주소 : 8000/auth/logout
router.get('/logout', isLoggedIn, async (req, res, next) => {
   req.logout((err) => {
      if (err) {
         console.log(err)
         return res.status(500).json({
            success: false,
            message: '로그아웃 중 오류가 발생했습니다.',
            error: err,
         })
      }
      // 성공
      res.json({
         success: true,
         message: '로그아웃에 성공했습니다.',
      })
   })
})

router.get('/status', async (req, res, next) => {
   if (req.isAuthenticated()) {
      res.json({
         isAuthenticated: true,
         user: {
            id: req.user.id,
            nick: req.user.nick,
         },
      })
   } else {
      res.json({
         isAuthenticated: false,
      })
   }
})

module.exports = router
