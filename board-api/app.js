const express = require('express')
const path = require('path') // 경로 처리 유틸리티
const morgan = require('morgan') // HTTP 요청 로깅 미들웨어

require('dotenv').config()
const cors = require('cors')

// 라우터 밑 기타모듈 불러오기
const indexRouter = require('./routes')
const authRouter = require('./routes/auth')
const { sequelize } = require('./models')

const app = express()
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

//라우터 등록
app.use('/', indexRouter)
app.use('/auth', authRouter)

app.options('*', cors()) /
   app.listen(app.get('port'), () => {
      console.log(app.get('port'), '번 포트에서 대기중')
   })
