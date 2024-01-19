import express from 'express';
import morgan from 'morgan';
import authRoutes from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';  // Nos permite convertir una cookie en un objeto json 
import taskRoutes from './routes/tasks.routes.js';
import cors from 'cors'; // Es un control de acceso en http 

//Inicia la app
const app=express()

// Cors  es un mecanismo basado en cabeceras HTTP que permite a un servidor indicar cualquier dominio
app.use(cors(
    {
        origin: 'http://localhost:5173',   // Tan solo por este 
        credentials: true
    }
));

// Morgan permite tener una respuesta a los refresh de las paginas mensaje en consola 
app.use(morgan('dev'));

// Creamos un midelware para procesar los datos json
app.use(express.json());

app.use(cookieParser());

//Definimos las rutas para procesar
app.use('/api', authRoutes);
app.use('/api', taskRoutes);

// Exportarta la app  
export default app;