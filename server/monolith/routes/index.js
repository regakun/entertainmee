const express = require('express')
const router = express.Router()
const MovieController = require('../controllers/movieController')
const SeriesController = require('../controllers/seriesController')

router.post('/movies', MovieController.create)
router.get('/movies', MovieController.getAll)
router.get('/movies/:id', MovieController.find)
router.put('/movies/:id', MovieController.update)
router.delete('/movies/:id', MovieController.delete)
router.post('/series', SeriesController.create)
router.get('/series', SeriesController.getAll)
router.get('/series/:id', SeriesController.find)
router.put('/series/:id', SeriesController.update)
router.delete('/series/:id', SeriesController.delete)




module.exports = router