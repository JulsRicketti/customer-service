(function () {
  'use strict'

  module.exports = {
    addCustomer
  }
})()
const CustomerService = require('./customer.module')().CustomerService

function addCustomer (req, res, next) {
  CustomerService.createCustomer(req.body)
    .then(success)
    .catch(failure)

  function success (data) {
    req.response = data
  }

  function failure (error) {
    next(error)
  }
  next()
}
