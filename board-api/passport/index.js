const passport = require('passport')
const User = require('../models/user')
const local = require('./localStrategy')

module.exports = () => {
   //직렬화(serializeUser)
   passport.serializeUser((user, done) => {
      done(null, user.id)
   })

   passport.deserializeUser((id, done) => {
      User.findOne({ where: { id } })
         .then((user) => done(null, user))
         .catch((err) => done(err))
   })

   local() // 함수 실행
}
