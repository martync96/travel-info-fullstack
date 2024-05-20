import { addFavouriteLocationService } from "../services/addFavouriteLocation.service.js";

export const addFavouriteLocationController = async (req, res) => {
    try{
        await addFavouriteLocationService.addFavouriteLocation(req.body);
        res.status(200).send({ message: `Location added successfully` });
    } catch(error) {
        res.status(400).send({ message: `${error.message}`, location: req.body });
    }                                   
};