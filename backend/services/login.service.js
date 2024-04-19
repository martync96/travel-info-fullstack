import User from '../models/user.model.js';
import { passwordHashService } from './passwordHash.service.js';

const login = async ({email, password}) => {

    const user = await User.findOne({ email }); //check if email supplied is in the database
    
    if (user && (await passwordHashService.comparePassword(password, user.password))){ //if user is found and user.password is equal to hashed password supplied, return the user
        return user;
    }

    throw new Error(`Incorrect Credentials`); //throw error if user not found
}

export const loginService = {
    login, 
};