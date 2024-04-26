import { expect } from "chai";
import sinon from "sinon";
import { changePasswordController } from "../controllers/changePassword.controller.js";
import { changePasswordService } from "../services/changePassword.service.js";

describe("", () => {

    let req, res, getChangePasswordStub, jsonSpy;

    beforeEach(function () {
        req = {}
        res = {
            json: () => { },
            status: function () { return this; },
            send: function () { return this; },
        };

        jsonSpy = sinon.spy(res, "json");

        getChangePasswordStub = sinon.stub(changePasswordService, "changePassword");
    });

    afterEach(function () {
        getChangePasswordStub.restore();
        jsonSpy.restore(); 
    });

    it(`should call getChangePasswordStub`, async () => {

        getChangePasswordStub.returns(Promise.resolve([]));

        await changePasswordController(req, res);

        expect(getChangePasswordStub.calledOnce).to.be.true;
    });
});