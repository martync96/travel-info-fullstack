import User from "../models/user.model.js";
import { passwordHashService } from "./passwordHash.service.js";

const registerUser = async ({ email, password }) => {

    password = await passwordHashService.hashPassword(password);
    const user = new User({ email, password });

    try { 
        await user.save();
    } catch (error) {
        throw new Error(`Something went wrong`);
    }

};

export const registerUserService = {
    registerUser,
};