
var Users=require('../models/user');

module.exports=function(app){
  app.get('/users',function(req,res){
      

    Users.find({},function(error,d){
      if(error){ res.status(422).send(error)}
      res.send(d)
    })
  })
  
  app.put('/user/:name',function(req,res){
    var name=req.params.name

    Users.findOneAndUpdate({'name':name},req.body,{upsert:true},function(error,d){
      if(error){ res.status(422).send(error)}
      res.status(200).send();
    })
  })
}