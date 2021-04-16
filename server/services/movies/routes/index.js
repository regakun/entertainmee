const express = require('express')
const router = express.Router()
const MovieController = require('../controllers/movieController')

router.post('/movies', MovieController.create)
router.get('/movies', MovieController.getAll)
router.get('/movies/:id', MovieController.find)
router.put('/movies/:id', MovieController.update)
router.delete('/movies/:id', MovieController.delete)




module.exports = router