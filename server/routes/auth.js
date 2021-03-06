module.exports = function(app){
const Authentication = require('../config/authentication');	
const passport = require('passport');
const passportService=require('../config/passport')

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });
  

  app.post('/signin', requireSignin, Authentication.signin);
  app.post('/signup', Authentication.signup);
  

}