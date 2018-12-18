var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient
const assert = require('assert')
const { URL, DB_NAME, COLLECTION_NAME } = require('../config.js')
const { 
  insertManyDocuments,
  deleteManyDocuments,
  findDocuments,
  findOneDocument,

} = require('./collectionMethod.js')

const main = async () => {
  const client = new MongoClient(URL, { useNewUrlParser: true })
  try {
    await client.connect()
    console.info("Connected successfully to Server")
    const db = client.db(DB_NAME)
    let result = null 

    router.get('/', function(req, res, next) {
      res.render('index', { title: 'mongodb' })
    });
    router.get('/deleteMany', (req, res) => {
      deleteManyDocuments(db)
        .then(r => console.log('DeleteMany result: ', r.result))
        .catch(err => console.error('DeleteMany result: ', err))
      res.send('delete done')
    })
    router.get('/insertMany', (req, res) => {
      insertManyDocuments(db)
        .then(r => console.log('InsertMany result: ', r.result))
        .catch(err => console.error('InsertMany result: ', err))
      res.send('insert done')
    })
    router.get('/find', (req, res) => {
      findDocuments(db)
        .then(docs => {
          // console.log('find docs: ', docs)
          res.render('list', { items: docs }) 
        })
        .catch(err => {
          console.error('find result: ', err)
          res.end()
        })
    })
    router.get('/:id', (req, res) => {
      const _id = req.params.id
      findOneDocument({db, _id})
        .then(doc => {
          // console.log('find doc: ', doc)
          res.render('show', { item: doc }) 
        })
        .catch(err => {
          console.error('find result: ', err)
          res.end()
        })
    })


  } catch(err) {
    console.error('TryCatch: ', err.stack)
    client.close()
  }
}
main()

module.exports = router;
