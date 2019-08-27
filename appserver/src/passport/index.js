const local = require('./localStrategy');
const jwt = require('./jwtStrategy');
// const kakao = require('./kakaoStrategy');
const User = require('../schemas/user');


module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    console.log('serializeUser');
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    console.log('deserializeUser');
    User.findById(id)
      .then(user => done(null, user))
      .catch(err => done(err));
  });

  local(passport);
  jwt(passport);
//   kakao(passport);
};
