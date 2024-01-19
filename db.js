import mongoose from 'mongoose'
import { PORT } from './config.js';
import { MONGODB_URI } from './config.js';


//Funcion para conectar la base de datos
export const conectDB= async ()=>{
    
    //try catch para que si no hay problemas ejecute la conexion de lo contrario muestre el error por consola
    try {
        await mongoose.connect(`${MONGODB_URI}`);
        console.log(">>> DB is connected")
    }catch (error){
        console.log(error);
    }

};
