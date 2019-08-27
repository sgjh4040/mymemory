exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
      console.log('로그인되어있음')
      next();
    } else {
     return res.status(403).send('로그인 필요');
    }
  };
  
  exports.isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
      console.log('로그인필요')
      next();
    } else {
      return res.status(403).send('이미 로그인 되어있음');
    }
  };
  