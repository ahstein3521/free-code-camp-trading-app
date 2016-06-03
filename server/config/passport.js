const passport = require('passport');
const jwtLogin=require('./Strategies/jwt.strategy')
const localLogin=require('./Strategies/local.strategy')
const twitterLogin=require('./Strategies/twitter.strategy')


passport.use(jwtLogin);
passport.use(localLogin);
passport.use(twitterLogin)