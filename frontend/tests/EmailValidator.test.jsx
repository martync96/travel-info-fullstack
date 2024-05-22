import EmailValidator from "../src/functions/EmailValidator.jsx";

describe(`EmailValidator Tests`, () => {
    {
        it(`should return true if the email is valid`, () => {
            const email = 'johnsmith@gmail.com';

            const result = EmailValidator(email);

            expect(result).toBe(true);
        });

        it(`should return false if the email is invalid`, () => {
            const email = 'jhon';

            const result = EmailValidator(email);

            expect(result).toBe(false);
        });
    }
});