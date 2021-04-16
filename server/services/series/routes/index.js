const express = require('express')
const router = express.Router()
const SeriesController = require('../controllers/seriesController')

router.post('/series', SeriesController.create)
router.get('/series', SeriesController.getAll)
router.get('/series/:id', SeriesController.find)
router.put('/series/:id', SeriesController.update)
router.delete('/series/:id', SeriesController.delete)




module.exports = router