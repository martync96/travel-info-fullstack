import bcrypt from 'bcrypt';

const hashPassword = async (password) => {

    const salt = await bcrypt.genSalt(10); //generate a salt with 10 rounds
    const hashedPassword = await bcrypt.hash(password, salt); //hash the password with the salt

    if(hashedPassword){
        return hashedPassword; //if password hashed succesfully, return the hashed password
    }

    throw new Error(`Password hashing failed`);
};

const comparePassword = async (password, passwordHash) => {

    const isMatch = await bcrypt.compare(password, passwordHash); //compare the password provided with the hashed password stored in the DB

    if(isMatch){
        return isMatch; //if password matches, return true
    }

    throw new Error(`Password comparison failed`);
};

export const passwordHashService = {
    hashPassword,
    comparePassword,
};   