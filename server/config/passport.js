const passport = require('passport');
const jwtLogin=require('./strategies/jwt.strategy')
const localLogin=require('./strategies/local.strategy')
//const twitterLogin=require('./Strategies/twitter.strategy')


passport.use(jwtLogin);
passport.use(localLogin);
// passport.use(twitterLogin)