'use strict'
const chai = require('chai')
const expect = chai.expect
const sinon = require('sinon')
const mongoose = require('mongoose')

const CustomerModule = require('../../../modules/customer/customer.module')()
const CustomerModel = CustomerModule.CustomerModel
const CustomerService = CustomerModule.CustomerService

const Fixtures = require('../../fixtures/fixtures')
const CustomerFixture = Fixtures.CustomerFixture
const ErrorFixture = Fixtures.ErrorFixture

let CustomerModelMock

describe('CustomerService', function () {
  beforeEach(function () {
    CustomerModelMock = sinon.mock(CustomerModel)
  })

  afterEach(function () {
    CustomerModelMock.restore()
    mongoose.models = {}
    mongoose.modelSchemas = {}
    return mongoose.connection.close()
  })

  describe('createCustomer', function () {
    let newCustomer, expectedCreatedCustomer, expectedError

    it('should successfully create new customer', function () {
      newCustomer = CustomerFixture.newCustomer
      expectedCreatedCustomer = CustomerFixture.createdCustomer

      CustomerModelMock.expects('create')
        .withArgs(newCustomer)
        .resolves(expectedCreatedCustomer)

      return CustomerService.createCustomer(newCustomer)
        .then((res) => {
          CustomerModelMock.verify()
          expect(res).to.deep.equal(expectedCreatedCustomer)
        })
    })

    it('should throw error while creating customer', function () {
      expectedError = ErrorFixture.unknownError
      newCustomer = CustomerFixture.newCustomer

      CustomerModelMock.expects('create')
        .withArgs(newCustomer)
        .rejects(expectedError)

      return CustomerService.createCustomer(newCustomer)
        .catch(err => {
          CustomerModelMock.verify()
          expect(err).to.deep.equal(expectedError)
        })
    })
  })
})
