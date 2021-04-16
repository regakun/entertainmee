const { connect, getDatabase } = require( '../db/index')
const { ObjectId } = require('mongodb')
const table = 'series'

class Movies {
    static getAll(callback) {
        getDatabase().collection(table).find().toArray()
        .then(data => {
            callback({data , status: 1})
        })
        .catch(err => {
            callback({error: err, status: 0})
        })
    }
    static findOne(id, callback) {
        getDatabase().collection(table).findOne(
            {
                _id: ObjectId(id)
            }
        )
        .then(data => {
            callback({data, status: 1})
        })
        .catch(err => {
            callback({error: err, status: 0})
        })
    }
    static create(data, callback) {
        getDatabase().collection(table).insertOne(data)
        .then(data => {
            callback({data: data.result, status: 1})
        })
        .catch(err => {
            callback({error: err, status: 0})
        })
    }
    static update(id, data, callback) {
        getDatabase().collection(table).updateOne({_id: ObjectId(id)},{$set: data})
        .then(data => {
            callback({data: data.result, status: 1})
        })
        .catch(err => {
            callback({error: err, status: 0})
        })
    }
    static delete(id, callback) {
        getDatabase().collection(table).deleteOne({_id: ObjectId(id)})
        .then(data => {
            callback({data: data.result, status: 1})
        })
        .catch(err => {
            callback({error: err, status: 0})
        })
    }
}

module.exports = Movies