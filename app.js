const express = require('express')
const port = process.env.PORT || 3000
const mongoClient = require('mongodb').MongoClient

const url = "mongodb+srv://admin:bxzPfHKYklnE1XQS@cluster0.nvx90.mongodb.net/Cluster0?retryWrites=true&w=majority"




const app = express()

app.get('/', (req,res) => {
    mongoClient.connect(url, {}, (error, client) =>{
        if(error){
            res.send(error)
        }
        else res.send('Connected to DB')
    
    } )
    
})

app.listen(port)