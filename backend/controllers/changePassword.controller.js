import { changePasswordService } from '../services/changePassword.service.js';

export const changePasswordController = async (req, res) => {

    try{
        await changePasswordService.changePassword(req.body);
        res.status(200).send({ message: `Password changed successfully` });
    }catch(error){
        res.status(400).send({ message: `${error.message}`, user: req.body }); 
    }
};