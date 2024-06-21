const express = require("express");
const app = express();
const cookieParser = require('cookie-parser')
// const {restrictToLoggedInUserOnly , checkAuth} = require('./middlewares/auth')
const {checkForAuthentication,restrictTo} = require('./middlewares/auth')
const urlController = require('./Controllers/url.controller')
const urlroute = require('./routes/url.routes');
const userroute = require('./routes/user')
const staticRouter = require('./routes/staticRouter')
const connect = require('./connect');
const ejs = require('ejs');
const path = require('path');


app.set('view engine','ejs');
app.set('views',path.resolve('./views'));

app.get('/home',(req,res)=>{
    res.render('home');
})

const PORT = 3000;

connect('mongodb://localhost:27017/short-url')
.then(()=>{
    console.log("MongoDb Connected");
}).catch((err)=>{
    console.error(err);
})

app.use(express.json()) // middleware - use to parse the incoming json
app.use(express.urlencoded({extended:false})); // use to parse form data
app.use(cookieParser())

app.use(checkForAuthentication);
app.use('/url', restrictTo(["Normal","Admin"]),urlroute);
app.use('/user',userroute);
app.use('/',staticRouter);


// app.use('/url', restrictToLoggedInUserOnly,urlroute);
// app.use('/user',userroute);
// app.use('/',checkAuth,staticRouter);
app.use('/geturl/:shortId',urlController.getShortUrl)
app.listen(PORT,()=>{
    console.log("App is listening on PORT",`http://localhost:${PORT}`);
})