import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    } ,
    date:{
        type: Date,
        default: Date.now,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    }

},{
    timestamps: true // Se utiliza para que almacene la fecha en que se registro o actualizo 
});

export default mongoose.model("Task", taskSchema);