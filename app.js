const express = require('express')
const port = process.env.PORT || 3000

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:bxzPfHKYklnE1XQS@cluster0.nvx90.mongodb.net/ubicado?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });




const app = express()

app.get('/', async (req,res) => {

        client.connect(err => {
            await client.db("ubicado").collection("users").add({
                name: 'Jony'
            })
            res.send("Inserted")
            client.close()
      });
      
    
    
})

app.listen(port)