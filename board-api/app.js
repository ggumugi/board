const express = require('express')
const path = require('path')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const passport = require('passport')

require('dotenv').config()
const cors = require('cors')

// 라우터 밑 기타모듈 불러오기
const indexRouter = require('./routes')
const authRouter = require('./routes/auth')
const { sequelize } = require('./models')
const passportConfig = require('./passport') // index.js

const app = express()
passportConfig()
app.set('port', process.env.PORT || 8002)

sequelize
   .sync({ force: false })
   .then(() => {
      console.log('데이터베이스 연결 성공')
   })
   .catch((err) => {
      console.error(err)
   })
app.use(
   cors({
      origin: 'http://localhost:3000',
      credentials: true,
   })
)

app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'uploads')))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser(process.env.COOKIE_SECRET))

// 세션
app.use(
   session({
      resave: false, // 자동 재저장
      saveUninitialized: true, // 빈 세션 저장
      secret: process.env.COOKIE_SECRET, // 암호화 키
      cookie: {
         httpOnly: true, // 헷갈리지 말기! javascript 쿠키 접근성
         secure: false, // false : http 사용 허가
      },
   })
)
//라우터 등록
app.use(passport.initialize())
app.use(passport.session())
app.use('/', indexRouter)
app.use('/auth', authRouter)

app.use((req, res, next) => {
   const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`)
   error.status = 404
   next(error)
})

app.use((err, req, res, next) => {
   const statusCode = err.status || 500
   const errorMessage = err.message || '서버 내부 오류'

   res.status(statusCode).json({
      success: false,
      message: errorMessage,
      error: err,
   })
})

app.options('*', cors()) /
   app.listen(app.get('port'), () => {
      console.log(app.get('port'), '번 포트에서 대기중')
   })
