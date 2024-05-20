import User from "../models/user.model.js";

const addFavouriteLocation = async ({ email, location }) => {
    try{
        
        let user = await User.findOne( { email });
        if(user){
            await user.updateOne({ $push: { favouriteLocations: location } });
        }

    } catch (error){
        return error;
    }
};

export const addFavouriteLocationService = {
    addFavouriteLocation,
};