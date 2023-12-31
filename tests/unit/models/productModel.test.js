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

  describe('create', () => {
    it("Retorna um erro", () => {
      sinon.stub(db, "query").rejects();
      const result = productModel.create(1);
      chai.expect(result).to.eventually.be.rejected;
    });

    it("Retorna uma lista vazia", () => {
      sinon.stub(db, "query").resolves([[]]);
      const result = productModel.create(1);
      chai.expect(result).to.eventually.be.undefined;
    });

    it('Retorna um id', () => {
      sinon.stub(db, 'query').resolves([[{}]]);
      const result = productModel.create({ name: 'produtoX' });
      chai.expect(result).to.eventually.be.instanceOf(String);
    });
  })

  describe('update', () => {
    it('Retorna um erro', () => {
      sinon.stub(db, 'query').rejects();
      const result = productModel.update(0, {})
      return chai.expect(result).to.be.eventually.rejected;
    });

    // it('Retorna undefined', () => {
    //   sinon.stub(db, 'query').resolves();
    //   const result = productModel.update(0, {})
    //   return chai.expect(result).to.be.eventually.ok;
    // });
  })

  describe('delete', () => {
    it('Retorna um erro', () => {
      sinon.stub(db, 'query').rejects();
      const result = productModel.delete(0);
      return chai.expect(result).to.be.eventually.rejected;
    });
    it('Retorna undefined', () => {
      sinon.stub(db, 'query').resolves();
      const result = productModel.delete(0);
      return chai.expect(result).to.be.eventually.true;
    });
  });

  describe('search', () => {
    it('Retorna um erro', () => {
      sinon.stub(db, 'query').rejects();
      const result = productModel.search('');
      chai.expect(result).to.eventually.be.rejected;
    })
    it('Retorna uma lista', () => {
      sinon.stub(db, 'query').resolves([[{}]]);
      const result = productModel.search('Martelo');
      chai.expect(result).to.eventually.be.deep.equal([{}])
    });
  });
});
