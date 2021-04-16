const axios = require('axios')
const baseUrl = 'http://localhost:4001/'
const Redis = require('ioredis')
const redis = new Redis()

class MovieController{

    static getAll(request, response, next) {
        try {
            redis.get('movies')
            .then(data => {
                if (!data) {
                    axios.get(baseUrl+'movies')
                    .then(({data}) => {
                        redis.set('movies',JSON.stringify(data.data))
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
            axios.get(baseUrl+'movies/'+request.params.id)
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
            axios.post(baseUrl+'movies/',request.body)
            .then(({data}) => {
                redis.del('movies')
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
                url: baseUrl+'movies/'+request.params.id,
                data: request.body
            })
            .then(({data}) => {
                redis.del('movies')
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
            axios.delete(baseUrl+'movies/'+request.params.id)
            .then(({data}) => {
                redis.del('movies')
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

module.exports = MovieController