import mongoose from 'mongoose'


// Esquema de labase de datos
// TRIM permite quitar los espacios en blanco de izquierda y derecha y solo deja el valor o la palabra 
// Unico Email se debe colocar unique esto valida que existe o no el correo que esta ingresando 
const userShema = new mongoose.Schema({
    username: {
        type:String,
        required: true,
        trim: true,   
    },
    email:{
        type:String,
        requiered:true,
        trim: true,
        unique: true,
    },
    password:{
        type: String,
        requiered:true,
    },
        
    
},
    {timestamps:true,} // Se utiliza para que almacene la fecha en que se registro o actualizo 
)

// Se crea un modelo para saber como vas a guardar los datos en la BD para poder hacer consultas por eso utilizamos model 
export default mongoose.model('User',userShema);

