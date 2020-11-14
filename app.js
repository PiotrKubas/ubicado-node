const express = require('express')
const port = process.env.PORT || 3000
const mongoClient = require('mongodb').MongoClient

const url = process.env.MONGODB_URI

mongoClient.connect(url, {}, (error, client) =>{
    if(error){
        console.log(error)
    }
    else console.log('Connected to DB')

} )

const app = express()

app.get('/', (req,res) => {
    res.send('tak tak byczku?')
})

app.listen(port)