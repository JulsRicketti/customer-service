
(function () {
  'use strict'
  module.exports = {
    createCustomer: createCustomer
  }
})()

const CustomerModel = require('./customer.model')

function createCustomer (customer) {
  return CustomerModel.create(customer)
}
