const apis = require('express').Router()

apis.use('/jwt', require('./auth'))
//apis.use('/categories', require('./categories'))


module.exports = apis
