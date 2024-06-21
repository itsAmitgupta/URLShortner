//statefull auth

// const User = require("../Models/user.models");
// const {v4: uuidv4} = require('uuid')
// const {setUser} = require('../service/auth');

// async function handleUserSignup(req,res){
//     const {name,email,password}= req.body;

//     const user = await User.create(
//         {name,
//         email,
//         password
//     }
//     )

//     return res.redirect("/");
// }

// async function handleUserlogin(req,res){
//     const {email,password}= req.body;

//     const user = await User.findOne(
//         {email,password}
//     )

//     if(!user) {
//         res.render("login",{
//             error:"Invalid email or password"
//         })
//     }
//     const sessionId = uuidv4();
//     setUser(sessionId,user);
//     res.cookie("uid",sessionId)
//    return res.redirect("/");
// }


// module.exports ={handleUserSignup, handleUserlogin};

//StateLess Auth
const User = require("../Models/user.models");
const {v4: uuidv4} = require('uuid')
const {setUser} = require('../service/auth');

async function handleUserSignup(req,res){
    const {name,email,password}= req.body;

    const user = await User.create(
        {name,
        email,
        password
    }
    )

    return res.redirect("/");
}

async function handleUserlogin(req,res){
    const {email,password}= req.body;

    const user = await User.findOne(
        {email,password}
    )

    if(!user) {
        res.render("login",{
            error:"Invalid email or password"
        })
    }
    const token = setUser(user);
    res.cookie("token",token);
    return res.redirect("/");
}


module.exports ={handleUserSignup, handleUserlogin};