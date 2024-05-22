import { expect } from "vitest";
import PasswordValidator from "../src/functions/PasswordValidator.jsx";

describe(`PasswordValidator Tests`, () => {

    it(`should return false if the password does not have at least one capital letter`, () => {

        const password = 'password1!';

        const result = PasswordValidator(password);

        expect(result).toBe(false);
    });

    it(`should return false if the password does not have at least one lowercase letter,`, () => {

        const password = 'PASSWORD1!';

        const result = PasswordValidator(password);

        expect(result).toBe(false);
    });

    it(`should return false if the password does not have at least one number`, () => {

        const password = 'Password!';

        const result = PasswordValidator(password);

        expect(result).toBe(false);
    });

    it(`should return false if the password does not have at least one special character`, () => {

        const password = 'Password1';

        const result = PasswordValidator(password);

        expect(result).toBe(false);
    });

    it(`should return false if the password is less than 9 characters long`, () => {


        const password = 'Pass!1';

        const result = PasswordValidator(password);

        expect(result).toBe(false);
    });

    it(`should return true if the password is 8 or more characters long and has at least one capital letter, one lowercase letter, one number, and one special character`, () => {
            
            const password = 'Password1!';
    
            const result = PasswordValidator(password);
    
            expect(result).toBe(true);
    });
});