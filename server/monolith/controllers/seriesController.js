const Series = require('../models/series')

class SeriesController{

    static getAll(request, response, next) {
        Series.getAll(data => {
            if (data.status === 1) {
                response.status(200).json({data: data.data})
            }else{
                // next(data.error)
                console.log(data.error)
            }
        })
    }
    static find(request, response, next) {
        Series.findOne(request.params.id,data => {
            if (data.status === 1) {
                response.status(200).json({data: data.data})
            }else{
                // next(data.error)
                console.log(data.error)
            }
        })
    }
    static create(request, response, next) {
        Series.create(request.body,data => {
            if (data.status === 1) {
                response.status(201).json({data: data.data})
            }else{
                console.log(data.error)
            }
        })
    }
    static update(request, response, next) {
        Series.update(request.params.id, request.body,data => {
            if (data.status === 1) {
                response.status(200).json({data: data.data})
            }else{
                console.log(data.error)
            }
        })
    }
    static delete(request, response, next) {
        Series.delete(request.params.id, data => {
            if (data.status === 1) {
                response.status(200).json({data: data.data})
            }else{
                console.log(data.error)
            }
        })
    }
}

module.exports = SeriesController