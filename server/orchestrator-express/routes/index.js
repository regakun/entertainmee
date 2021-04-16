const express = require('express')
const router = express.Router()
const SeriesController = require('../controllers/seriesController')
const MovieController = require('../controllers/movieController')
const Controller = require('../controllers/hybridController')

router.get('/', Controller.index)

router.post('/movie', MovieController.create)
router.get('/movie', MovieController.getAll)
router.get('/movie/:id', MovieController.find)
router.put('/movie/:id', MovieController.update)
router.delete('/movie/:id', MovieController.delete)

router.post('/series', SeriesController.create)
router.get('/series', SeriesController.getAll)
router.get('/series/:id', SeriesController.find)
router.put('/series/:id', SeriesController.update)
router.delete('/series/:id', SeriesController.delete)




module.exports = router