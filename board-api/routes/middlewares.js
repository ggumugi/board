// 로그인 상태 확인 미들웨어
exports.isLoggedIn = (req, res, next) => {
   // 로그인 상태인지
   if (req.isAuthenticated()) {
      next()
   } else {
      res.status(403).json({
         success: false,
         message: '로그인이 필요합니다.',
      })
   }
}

// 비로그인 상태 확인 미들웨어
exports.isNotLoggedIn = (req, res, next) => {
   if (!req.isAuthenticated()) {
      // 비 로그인 상태인지
      next()
   } else {
      res.status(400).json({
         success: false,
         message: '이미 로그인이 된 상태입니다.',
      })
   }
}
