const User = require('../../models/user');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;


const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: require('../../secret').local
};


module.exports = new JwtStrategy(jwtOptions, function(payload, done) {

  User.findById(payload.sub, function(error, user) {
    if (error) { 
      return done(error, false); 
    }

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});