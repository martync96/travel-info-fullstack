import { expect } from "chai";
import sinon from "sinon";

import { loginController } from "../controllers/login.controller.js";
import { loginService } from "../services/login.service.js";
import { get } from "mongoose";

describe("login controller tests", () => {

    let req, res, getLoginServiceStub, jsonSpy;

    beforeEach(function () {
        req = {}
        res = {
            json: () => {},
            status: function() { return this; }, // Add this line
            send: function() { return this; },
        };

        jsonSpy = sinon.spy(res, "json");

        getLoginServiceStub = sinon.stub(loginService, "login");
    });

    afterEach(function () {
        getLoginServiceStub.restore();
        jsonSpy.restore(); // Change this line
    });

    it(`should call getLoginStub`, async () => {

        getLoginServiceStub.returns(Promise.resolve([]));

        await loginController(req, res);

        expect(getLoginServiceStub.calledOnce).to.be.true;
    });
})