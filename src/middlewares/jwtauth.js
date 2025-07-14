import jwt from "jsonwebtoken";
import env from "dotenv";
env.config();

export const generateToken = (userId) => {
    try{
        const token = jwt.sign({userId},process.env.JWT_SECRET,{expiresIn: "12h"});
        return token;

    }
    catch(error){
        console.error('Error generating token:', error);
        throw new error('Token generation failed');
    }
};

export const verifyToken = (req, res, next) => {
    const authHeader = req?.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(!token){
        return res.status(401).json({message: "No token provided"});
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();

    }catch(error){
        if(error.name === 'TokenExpiredError'){
            return res.status(401).json({message: "Token has expired"});
        }
        return res.status(403).json({message: "Invalid token"});
    }
};