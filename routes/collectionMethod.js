const assert = require('assert')
const ObjectId = require('mongodb').ObjectID
const colName = 'documents'
const state = {
    debag: true,
}
if ( state.debug ) console.info('-- collectionMethod --')

module.exports.deleteManyDocuments = async(db) => {
    const collection = db.collection(colName)
    return await collection.deleteMany({})
}
module.exports.insertManyDocuments = async(db) => {
    const collection = db.collection(colName)
    return await collection.insertMany([
      { name: 'toto',   age: '25', weight: '65', height: '176' },
      { name: 'momo',   age: '27', weight: '50', height: '163' },
      { name: 'koko',   age: '25', weight: '87', height: '189' },
      { name: 'nattou', age: '25', weight: '47', height: '110' },
      { name: 'hotaru', age: '25', weight: '65', height: '179' },
      { name: 'takuma', age: '55', weight: '78', height: '183' },
    ])
  }
  module.exports.findOneDocument = async({db, _id}) => {
    const collection = db.collection(colName)
    return await collection
        .findOne({ _id: ObjectId( _id )})
  }
  
  module.exports.findDocuments = async(db) => {
    const collection = db.collection(colName)
    return await collection
      .find({})
    //   .project({ '_id': 0})
      .limit(100)
      .toArray()
  }
  
  module.exports.searchDocuments = async({ db, findsData }) => {
    const collection = db.collection(colName)
      const value = Object.entries(findsData)[0][1]
      const key   = Object.entries(findsData)[0][0]
      const fixFindsData = {}
      const type = fixFindsData[key] = (value - 0)
      // console.log('NaN or integer: ', type)
      const input = type ? fixFindsData : findsData
    return await collection
          .find(input)
          .project({ '_id': 0})
          .limit(100)
          .toArray()
  }
  module.exports.deleteOneDocument= async({ db, _id }) => {
    const collection = db.collection(colName)
    return await collection.deleteOne({ _id: ObjectId( _id ) })
  }

  module.exports.insertOneDocument= async({ db, itemObj }) => {
    const collection = db.collection(colName)
    return await collection.insertOne( itemObj )
  }

  module.exports.findOneAndUpdateDocument= async({ db, req }) => {
    const collection = db.collection(colName)
    const data = [
      { _id: ObjectId(req.body._id) },
      { $set: {
          name: req.body.name,
          age: req.body.age,
          weight: req.body.weight,
          height: req.body.height
        }
      },
      { returnNewDocument: true }
    ]
    console.log('findOneAndUpdateDocument data: ', data)
    return await collection.findOneAndUpdate( ...data )
  }
