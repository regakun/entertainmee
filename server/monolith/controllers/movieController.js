const Movies = require('../models/movies')

class MovieController{

    static getAll(request, response, next) {
        Movies.getAll(data => {
            if (data.status === 1) {
                response.status(200).json({data: data.data})
            }else{
                next(data.error)
            }
        })
    }
    static find(request, response, next) {
        Movies.findOne(request.params.id,data => {
            if (data.status === 1) {
                response.status(200).json({data: data.data})
            }else{
                next(data.error)
            }
        })
    }
    static create(request, response, next) {
        Movies.create(request.body,data => {
            if (data.status === 1) {
                response.status(201).json({data: data.data})
            }else{
                next(data.error)
            }
        })
    }
    static update(request, response, next) {
        Movies.update(request.params.id, request.body,data => {
            if (data.status === 1) {
                response.status(200).json({data: data.data})
            }else{
                next(data.error)
            }
        })
    }
    static delete(request, response, next) {
        Movies.delete(request.params.id, data => {
            if (data.status === 1) {
                response.status(200).json({data: data.data})
            }else{
                next(data.error)
            }
        })
    }
}

module.exports = MovieController