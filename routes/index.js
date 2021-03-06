var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient
const { URL, DB_NAME } = require('../config.js')
const { 
  insertManyDocuments,
  deleteManyDocuments,
  findDocuments,
  findOneDocument,
  insertOneDocument,
  deleteOneDocument,
  findOneAndUpdateDocument,
} = require('./collectionMethod.js')

const main = async () => {
  const client = new MongoClient(process.env.MONGODB_URI || URL, { useNewUrlParser: true })
  try {
    await client.connect()
    console.info("Connected successfully to Server")
    const db = client.db(process.env.DB_NAME || DB_NAME)

    router.get('/', function(req, res, next) {
      res.render('index', { title: 'Express mongodb' })
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
    router.get('/new', (req, res) => {
      res.render('new')
    })
    router.get('/find', (req, res) => {
      findDocuments(db)
        .then(docs => {
          // console.log('find docs: ', docs)
          res.render('list', { items: docs }) 
        })
        .catch(err => {
          console.error('find error: ', err)
          res.end()
        })
    })

    router.post('/create', (req, res) => {
      const itemObj = {
        name: req.body.name,
        age: req.body.age,
        weight: req.body.weight,
        height: req.body.height,
      }
      insertOneDocument({ db, itemObj })
        .then(r => {
          console.log('insertOne result: ', r.result)
          res.redirect('/find')
        })
        .catch(err => {
          console.error('InsertOne result error: ', err)
          res.end()
        })
    })

    router.get('/items/:id/edit', (req, res) => {
      const _id = req.params.id
      findOneDocument({db, _id})
        .then(doc => {
          console.log('->edit doc: ', doc)
          res.render('edit', { item: doc }) 
        })
        .catch(err => {
          console.error('edit error: ', err)
          res.end()
        })
    })

    router.put('/items/:id', (req, res) => {
      if (req.body._id !== req.params.id) {
        next(new Error('not match id'))
      } else {
        findOneAndUpdateDocument({db, req})
          .then(r => {
            console.log('findOneAndUpdate result: ', r.result)
            res.redirect('/find')
          })
          .catch(err => {
            console.error('findOneAndUpdate result: ', err)
            res.end()
          })
      }
    })

    router.delete('/items/:id', (req, res) => {
      if (req.body._id !== req.params.id) {
        next(new Error('not match id'))
      } else {
        const _id = req.body._id
        deleteOneDocument({db, _id})
          .then(r => {
            console.log('DeleteOne result: ', r.result)
            res.redirect('/find')
          })
          .catch(err => console.error('DeleteOne result: ', err))
        }
    })

    router.get('/items/:id', (req, res) => {
      const _id = req.params.id
      findOneDocument({db, _id})
        .then(doc => {
          console.log('/:id doc: ', doc)
          res.render('show', { item: doc }) 
        })
        .catch(err => {
          console.error('/:id catch: ', err)
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
