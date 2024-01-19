import app from './app.js';
import { PORT } from './config.js';
import {conectDB} from "./db.js";

// Iniciamos la Base de  Datos
conectDB();
// Inicia la App en el puerto 3000 
app.listen(PORT)
// Permire imprimir el puerto de conexion del servidor  
console.log('server on port', PORT) 