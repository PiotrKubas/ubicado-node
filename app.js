require('dotenv/config')
const express = require('express')
const port = process.env.PORT || 3000
const app = express()
const authRoute = require('./routes/auth')

app.use('/user', authRoute)





const mongoClient = require('mongodb').MongoClient;

mongoClient.connect(process.env.DB_CONNECTION, { useNewUrlParser: true}, (error,client) => {
    if(error){
        console.log('Failed')
    }
    else console.log('Success')

    const db = client.db('ubicado')
  

    
    /*    db.collection('users').insertOne({
            name: 'Henio2'
        }, (error,result) =>{
            if(error) console.log('Adding failed', error)
            console.log(result.ops)
        })*/
    app.get('/users', (req,res) => {
        db.collection('users').find({}).toArray((error,result) => {
            res.send({users: result})
        })
    })
        
})

app.listen(port)









