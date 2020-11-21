const express = require('express')
const port = process.env.PORT || 3000
const app = express()

const mongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:bxzPfHKYklnE1XQS@cluster0.nvx90.mongodb.net/ubicado?retryWrites=true&w=majority";

mongoClient.connect(uri, {}, (error,client) => {
    if(error){
        console.log('Failed')
    }
    else console.log('Success')

    const db = client.db('ubicado')
  

    
        db.collection('users').insertOne({
            name: 'Henio2'
        }, (error,result) =>{
            if(error) console.log('Adding failed', error)
            console.log(result.ops)
        })
    app.get('/', (req,res) => {
        db.collection('users').find({}).toArray((error,result) => {
            console.log(result)
        })
    })
        
    
    

})










