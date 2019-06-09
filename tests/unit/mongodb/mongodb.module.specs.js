const MongoDbModule = require('../../../modules/mongodb/mongodb.module')
const chai = require('chai')
const { expect } = chai

describe('MongoDB Module', function () {
  describe('mongodb.module file', function () {
    it('should test our mongodb module file', function () {
      expect(MongoDbModule).to.be.a('object')
    })

    it('should confirm MongoDBUtil exits', function () {
      expect(MongoDbModule.MongoDbUtil).to.be.a('object')
    })
  })
})
