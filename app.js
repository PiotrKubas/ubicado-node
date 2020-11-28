require('dotenv/config')
const express = require('express')
const port = process.env.PORT || 3000
const app = express()
const authRoute = require('./routes/auth')
const profileRoute = require('./routes/profile')
const mongoose = require('mongoose')

//const mongoClient = require('mongodb').MongoClient;

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true}, () => {
          console.log('Connected to db')
})


app.use(express.json())

app.use('/user', authRoute)
app.use('/profile', profileRoute)

app.listen(port)









