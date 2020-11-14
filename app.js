const express = require('express')
const port = process.env.PORT || 3000

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:bxzPfHKYklnE1XQS@cluster0.nvx90.mongodb.net/ubicado?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("ubicado").collection("users").get();
  // perform actions on the collection object
  client.close();
});



const app = express()

app.get('/', (req,res) => {

        client.connect(err => {
            const collection = client.db("ubicado").collection("users").get();
            res.send(collection)
            client.close();
      });
      
    
    
})

app.listen(port)