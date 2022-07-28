const sinon = require('sinon');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const productController = require('../../../controllers/productController');
const productService = require('../../../services/productService');

chai.use(chaiAsPromised);

describe('controllers/productControllers', () => {
  beforeEach(sinon.restore);

  describe('list', () => {
    it('Retorna um erro', () => {
      sinon.stub(productService, 'list').rejects();
      const result = productController.list({}, {});

      chai.expect(result).to.eventually.be.rejected;
    });

    it('Retorna um objeto', () => {
      sinon.stub(productService, 'list').resolves();
      const result = productController.list({}, {});

      chai.expect(result).to.eventually.be.instanceof(Object);
    });
  });

  describe('listId', () => {
    it('Retorna status e objeto', async () => {
      const req = { params: { id: 1 } };
      const item = { "id": 1, "name": "Martelo de Thor" };
      const res = { status: sinon.stub().callsFake(() => res), json: sinon.stub().returns(), }

      sinon.stub(productService, 'listId').resolves(item);
      const result = await productController.listId(req, res);

      chai.expect(res.status.getCall(0).args[0]).to.equal(200);
      chai.expect(res.json.getCall(0).args[0]).to.be.deep.equal(item)
    });

    it('Retorna status 404', async () => {
      const res = { status: sinon.stub().callsFake(() => res), json: sinon.stub().returns(), }

      sinon.stub(productService, 'listId').rejects();
      const result = await productController.listId({}, res);

      chai.expect(res.status.getCall(0).args[0]).to.equal(404);
    })
  })
})
