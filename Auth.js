const database = require('./database.json')
const jwt = require('jsonwebtoken')

const Auth=(req, res, next)=>{
    if(req.headers.authorization){
        let token = req.headers.authorization.split(" ")[1];
        let decodeJWT = jwt.decode(token)
        let decodeBasic = (Buffer.from(decodeJWT, "base64").toString()).split(':')
        let username = decodeBasic[0]
        let password = decodeBasic[1]
        console.log(username, password)
    
        let user = database.filter((user)=>{
            return username == user.username && password == user.password
        })

        if(user.length > 0){
            req.auth = {logged: true}
        }else{
            req.auth = {logged: false}
        }
    }else{
        req.auth = {authorization: false}
    }

    next()
}

module.exports = Auth