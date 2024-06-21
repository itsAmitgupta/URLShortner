const express = require('express');
const URL = require('../Models/url.models');
const { restrictTo } = require('../middlewares/auth');
const router = express.Router();

router.get('/admin',restrictTo(["Admin"]),async(req,res)=>{
    console.log("static: ",req.user)
    // if(!req.user) return res.redirect('/login')
    const allUrls = await URL.find({});
    return res.render('home',{
        urls:allUrls
    })
})

router.get('/',restrictTo(["Normal","Admin"]),async(req,res)=>{
    console.log("static: ",req.user)
    // if(!req.user) return res.redirect('/login')
    const allUrls = await URL.find({createdBy:req.user._id});
    return res.render('home',{
        urls:allUrls
    })
})

router.get('/signup',(req,res)=>{
    res.render("signup")
})

router.get('/login',(req,res)=>{
    res.render("login")
})
module.exports = router;