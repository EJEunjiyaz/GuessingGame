'use strict';
const express = require('express');
const cors = require("cors");
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'guessingGame';
// Create a new MongoClient
const client = new MongoClient(url);

// Constants
const PORT = 8000;
const HOST = '127.0.0.1';

// App
const app = express();
const pug = require('pug');
app.set('view engine', 'pug')

// Use connect method to connect to the Server
client.connect(function(err) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);
  const col = db.collection('word');

  app.get('/', (req, res) => {
    // Get first two documents that match the query
    col.find({}).limit(1).toArray(function(err, docs) {
      assert.equal(null, err);
      res.send(JSON.stringify(docs));
      // client.close();
    });
  });

  app.get('/index', (req, res) => {
    res.render('index')
  })

  app.post('/submit', async (req, res) => {
    if (data == null) {
      const data = { word: req.body.word }
    }
    col.insertOne( data )
    await data
  })
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
