import { passwordHashService } from "../services/passwordHash.service.js";
import { expect } from 'chai';
import User from '../models/user.model.js';
import testUsers from './data/testUser.js';

describe("login service tests", () => {

    const testRouteBase = "/login";

    const testLogin = {
        "email": "testuser1@gmail.com", "password": 'password123'
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
            console.log('Test users inserted');
        } catch (error) {
            console.log('Error inserting test users:', error.message);
        }
    });


    it(`passwordHashService should return a hashed version of the password given`, async () => {

        const res = await passwordHashService.hashPassword(testLogin.password);

        expect(res).to.not.equal(testLogin.password);

    });

    it(`compare password should return true if the passwords match`, async () => {

        const hashedPassword = await passwordHashService.hashPassword(testLogin.password);
        const res = await passwordHashService.comparePassword(testLogin.password, hashedPassword);

        expect(res).to.be.true;
    });

    it(`compare password should throw an error if the passwords don't match`, async () => {

        try {
            const hashedPassword = await passwordHashService.hashPassword(testLogin.password);
            await passwordHashService.comparePassword(testLoginBad.password, hashedPassword);
        } catch (error) {
            // Check if the error message matches the expected error message
            expect(error.message).to.equal("Password comparison failed");
        }
    })

    it(``, async () => { });
});