require('dotenv/config')
const express = require('express')
const port = process.env.PORT || 3000
const app = express()
const authRoute = require('./routes/auth')

app.use('/user', authRoute)





const mongoClient = require('mongodb').MongoClient;

mongoClient.connect(process.env.DB_CONNECTION, { useNewUrlParser: true}, (error,client) => {

        
})

app.listen(port)









