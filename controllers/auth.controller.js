import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import  jwt  from 'jsonwebtoken';
import {createAccesToken} from '../libs/jwt.js';
import { TOKEN_SECRET } from '../config.js'; 

// Funciones que nos permiten procesar peticiones
export const register = async (req, res)=> {
    const {email, password, username} = req.body  // Son los datos que el cliente envia 
    

    try {

       const userFound = await User.findOne({email});
        if (userFound) 
            return res.status(400).json([' the email is already in use']);

        const passwordHashs = await bcrypt.hash(password, 10) // permite darnos un estring aleatorio para encriptar la contraseña
        const newUser = new User({
            username,
            email,
            password: passwordHashs,
        });

    const userSaved = await newUser.save(); // nos permite guardar el usuario 
    const token = await createAccesToken({id: userSaved._id}); // nos  permite generar el token con el id del usuario almacenado 
    res.cookie("token", token); // Se guarda el token en una cookie
    // Respuesta del servidor al momento de guardar el usuario 
    
    res.json({
        message: "User created successfully",
        id: userSaved._id,
        username: userSaved.username,
        email: userSaved.email,
        createdAt: userSaved.createdAt,
        updatedAt: userSaved.updatedAt,
    }); 
   
    } catch (error) {
        res.status(500).json({massage: error.message});
    }    
};

// Funciones que nos permiten procesar peticiones
export const login = async (req, res)=> {
    const {email, password} = req.body;  // Son los datos que el cliente envia 
    
    try {

        const userFound = await User.findOne({email}) // Este es el que utilizamos para validar si es el usuario o no

        if (!userFound) return res.status(400).json({message: "user not found"}); // si no encontro el usuario respond el mensaje no se encontro 

        // Si encontro el usuario pasa a la linea de comparar 
        const isMatch = await bcrypt.compare(password, userFound.password); // compara el password con el usuario  que esta en la base de datos y devuelve un true o un false
        
        if (!isMatch) return res.status(400).json({message: "incorrect password"}); // Si el resultado es false muestra en pantalla el mensaje incorrect
        
        // si es true

    const token = await createAccesToken({id: userFound._id}); // del usuario encontrado vas a tomar su id y vas a crear un token con ese id
    res.cookie("token", token,); // Se guarda el token en una cookie
    // Respuesta del servidor al momento de guardar el usuario 
    res.json({
        message: "User created successfully",
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt,
    }); 
   
    } catch (error) {
        res.status(500).json({massage: error.message});
    }    
};

// Funcion para elmiminar el token y cerrar sesion
export const logout = (req, res)=>{
    res.cookie('token', "", {
        expires: new Date(0)
    })
    return res.sendStatus(200);
}

export const profile = async (req, res) =>{
    const userFound =   await User.findById(req.user.id);
    if (!userFound) return res.status(400).json({message:"User not found"});

    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt,
    })
};

export const verifyToken = async (req, res) => {
    const {token} = req.cookies

    if (!token) return res.status(401).json({message: "Unauthorized"});

    jwt.verify(token, TOKEN_SECRET,  async (err, user )=> {
        if (err) return res.status(401).json({message: "Unauthorized"});

       const userFound = await User.findById(user.id)
       if (!userFound) return res.status(401).json({message: "Unauthorized"});

       return   res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
       });
    })
}

