const MongoDbUtil = require('../../../modules/mongodb/mongodb.module').MongoDbUtil
const chai = require('chai')
const { expect } = chai

describe('MongoDB Util', function () {
  describe('mongodb.util file', function () {
    it('should test our mongodb util file', function () {
      expect(MongoDbUtil).to.be.a('object')
    })

    it('should confirm init function exists', function () {
      expect(MongoDbUtil.init).to.be.a('function')
    })
  })
})
