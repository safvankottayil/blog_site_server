const express=require('express')
const cors=require('cors')
const env=require('dotenv').config()
const app=express()
const mongodb=require('./config/mongodb')
const options={
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
  }
  app.use(express.json())
app.use(cors(options))
const userRouter=require('./router/userRouter')
app.use('/',userRouter)
app.listen(3000,()=>{
    console.log('server running');
})
