var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient
const assert = require('assert')
// const { URL, DB_NAME, COLLECTION_NAME } = require('../config.js')

const data = {
  URL             : 'mongodb://localhost:27017/myproject',
  DB_NAME         : 'myproject',
  COLLECTION_NAME : 'documents',
}
// const client = new MongoClient(data.URL, { useNewUrlParser: true })
const { 
  insertManyDocuments,
  deleteManyDocuments,
  findDocuments,

} = require('./collectionMethod.js')

const main = async () => {
  const client = new MongoClient(data.URL, { useNewUrlParser: true })
  try {
    await client.connect()
    console.info("Connected successfully to Server")
    const db = client.db(data.DB_NAME)
    let r 

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
      console.log('InsertMany: ', r)
      res.send('insert done')
    })
    router.get('/find', (req, res) => {
      findDocuments(db)
        .then(docs => console.log('docs: ', docs))
        .catch(err => console.error(err))
      res.end()
    })


  } catch(err) {
    console.error(err.stack)
    client.close()
  }
}

main()

// client.connect( err => {
//     assert.equal(null, err)
//     console.log("Connected successfully to Server")
//     const db = client.db(data.DB_NAME)
//   /* GET home page. */
//   router.get('/', function(req, res, next) {
//     res.render('index', { title: 'mongodb' })
//   });
//   router.get('/deleteMany', (req, res) => {
//     console.log(req.query)
//     deleteManyDocuments(db, result => {
//       console.log(result.result)
//     })
//     res.send('delete done')
//   })
//   router.get('/insertMany', (req, res) => {
//     console.log(req.query)
//     insertManyDocuments(db, result => {
//       console.log(result.result)
//     })
//     res.send('insert done')
//   })
//   router.get('/find', (req, res) => {
//     console.log(req.query);
//     findDocuments(db, docs => {
//       console.log(docs)
//     })
    
//   })
// })

module.exports = router;
