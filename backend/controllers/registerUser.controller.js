import { registerUserService } from "../services/registerUser.service.js";

export const registerUserController = async (req, res) => {
    try{
        await registerUserService.registerUser(req.body);
        res.status(200).send({ message: `User registered successfully` });
    }catch(error){
        res.status(400).send({ message: `${error.message}`, user: req.body }); 
    }
};