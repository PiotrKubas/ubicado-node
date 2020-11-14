const express = require('express')
const port = process.env.PORT || 3000


const app = express()

app.get('/', (req,res) => {
    res.send('kiedy idziemy na drwala?')
})

app.listen(port)