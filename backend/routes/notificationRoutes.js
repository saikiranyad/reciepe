const express= require('express')
const getNotification = require('../controller/notificationController')
const { authmiddleware } = require('../middlewares/authMiddleware')


const notificationrouter = express.Router()

notificationrouter.get('/notifications',authmiddleware,getNotification)

module.exports = notificationrouter