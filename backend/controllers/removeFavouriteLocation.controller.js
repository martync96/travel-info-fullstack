import { removeFavouriteLocationService } from "../services/removeFavouriteLocation.service.js";

export const removeFavouriteLocationController = async (req, res) => {

    try{
        const user = await removeFavouriteLocationService.removeFavouriteLocation(req.body);
        res.status(200).send({
            message: `Location removed from favourites`,
            user
        });
    }catch(error){
        res.status(400).send({
            message: `${error.message}`
        });
    }
};