require('dotenv/config')
const express = require('express')
const port = process.env.PORT || 3000
const app = express()
const authRoute = require('./routes/auth')

const mongoClient = require('mongodb').MongoClient;

mongoClient.connect(process.env.DB_CONNECTION, { useNewUrlParser: true}, (error,client) => {
          console.log('Connected to db')
})


app.use(express.json())

app.use('/user', authRoute)

app.listen(port)









