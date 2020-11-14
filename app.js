const express = require('express')
const port = process.env.PORT || 3000

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:bxzPfHKYklnE1XQS@cluster0.nvx90.mongodb.net/Cluster0?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});



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