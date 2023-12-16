const fastify = require('fastify')
const express = require('express')
const fs = require('fs')
const app = fastify()
const mysql = require('mysql2')
const cors = require('cors')
const database = require('./database.json')
const jwt = require('jsonwebtoken')
const Auth = require('./Auth')

app.post("/api/v1/login", async(req, res)=>{
    let {username, password} = req.body
    // let key = await jwt.sign({uid: 1, name: 'playtwo'}, 'helloworld', {expiresIn: '3min'})
    let combine = `${username}:${password}`
    let buf = new Buffer(combine).toString('base64')
    let key = jwt.sign(buf, 'hello')
    res.send(key)
})

app.get("/api/v1/decode", async(req, res)=>{
    let token = req.headers.authorization.split(" ")[1];
    let decodeJWT = await jwt.decode(token)
    let decodeBasic = (Buffer.from(decodeJWT, "base64").toString()).split(':')
    let username = decodeBasic[0]
    let password = decodeBasic[1]


    res.send({username: username, password: password})
})

app.get("/api/v1/getBooks", {preHandler: [Auth]} ,async(req, res)=>{
    let logged = req.auth
    res.send(logged)
})

app.listen(3001, 'localhost', ()=>{
    console.log("Server is running on port 3001")
})