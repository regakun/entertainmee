const { MongoClient } = require('mongodb')
require('dotenv').config()

let database = null

const connect = (callback) => {
    const uri = process.env.DATABASE_URI

    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    client.connect()
        .then(_ => {
            database = client.db(process.env.DATABASE_NAME)
            callback(true)
        })
        .catch(err => {
            callback(err)
        })
}

const getDatabase = () => {
    return database
}

module.exports = {
    getDatabase,
    connect
}