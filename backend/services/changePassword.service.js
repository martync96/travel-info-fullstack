import User from "../models/user.model.js";
import { loginService } from "./login.service.js";
import { passwordHashService } from "./passwordHash.service.js";

const changePassword = async ({ email, password, newPassword }) => {

    const authenticatedUser = await loginService.login({ email, password });

    if (authenticatedUser) {
        const user = await User.findOne({ email: authenticatedUser.email });
        const hashedPassword = await passwordHashService.hashPassword(newPassword);
        user.set('password', hashedPassword);
        await user.save();
        return user;
    }

    throw new Error(`Incorrect Credentials`);
};

export const changePasswordService = {
    changePassword,
};