const sinon = require('sinon')
const { expect } = require('chai')
const proxyquire = require('proxyquire')
const validation = require('../../bin/helpers/validation')
const userController = require('../../controllers/user.controller')

describe("teste inicial", () => {
    const req = { body: { cpf: '123' } }
    const req2 = { body: { cpf: '345' } }
    const resp = 'resp'

    it("testando o cpf", () => {
        const validationSpy = sinon.spy(validation, "soma")
        const clearSpy = sinon.spy(validation, "clear")

        const userController = proxyquire("../../controllers/user.controller", { validation })

        userController.authenticate(req, resp)

        // expect(clearSpy.calledWith()).to.be.true
        expect(validationSpy.calledWith(2, 2)).to.be.true
        // expect(validationSpy.callCount).to.be.equal(1)
    })

    it.only("get users", () => {

        const userControllerMock = sinon.mock(userController)

        userControllerMock.expects('get')
            .once()
            .withArgs(req, resp)

        userController.get(req, resp)

        userControllerMock.verify()
    })
})
