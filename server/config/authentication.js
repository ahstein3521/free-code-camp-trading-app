const jwt = require('jwt-simple');
const User = require('../models/user');
// require('../secret')




function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.JWT);
}


exports.signin = function(req, res, next) {
  
  res.send({ token: tokenForUser(req.user),user:req.user});
}

exports.signup = function(req, res, next) {
  const email    =req.body.email;
  const password =req.body.password;
  const location =req.body.location;
  const name     =req.body.name


  if (!email || !password ) {
    return res.status(422).send({ error: 'You must fill ALL the required forms'});
  }
  User.findOne({ email: email}, function(err, existingUser) {
    
    if (err) { return next(err); }

    if (existingUser) {
     
      return res.status(422).send({ error: 'An account with that User Name and/or Email already exists' });
    }

    const user = new User({
      email: email,
      password: password,
      location:location,
      name:name,
      displayName:name,
      request_received:[],
      request_sent:[]
    });

    user.save(function(err) {
      if (err) { return next(err); }
     
      res.json({ token: tokenForUser(user),user:user});
    });
  });
}
