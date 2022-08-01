const sinon = require('sinon');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const productController = require('../../../controllers/productController');
const productService = require('../../../services/productService');

chai.use(chaiAsPromised);

describe('controllers/productControllers', () => {
  beforeEach(sinon.restore);

  describe('read', () => {
    it('Retorna um erro', () => {
      sinon.stub(productService, 'read').rejects();
      const result = productController.read({}, {});

      chai.expect(result).to.eventually.be.rejected;
    });

    it('Retorna um objeto', () => {
      sinon.stub(productService, 'read').resolves();
      const result = productController.read({}, {});

      chai.expect(result).to.eventually.be.instanceof(Object);
    });
  });

  describe('readId', () => {
    it('Retorna status e objeto', async () => {
      const req = { params: { id: 1 } };
      const item = { "id": 1, "name": "Martelo de Thor" };
      const res = { status: sinon.stub().callsFake(() => res), json: sinon.stub().returns(), }

      sinon.stub(productService, 'readId').resolves(item);
      const result = await productController.readId(req, res);

      chai.expect(res.status.getCall(0).args[0]).to.equal(200);
      chai.expect(res.json.getCall(0).args[0]).to.be.deep.equal(item)
    });

    it('Retorna status 404', async () => {
      const res = { status: sinon.stub().callsFake(() => res), json: sinon.stub().returns(), }

      sinon.stub(productService, 'readId').rejects();
      const result = await productController.readId({}, res);

      chai.expect(res.status.getCall(0).args[0]).to.equal(404);
    })
  })
  describe('create', () => {
    it('Retorna erro se a validação falhar', () => {
      sinon.stub(productService, 'validateBodyCreate').rejects();

      chai.expect(productController.create({}, {})).eventually.to.be.rejected;
    })

    it("Retorna erro se productController.create falhar", () => {
      sinon.stub(productService, "validateBodyCreate").resolves();
      sinon.stub(productService, "create").rejects();

      chai.expect(productController.create({}, {})).eventually.to.be.rejected;
    });
  })

  describe('update', () => {
    it('Retorna erro se a validação falhar', () => {
      sinon.stub(productService, 'validateBodyCreate').rejects();
      chai.expect(productController.update({}, {})).to.eventually.be.rejected;
    })

    // it('Retorna um objeto', async () => {
    //   sinon.stub(productService, 'validateBodyCreate').resolves();
    //   sinon.stub(productService, 'update').resolves();
    //   sinon.stub(productService, 'readId').resolves({});

    //   const req = { params: { id: 2, name: "Martelo do Batman" } };

    //   const res = {
    //     status: sinon.stub().callsFake(() => res),
    //     json: sinon.stub().returns(),
    //   }

    //   await productController.update(req, res);
    //   chai.expect(res.status.getCall(0).args[0]).to.be.equal(200);
    //   chai.expect(res.json.getCall(0).args[0]).to.be.deep.equal({})
    // });
  } )
})
