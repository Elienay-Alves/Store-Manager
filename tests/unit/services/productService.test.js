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
});
