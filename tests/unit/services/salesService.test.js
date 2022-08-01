const sinon = require('sinon');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const saleModel = require('../../../models/salesModel');
const saleService = require('../../../services/salesService');

chai.use(chaiAsPromised);

describe('services/salesServices', () => {
  beforeEach(sinon.restore);

  describe('read', () => {
    it("Retorna um erro", () => {
      sinon.stub(saleModel, "read").rejects();
      const result = saleService.read();
      chai.expect(result).to.eventually.be.rejected;
    });

    it('Retorna uma lista', () => {
      sinon.stub(saleModel, 'read').resolves([{}]);
      const result = saleService.read();
      chai.expect(result).to.eventually.be.equal([{}]);
    })
  });
  describe('readId', () => {
    it('Retorna um erro', () => {
      sinon.stub(saleModel, 'readId').rejects();
      const result = saleService.readId(1);
      chai.expect(result).to.eventually.be.rejected;
    });


    it('Retorna um erro caso nada seja encontrado', () => {
      sinon.stub(saleModel, 'readId').resolves(false);
      const result = saleService.readId('a');
      chai.expect(result).to.eventually.throw(Error);
    })

    it('Retorna um objeto', async () => {
      const item = {
        "id": 1,
        "name": "Martelo de Thor"
      }
      sinon.stub(saleModel, 'readId').resolves(item);
      const result = await saleService.readId('1');
      chai.expect(result).to.be.deep.equal(item);
    })
  })

  describe('update', () => {
    it('Retorna um erro', () => {
      sinon.stub(saleModel, 'update').rejects();
      const result = saleService.update(0, {});
      chai.expect(result).to.eventually.be.rejected;
    });
    it('Retorna undefined', () => {
      sinon.stub(saleModel, 'update').resolves();
      const result = saleService.delete(0, {});
      chai.expect(result).to.eventually.be.undefined;
    });
  });

  describe('delete', () => {
    it('Retorna um erro', () => {
      sinon.stub(saleModel, 'delete').rejects();
      const result = saleService.delete(0);
      chai.expect(result).to.eventually.be.rejected;
    });
    it('Retorna undefined', () => {
      sinon.stub(saleModel, 'delete').resolves();
      const result = saleService.delete(0);
      chai.expect(result).to.eventually.be.undefined;
    });
  });
});


