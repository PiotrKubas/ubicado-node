require('dotenv/config')
const express = require('express')
const port = process.env.PORT || 3000
const app = express()
const authRoute = require('./routes/auth')
const profileRoute = require('./routes/profile')
<<<<<<< HEAD
=======
const meetingRoute = require('./routes/meeting')
>>>>>>> 8838a908acb294ba4237d43b16a6ccc4ecb5ae26
const mongoose = require('mongoose')

//const mongoClient = require('mongodb').MongoClient;

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true}, () => {
          console.log('Connected to db')
})


app.use(express.json())

app.use('/user', authRoute)
app.use('/profile', profileRoute)
<<<<<<< HEAD
=======
app.use('/meeting', meetingRoute)
>>>>>>> 8838a908acb294ba4237d43b16a6ccc4ecb5ae26

app.listen(port)









