var Albums=require('../models/album');
var Users=require('../models/user');

module.exports=function(app){

	app.get('/albums',function(req,res){
  		// Albums.remove({},function(err){if(err){return}})
      Albums.find({},function(error,data){
  			if(error){
        		return res.json({error:error})
      		}	
  			return res.json({results:data})
  		})
  	})
  	app.post('/albums',function(req,res){
    	const body=req.body

          Albums.create(body,function(error,data){
           	if(error){
           		return res.json({error:error})
           	}
           return res.json({Added: data}) 
        })
    })
    app.put('/albums/:title',function(req,res){

      Albums.findOneAndUpdate({album:req.params.title},req.body,function(e,d){
        if(e){return res.status(422)}
      res.json(d)
      })    
    })

    app.delete('/albums/:title',function(req,res){

      Albums.remove({album:req.params.title},function(err){
        if(err){
          return res.status(500);
        }
        return res.status(200)
      })

    })  
}