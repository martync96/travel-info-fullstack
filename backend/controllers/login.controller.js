import { loginService } from '../services/login.service.js';
import jwt from 'jsonwebtoken';

export const loginController = async (req, res) => {

    try{
        const user = await loginService.login(req.body);
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: 86400 }); //signs JWT token with user id and email, with JWT_SECRET from .env file, expires in 24 hours
        res.status(200).send({
            message: `login successful`, 
            user, 
            token
        })
    }catch(err){
        res.status(400).send({
            message: `login failed`,
            error: err.message
        })
    }
};