const apis = require('express').Router()

apis.use('/jwt', require('./auth'))


module.exports = apis
