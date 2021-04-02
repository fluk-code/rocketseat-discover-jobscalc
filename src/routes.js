const express = require('express')
const routes = express.Router()
const ProfileController = require('./controllers/ProfileController')
const JobController = require('./controllers/JobController')
const DashBoardController = require('./controllers/DashBoardController')

// Routs Get
routes.get('/', DashBoardController.index)
routes.get('/job', JobController.create)
routes.get('/job/:id', JobController.show)
routes.get('/profile', ProfileController.index)

// Routs Post
routes.post('/job', JobController.save)
routes.post('/profile', ProfileController.update)
routes.post('/job/:id', JobController.update)

// Routs Delete
routes.post('/job/delete/:id', JobController.delete)

module.exports = routes