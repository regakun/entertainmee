const axios = require('axios')
const moviesUrl = 'http://localhost:4001/movies'
const seriesUrl = 'http://localhost:4002/series'
const Redis = require('ioredis')
const redis = new Redis()

class HybridController{
    constructor() {
    }
    static async index(request, response, next) {
        try {
            let movies = []
            let series = []
            let datas = await Promise.all([redis.get('movies'), redis.get('series')])
            if (datas[0]) {
                movies = JSON.parse(datas[0])
            } else if (!datas[0]) {
                let {data} = await axios.get(moviesUrl)
                redis.set('movies',JSON.stringify(data.data))
                movies = data.data
            }
            if (datas[1]) {
                series = JSON.parse(datas[1])
            } else if (!datas[1]) {
                let {data} = await axios.get(seriesUrl)
                redis.set('series',JSON.stringify(data.data))
                series = data.data
            }
            response.status(200).json({
                movies,
                series
            })
        } catch (error) {
            response.status(400).json(error)
        }
    }
}

module.exports = HybridController