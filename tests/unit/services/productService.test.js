const sinon = require('sinon');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const productModel = require('../../../models/productModel');
const productService = require('../../../services/productService');

chai.use(chaiAsPromised);

describe('services/productServices', () => {
  beforeEach(sinon.restore);

  describe('read', () => {
    it("Retorna um erro", () => {
      sinon.stub(productModel, "read").rejects();
      const result = productService.read();
      chai.expect(result).to.eventually.be.rejected;
    });

    it('Retorna uma lista', () => {
      sinon.stub(productModel, 'read').resolves([{}]);
      const result = productService.read();
      chai.expect(result).to.eventually.be.equal([{}]);
    })
  });
  describe('readId', () => {
    it('Retorna um erro', () => {
      sinon.stub(productModel, 'readId').rejects();
      const result = productService.readId(1);
      chai.expect(result).to.eventually.be.rejected;
    });


    it('Retorna um erro caso nada seja encontrado', () => {
      sinon.stub(productModel, 'readId').resolves(false);
      const result = productService.readId('a');
      chai.expect(result).to.eventually.throw(Error);
    })

    it('Retorna um objeto', async () => {
      const item = {
        "id": 1,
        "name": "Martelo de Thor"
      }
      sinon.stub(productModel, 'readId').resolves(item);
      const result = await productService.readId('1');
      chai.expect(result).to.be.deep.equal(item);
    })
  })

  describe('create', () => {

    const value = {
      name: "Matrix",
    }

    it('Retorna um erro', () => {
      sinon.stub(productModel, 'create').rejects();
      const result = productService.create(value)
      chai.expect(result).to.eventually.be.rejected;
    });

    it('Retorna um id"', () => {
      sinon.stub(productModel, 'create').resolves(1);
      const result = productService.create(value)
      chai.expect(result).to.eventually.equal(1);
    });
  });

  describe('update', () => {
    it('Retorna um erro', () => {
      sinon.stub(productModel, 'update').rejects();
      const result = productService.update(0, {});
      chai.expect(result).to.eventually.be.rejected;
    });
    it('Retorna undefined', () => {
      sinon.stub(productModel, 'update').resolves();
      const result = productService.delete(0, {});
      chai.expect(result).to.eventually.be.undefined;
    });
  });

  describe('delete', () => {
    it('Retorna um erro', () => {
      sinon.stub(productModel, 'delete').rejects();
      const result = productService.delete(0);
      chai.expect(result).to.eventually.be.rejected;
    });
    it('Retorna undefined', () => {
      sinon.stub(productModel, 'delete').resolves();
      const result = productService.delete(0);
      chai.expect(result).to.eventually.be.undefined;
    });
  });
});


