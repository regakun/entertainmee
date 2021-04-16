const { MongoClient } = require('mongodb')

let database = null

const connect = (callback) => {
    const uri = 'mongodb://127.0.0.1:27017'

    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    client.connect()
        .then(_ => {
            database = client.db('entertainme')
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