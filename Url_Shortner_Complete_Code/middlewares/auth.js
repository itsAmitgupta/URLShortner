const { getUser } = require("../service/auth");

// async function restrictToLoggedInUserOnly(req, res, next) {
//   const userUid = req.cookies?.uid;
//   // console.log(req.cookies)
//   if (!userUid) return res.redirect("login");

//   const user = getUser(userUid);
//   // console.log(user)
//   if (!user) return res.redirect("/login");

//   req.user = user;

//   next();
// }

// async function checkAuth(req, res, next) {
//   const userUid = req.cookies?.uid;
//   console.log("userid:", userUid);
//   const user = getUser(userUid);
//   console.log("user:", user);
//   req.user = user;
//   next();
// }

function checkForAuthentication(req, res, next) {
  const tokenCookie = req.cookies?.token;
  req.user = null;
  if (!tokenCookie) return next();

  const token = tokenCookie;
  const user = getUser(token);
  req.user = user;
  return next();
}

function restrictTo(roles){
  return function(req,res,next){
    if(!req.user) return res.redirect("/login")
      if(!roles.includes(req.user.role)) return res.end("<h1>You are unauthorized<h1>")
    
       return next();
      }
}
// module.exports = { restrictToLoggedInUserOnly, checkAuth };

module.exports={checkForAuthentication,restrictTo}