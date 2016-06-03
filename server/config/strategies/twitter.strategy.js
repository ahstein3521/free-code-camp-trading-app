const User = require('../../models/user');
const secret=require('../../secret');
const TwitterStrategy=require('passport-twitter').Strategy;

const twitterOptions={
    consumerKey: secret.twitterKey,
    consumerSecret: secret.twitterSecret,
    callbackURL: "http://localhost:3000/auth/twitter/callback"
  }

module.exports= new TwitterStrategy(twitterOptions,
  function(token, tokenSecret, profile, done) {
      console.log(profile)
      done(null, profile);
    

  })
;