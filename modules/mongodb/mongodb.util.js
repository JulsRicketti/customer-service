const mongoose = require('mongoose')
const mongoDbConfig = require('../../config/mongodb.config.json');

(function () {
  'use strict'
  module.exports = {
    init
  }
})()

function init () {
  const options = {
    promiseLibrary: require('bluebird'),
    useNewUrlParser: true
  }

  const connectionString = prepareConnectionString(mongoDbConfig.mongodb)

  mongoose.connect(connectionString, options)
    .then((result) => {
      console.log('MongoDB connection successful. DB:', connectionString)
    })
    .catch(err => {
      console.log(`Error when connecting to Mongo DB of connection string ${connectionString}`, err)
    })
}

function prepareConnectionString (config) {
  let connectionString = 'mongodb://'
  if (config.user) {
    connectionString += config.user + ':' + config.password + '@'
  }

  connectionString += config.server + '/' + config.database

  return connectionString
}
