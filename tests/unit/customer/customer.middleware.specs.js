'use strict'
const chai = require('chai')
const expect = chai.expect
const sinon = require('sinon')
const httpMocks = require('node-mocks-http')
const bluebird = require('bluebird')
const Promise = bluebird.Promise

const CustomerModule = require('../../../modules/customer/customer.module')()
const CustomerMiddleware = CustomerModule.CustomerMiddleware
const CustomerService = CustomerModule.CustomerService

const Fixture = require('../../fixtures/fixtures')
const CustomerFixture = Fixture.CustomerFixture
const ErrorFixture = Fixture.ErrorFixture

let req, res, next

describe('CustomerMiddleware', function () {
  beforeEach(function () {
    req = httpMocks.createRequest()
    res = httpMocks.createResponse()
    next = sinon.spy()
  })

  describe('addCustomer', function () {
    let createCustomer, createCustomerPromise, expectedCreatedCustomer, expectedError
    beforeEach(function () {
      createCustomer = sinon.stub(CustomerService, 'createCustomer')
      req.body = CustomerFixture.newCustomer
    })

    afterEach(function () {
      createCustomer.restore()
    })

    it('should successfully create a new customer', function () {
      expectedCreatedCustomer = CustomerFixture.createdCustomer
      createCustomerPromise = Promise.resolve(expectedCreatedCustomer)
      createCustomer.withArgs(req.body).returns(createCustomerPromise)

      CustomerMiddleware.addCustomer(req, res, next)
      sinon.assert.callCount(createCustomer, 1)
      return createCustomerPromise.then(() => {
        expect(req.response).to.be.a('object')
        expect(req.response).to.deep.equal(expectedCreatedCustomer)
        sinon.assert.callCount(next, 1)
      })
    })

    it('should throw error while creating the new customer', function () {
      expectedError = ErrorFixture.unknownError
      createCustomerPromise = Promise.reject(expectedError)
      createCustomer.withArgs(req.body).returns(createCustomerPromise)

      CustomerMiddleware.addCustomer(req, res, next)
      sinon.assert.callCount(createCustomer, 1)

      return createCustomerPromise
        .catch(err => {
          expect(err).to.be.a('object')
          expect(err).to.deep.equal(expectedError)
        })
    })
  })
})
