require('dotenv').config()
const axios = require('axios')
const baseUrl = process.env.SERIES_SERVER
const Redis = require('ioredis')
const redisConnection = {
    port: process.env.REDIS_PORT,          // Redis port
    host: process.env.REDIS_HOST,   // Redis host
    family: process.env.REDIS_FAMILY,           // 4(IPv4) or 6(IPv6)
    password: process.env.REDIS_PASSWORD
}
const redis = (process.env.IS_REDIS_DEFAULT) ? new Redis() : new Redis(redisConnection)

class SeriesController{

    static getAll(request, response, next) {
        try {
            redis.get('series')
            .then(data => {
                if (!data) {
                    axios.get(baseUrl+'series')
                    .then(({data}) => {
                        redis.set('series',JSON.stringify(data.data))
                        response.status(200).json(data.data)
                    })
                    .catch(err => {
                        throw err
                    })
                }else{
                    response.status(200).json(JSON.parse(data))
                }
            })
            .catch(err => {
                throw(err)
            })
        } catch (error) {
            response.status(400).json(error)
        }
    }
    static find(request, response, next) {
        try{
            axios.get(baseUrl+'series/'+request.params.id)
            .then(({data}) => {
                response.status(200).json({data: data.data})
            })
            .catch(err => {
                throw err
            })
        } catch (error) {
            response.status(400).json(error)
        }
    }
    static create(request, response, next) {
        try {
            axios.post(baseUrl+'series/',request.body)
            .then(({data}) => {
                redis.del('series')
                response.status(201).json({status: 1})
            })
            .catch(err => {
                throw(err)
            })
        } catch (error) {
            response.status(400).json(error)
        }
    }
    static update(request, response, next) {
        try {
            axios({
                method: 'put',
                url: baseUrl+'series/'+request.params.id,
                data: request.body
            })
            .then(({data}) => {
                redis.del('series')
                response.status(200).json({status: 1})
            })
            .catch(err => {
                throw(err)
            })
        } catch (error) {
            response.status(400).json(error)
        }
    }
    static delete(request, response, next) {
        try {
            axios.delete(baseUrl+'series/'+request.params.id)
            .then(({data}) => {
                redis.del('series')
                response.status(200).json({status: 1})
            })
            .catch(err => {
                throw(err)
            })
        } catch (error) {
            response.status(400).json(error)
        }
    }
}

module.exports = SeriesController