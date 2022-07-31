const sinon = require('sinon');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const productModel = require('../../../models/productModel');
const productService = require('../../../services/productService');

chai.use(chaiAsPromised);

describe('services/productServices', () => {
  beforeEach(sinon.restore);

  describe('list', () => {
    it("Retorna um erro", () => {
      sinon.stub(productModel, "list").rejects();
      const result = productService.list();
      chai.expect(result).to.eventually.be.rejected;
    });

    it('Retorna uma lista', () => {
      sinon.stub(productModel, 'list').resolves([{}]);
      const result = productService.list();
      chai.expect(result).to.eventually.be.equal([{}]);
    })
  });
  describe('listId', () => {
    it('Retorna um erro', () => {
      sinon.stub(productModel, 'listId').rejects();
      const result = productService.listId(1);
      chai.expect(result).to.eventually.be.rejected;
    });


    it('Retorna um erro caso nada seja encontrado', () => {
      sinon.stub(productModel, 'listId').resolves(false);
      const result = productService.listId('a');
      chai.expect(result).to.eventually.throw(Error);
    })

    it('Retorna um objeto', async () => {
      const item = {
        "id": 1,
        "name": "Martelo de Thor"
      }
      sinon.stub(productModel, 'listId').resolves(item);
      const result = await productService.listId('1');
      chai.expect(result).to.be.deep.equal(item);
    })
  })
});
