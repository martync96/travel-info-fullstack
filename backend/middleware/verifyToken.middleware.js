import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {

    let token = req.headers["x-access-token"]; //retrieve token from header, if there is any

    if (!token) {
        return res.status(403).send({ message: "No token provided!" }); //if no token, return error message
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err){
            return res.status(401).send({ message: "Unauthorized!" }); //if token is invalid, return error message
        }

        res.userId = decoded.id;
        next();
    });
};

export const authJWT = {
    verifyToken
};
