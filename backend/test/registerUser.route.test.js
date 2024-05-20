import * as chai from 'chai';
import { expect } from 'chai';
import chaiHttp from "chai-http";

import server from '../server.js';
import User from '../models/user.model.js';
import testUsers from './data/testUser.js';

const { request } = chai.use(chaiHttp);

describe(`Integration Tests on requests to /changePassword route`, () => {

    const testRegisterRoute = "/register";

    const testRegister = { "email": "testuser1000@gmail.com", "password": "password1234" }

    const testRegisterBad = { "email": "testuser1@gmail.com", "password": "password123" }

    beforeEach(async () => {
        try{
            await User.deleteMany();
        }catch(error){
            console.log('Error deleting users:', error.message);
        }

        try{
            await User.insertMany(testUsers);
        }catch(error){
            console.log('Error inserting test users:', error.message);
        }
    });

    describe("/POST requests", () => {})

        it(`should return a 200 status if the user is successfully added to the database`, async() => {

            const res = (await request(server).post(testRegisterRoute).send(testRegister));
            expect(res).to.have.status(200);
        });

        it(`should return a 400 status if the user tries to register with an email already in use`, async() => {

            const res = (await request(server).post(testRegisterRoute).send(testRegisterBad));
            expect(res).to.have.status(400);

        });

        it(`should hash the plaintext password supplied by the user`, async() => {

            const res = (await request(server).post(testRegisterRoute).send(testRegister));
            const user = await User.findOne({ email: testRegister.email });
            expect(user.password).to.not.equal(testRegister.password);

        });
});