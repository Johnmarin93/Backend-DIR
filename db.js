import mongoose from 'mongoose'
import { PORT } from './config.js';
import { MONGODB_URI } from './config.js';


//Funcion para conectar la base de datos
export const conectDB= async ()=>{
    
    //try catch para que si no hay problemas ejecute la conexion de lo contrario muestre el error por consola
    try {
        await mongoose.connect('mongodb+srv://johnmarin:Sdh4nLOxBdQ9WrOk@cluster0.gtln7mq.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp');
        console.log(">>> DB is connected")
    }catch (error){
        console.log(error);
    }

};
