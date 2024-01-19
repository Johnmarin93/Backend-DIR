import jwt from 'jsonwebtoken';
import {TOKEN_SECRET} from '../config.js';
// req me da informacion de la peteicion, resme da metodo para enviar una respuesta, next continua si hay una respuesta
export const authRequired =(req, res, next)=>{
    const {token} = req.cookies;

    if (!token)
     return res.status(401).json({message: "No token, authorization denied"});

    jwt.verify(token, TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({message: "Invalid token"});

        req.user = user;
        next();
    })
     
};