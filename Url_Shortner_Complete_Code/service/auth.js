// Stateful

// const sessionIdToUserMap = new Map();

// function setUser(id,user){
//     sessionIdToUserMap.set(id,user);
// }
// function getUser(id){
//     return sessionIdToUserMap.get(id);
// }

// module.exports = {
//     setUser,
//     getUser
// }

// Stateless
const jwt = require('jsonwebtoken');
const SecretKey = "learning_Nodejs";
function setUser(user){
    return jwt.sign({
        _id:user._id,
        email:user.email,
        role:user.role
    },SecretKey);
    
}
function getUser(token){
    if(!token) return null;
    try {
        return jwt.verify(token,SecretKey);    
    } catch (error) {
        console.log(error);
        return null;
    }
    
}

module.exports = {
    setUser,
    getUser
}
