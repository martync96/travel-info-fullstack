import * as chai from 'chai';
import { expect } from 'chai';
import chaiHttp from "chai-http";

import server from "../server.js"
import User from '../models/user.model.js';
import testUsers from './data/testUser.js';

const { request } = chai.use(chaiHttp);

describe(`Integration Tests on requests to /changePassword route`, () => {

    const testRouteBase = "/changePassword";

    const testLogin = { "email": "testuser1@gmail.com", "password": 'password123', "newPassword": "newPassword1234" }

    const testLoginBad = {
       "email": "teastemail1@gmail.com", "password": 'testPassword1', "newPassword": "newPassword123"
    }

    beforeEach(async () => {
        try {
            await User.deleteMany();
        } catch (error) {
            console.log('Error deleting users:', error.message);
        }

        try {
            await User.insertMany(testUsers);
            console.log('Test users inserted');
        } catch (error) {
            console.log('Error inserting test users:', error.message);
        }
    });

    describe("/POST requests", () => {
        
        it(`should return 400 bad request if the supplied password doesn't match that in the database`, async() => {

            const res = (await request(server).post(testRouteBase).send(testLoginBad));
            expect(res).to.have.status(400);
        });

        it(`should return 200 request if the password is changed successfully`, async() => {
                
                const res = (await request(server).post(testRouteBase).send(testLogin));
                expect(res).to.have.status(200);
        });
    });
});