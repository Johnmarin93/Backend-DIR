import {TOKEN_SECRET} from '../config.js';
import jwt from 'jsonwebtoken';

export function createAccesToken(payload){

    // new promise es un objeto global todo puede ir bien  con resolve o mal con reject 
    return new Promise((resolve, reject) =>{
        // Generar token 
    jwt.sign(
        payload, 
        TOKEN_SECRET, 
        {
            expiresIn: "1d",
        },
        (err, token) => {
            if (err) reject(err)
            resolve(token)
        }
    );
    });
}
