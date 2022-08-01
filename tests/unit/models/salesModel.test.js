const sinon = require('sinon');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const db = require('../../../models/db');
const saleModel = require('../../../models/salesModel');

chai.use(chaiAsPromised);

describe('/model/saleModels', () => {
  beforeEach(sinon.restore);

  describe('read', () => {
    it('Retorna um erro', () => {
      sinon.stub(db, 'query').rejects();
      const result = saleModel.read();
      chai.expect(result).to.eventually.be.rejected;
    })


    it('Retorna uma lista', () => {
      sinon.stub(db, 'query').resolves([[{}]]);
      const result = saleModel.read();
      chai.expect(result).to.eventually.be.equal({});
    });
  });

  describe('readId', () => {
    it('Retorna um erro', () => {
      sinon.stub(db, 'query').rejects();
      const result = saleModel.readId(1);
      chai.expect(result).to.eventually.be.rejected;
    });

    it('Não retorna nada', () => {
      sinon.stub(db, 'query').resolves([[]]);
      const result = saleModel.readId(1);
      chai.expect(result).to.eventually.be.undefined;
    })

    it('Retorna um objeto', () => {
      sinon.stub(db, 'query').resolves([[{}]]);
      const result = saleModel.readId('1');
      chai.expect(result).to.eventually.be.equal([{}]);
    });
  });

  describe('create', () => {
    it("Retorna um erro", () => {
      sinon.stub(db, "query").rejects();
      const result = saleModel.create(1);
      chai.expect(result).to.eventually.be.rejected;
    });

    it("Retorna uma lista vazia", () => {
      sinon.stub(db, "query").resolves([[]]);
      const result = saleModel.create(1);
      chai.expect(result).to.eventually.be.undefined;
    });

    it('Retorna um id', () => {
      sinon.stub(db, 'query').resolves([[{}]]);
      const result = saleModel.create({ name: 'produtoX' });
      chai.expect(result).to.eventually.be.instanceOf(String);
    });
  })

  describe('update', () => {
    it('Retorna um erro', () => {
      sinon.stub(db, 'query').rejects();
      const result = saleModel.update(0, {})
      return chai.expect(result).to.be.eventually.rejected;
    })
  });

  describe('delete', () => {
    it('Retorna um erro', () => {
      sinon.stub(db, 'query').rejects();
      const result = saleModel.delete(0);
      return chai.expect(result).to.be.eventually.rejected;
    });
    it('Retorna undefined', () => {
      sinon.stub(db, 'query').resolves();
      const result = saleModel.delete(0);
      return chai.expect(result).to.be.eventually.true;
    });
  });
});
