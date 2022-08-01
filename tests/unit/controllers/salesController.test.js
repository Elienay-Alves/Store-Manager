const sinon = require('sinon');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const salesController = require('../../../controllers/salesController');
const salesService = require('../../../services/salesService');
const productService = require('../../../services/productService');

chai.use(chaiAsPromised);

describe('controllers/salesControllers', () => {
  beforeEach(sinon.restore);

  describe('read', () => {
    it('Retorna um erro', () => {
      sinon.stub(salesService, 'read').rejects();
      const result = salesController.read();

      chai.expect(result).to.eventually.be.rejected;
    });

    it('Retorna um json', async () => {
      const res = {
        status: sinon.stub().callsFake(() => res),
        json: sinon.stub().returns(),
      };
      sinon.stub(salesService, 'read').resolves([{}]);
      await salesController.read({}, res);
      chai.expect(res.json.getCall(0).args[0]).to.be.deep.equal([{}])
    });
  });

  // describe('readId', () => {
  //   it('Retorna status e objeto', async () => {
  //     sinon.stub(salesService, 'readId').resolves([{}]);
  //     const res = { status: sinon.stub().callsFake(() => res), json: sinon.stub().returns(), }
  //     await salesController.readId({}, res);
  //     chai.expect(res.status.getCall(0).args[0]).to.equal(200);
  //     chai.expect(res.json.getCall(0).args[0]).to.be.deep.equal([{}])
  //   });

  //   it('Retorna status 404', async () => {
  //     const res = { status: sinon.stub().callsFake(() => res), json: sinon.stub().returns(), }

  //     sinon.stub(salesService, 'readId').rejects();
  //     await salesController.readId({}, res);

  //     chai.expect(res.status.getCall(0).args[0]).to.equal(404);
  //   })
  // })

  describe('create', () => {
    it('Retorna erro se a validação falhar', () => {
      sinon.stub(salesService, 'validateBodyCreate').rejects();

      chai.expect(salesController.create({}, {})).eventually.to.be.rejected;
    })

    it("Retorna um erro ", () => {
      sinon.stub(salesService, "validateBodyCreate").resolves();
      sinon.stub(productService, "create").rejects();

      chai.expect(salesController.create({}, {})).eventually.to.be.rejected;
    });
  })

  describe('update', () => {
    it('Retorna erro se a validação falhar', () => {
      sinon.stub(productService, 'validateBodyCreate').rejects();
      chai.expect(salesController.update({}, {})).to.eventually.be.rejected;
    })
  })

  describe('delete', () => {
    it('Retorna um erro', () => {
      sinon.stub(salesService, 'delete').resolves();
      chai.expect(salesController.delete({}, {})).to.be.eventually.rejected;
    });

    // it('Retorna status', async () => {

    //   req = { params: { id: 1 } }

    //   const res = {
    //     status: sinon.stub().returns(),
    //   };

    //   sinon.stub(salesService, 'delete').resolves();
    //   await salesController.delete(req, res);
    //   chai.expect(res.status).to.equal(204)
    // });
  })
});
