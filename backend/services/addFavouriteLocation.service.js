import User from "../models/user.model.js";

const addFavouriteLocation = async ({ email, location }) => {
    try {
        let user = await User.findOne({ email });
        if (user) {
            await user.updateOne({ $push: { favouriteLocations: location } });
            user = await User.findOne({ email }); //get updated user
            return user.favouriteLocations;
        } else {
            throw new Error('User not found');
        }
    } catch (error) {
        throw error; // Throwing the error so it can be caught by the controller
    }
};

export const addFavouriteLocationService = {
    addFavouriteLocation,
};