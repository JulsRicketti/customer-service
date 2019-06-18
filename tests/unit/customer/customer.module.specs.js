const chai = require('chai')
const { expect } = chai
const CustomerModule = require('../../../modules/customer/customer.module')
const CustomerController = require('../../../modules/customer/customer.controller')

describe('customer.module file', function () {
  it('should confirm CustomerModule function exists', function () {
    expect(CustomerModule).to.be.a('function')
  })

  it('should confirm CustomerModule function returns an object', function () {
    expect(CustomerModule()).to.be.a('object')
  })

  it('should confirm CustomerController is a function', function () {
    expect(CustomerController).to.be.a('function')
  })

  it('should confirm CustomerMiddleware object exists', function () {
    expect(CustomerModule().CustomerMiddleware).to.be.a('object')
  })

  it('should confirm CustomerService object exists', function () {
    expect(CustomerModule().CustomerService).to.be.a('object')
  })

  it('should confirm CustomerModel function exists', function () {
    expect(CustomerModule().CustomerModel).to.be.a('function')
  })
})
