import User from '../models/user.model.js';
import mongoose from 'mongoose';

const removeFavouriteLocation = async ({email, locationID}) => {

    const objectId = mongoose.Types.ObjectId(locationID); //convert locationID to objectId type

    try{
        const user = await User.findOneAndUpdate(
            { email },
            { $pull: {favouriteLocations: {_id: objectId} } }, //remove locationId from favouriteLocations array
            {new: true}, 
        );
        return user;
    }catch(error){
        throw error;
    }
}   

export const removeFavouriteLocationService = {
    removeFavouriteLocation,
}