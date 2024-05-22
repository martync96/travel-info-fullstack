import * as chai from 'chai';
import { expect } from 'chai';
import chaiHttp from "chai-http";

import server from "../server.js"
import User from '../models/user.model.js';
import testUsers from './data/testUser.js';

const { request } = chai.use(chaiHttp);

describe("addFavouriteLocation service tests", () => {

    const testBaseRoute = "/addFavouriteLocation";

    const testLogin = {
        "email": "testuser1@gmail.com", "password": "2a$10$FR5nJMQIi/5T2S7VKxirCOHCGOIoQ3oQGK3ILna1vxXaW9cwJMCfO", "favouriteLocations": [{ "city": "New York", "country": "USA" }]
    }

    const testLoginBad = {
        "email": "teastemail1@gmail.com", "password": 'testPassword1'
     }

    beforeEach(async () => {
        try {
            await User.deleteMany();
        } catch (error) {
            console.log('Error deleting users:', error.message);
        }

        try {
            await User.insertMany(testUsers);
        } catch (error) {
            console.log('Error inserting test users:', error.message);
        }
    });

    it(`should return a 200 status if a location is successfully added`, async (testLogin) => {
        const res = await request(server).post(testBaseRoute).send();

        expect(res).to.have.status(200);

    });

    it(`should return a 400 status if an error occurs`, async () => {
        const res = await request(server).post(testBaseRoute).send(testLoginBad);

        expect(res).to.have.status(400);

    });
});