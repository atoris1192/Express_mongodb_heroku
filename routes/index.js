var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient
const assert = require('assert')

const url = 'mongodb://localhost:27017/myproject'
const dbName = 'myproject'
const client = new MongoClient(url)
const { 
  insertManyDocuments,
  deleteManyDocuments,
  findDocuments,

} = require('./collectionMethod.js')

client.connect( err => {
    assert.equal(null, err)
    console.log("Connected successfully to Server")
    const db = client.db(dbName)
  /* GET home page. */
  router.get('/', function(req, res, next) {
    res.render('index', { title: 'mongodb' })
  });
  router.get('/deleteMany', (req, res) => {
    console.log(req.query)
    deleteManyDocuments(db, result => {
      console.log(result.result)
    })
    res.send('delete done')
  })
  router.get('/insertMany', (req, res) => {
    console.log(req.query)
    insertManyDocuments(db, result => {
      console.log(result.result)
    })
    res.send('insert done')
  })
  router.get('/find', (req, res) => {
    console.log(req.query);
    findDocuments(db, docs => {
      console.log(docs)
    })
    
  })
})

module.exports = router;
