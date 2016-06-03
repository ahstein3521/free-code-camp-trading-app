var bodyParser = require('body-parser');
var cors=require('cors');
var passport=require('passport');
var mongoose = require('mongoose');
var app=require('express')();
var session=require('express-session');

// DB Setup
mongoose.connect('mongodb://localhost:records/records');

app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));
app.use(bodyParser.urlencoded({extended:false}));


var port=process.env.PORT||3000;

require('./routes/user')(app)
require('./routes/albums')(app)
require('./routes/auth')(app)

app.listen(port);

console.log(`Connected to ${port}`)