
require('dotenv').config()

const cors = require("cors")
const express = require('express')
const app = express()
const { connect, getDatabase } = require( './db/index')
const router = require('./routes/index.js')
// var bodyParser = require('body-parser');


const port = process.env.port || 4001

connect((connect) => {
    if (connect) {
       console.log('we are in!')
    }else{
       console.log(connect,'error')
    }
})


// app.use(cors())
// app.use(express.urlencoded({ extended: true }))
// app.use(express.json())
var options = {
    // inflate: true,
    // limit: '100kb',
    // type: 'application/octet-stream'
  };
// app.use(bodyParser.raw(options));
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use('/', router)
// app.use(errHandler)

app.listen(port, () => {
   console.log(`Server is listening on ${port}`)
})