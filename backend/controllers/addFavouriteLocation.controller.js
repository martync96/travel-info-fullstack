import { addFavouriteLocationService } from "../services/addFavouriteLocation.service.js";

export const addFavouriteLocationController = async (req, res) => {
    try {
        const favouriteLocations = await addFavouriteLocationService.addFavouriteLocation(req.body);
        res.status(200).send({ message: `Location added successfully`, favouriteLocations });
    } catch (error) {
        res.status(400).send({ message: `${error.message}` });
    }                                   
};