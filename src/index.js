const express = require('express')
const app = express()
const mongoose = require('mongoose')
const route = require('./Router/router')


app.use(express.json())



mongoose.connect("mongodb://localhost:27017/Contacts", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )



app.use('/', route)


app.listen(3000, ()=>{
    console.log(`Port running on 3000....`)
})