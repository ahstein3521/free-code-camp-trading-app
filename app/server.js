const express=require('express');
const path=require('path')
const app=express();

app.use('/',express.static('public'))
app.get('*', function (req, res){
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

app.listen(process.env.PORT || 8080);