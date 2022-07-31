const sinon = require('sinon');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const db = require('../../../models/db');
const productModel = require('../../../models/productModel');

chai.use(chaiAsPromised);

describe('/model/productModels', () => {
  beforeEach(sinon.restore);

  describe('read', () => {
    it('Retorna um erro', () => {
      sinon.stub(db, 'query').rejects();
      const result = productModel.read();
      chai.expect(result).to.eventually.be.rejected;
    })

    it('Não retorna nada', () => {
      sinon.stub(db, 'query').resolves([[]]);
      const result = productModel.read();
      chai.expect(result).to.eventually.be.undefined;
    });

    it('Retorna uma lista', () => {
      sinon.stub(db, 'query').resolves([[{}]]);
      const result = productModel.read();
    chai.expect(result).to.eventually.be.deep.equal({});
    });
  });

  describe('readId', () => {
    it('Retorna um erro', () => {
      sinon.stub(db, 'query').rejects();
      const result = productModel.readId(1);
      chai.expect(result).to.eventually.be.rejected;
    });

    it('Não retorna nada', () => {
      sinon.stub(db, 'query').resolves([[]]);
      const result = productModel.readId(1);
      chai.expect(result).to.eventually.be.undefined;
    })

    it('Retorna um objeto', () => {
      sinon.stub(db, 'query').resolves([[{}]]);
      const result = productModel.readId('1');
      chai.expect(result).to.eventually.be.instanceOf(Object);
    });
  });
});
