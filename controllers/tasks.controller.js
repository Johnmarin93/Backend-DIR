import Task from '../models/task.model.js';

// obtener tareas 
export const getTasks = async (req, res)=>{
    try {
        const tasks = await Task.find({
            user: req.user.id
        }).populate('user');
        res.json(tasks);
    } catch (error){
        return res.status(500).json({ message: error.message });
    }

};

// Crear tarea 
export const createTask = async (req, res)=>{
    try {
        const {title, description, date} = req.body;

    console.log(req.user)

    const newTask = new Task ({
        title,
        description,
        date,
        user: req.user.id 
    });
    const savedTask = await newTask.save();
    res.json(savedTask);
    } catch (error){
        return res.status(500).json({ message: error.message });
    }
};

// obtener tarea
export const getTask = async (req, res) => {
    try {
      const task = await Task.findById(req.params.id).populate("user");
      if (!task) return res.status(404).json({ message: "Task not found" });
      return res.json(task);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

// Actualizar tarea 
export const updateTasks = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        if (!task) return res.status(404).json({ message: 'Task not found' })
        res.json(task);
    } catch (error) {
        return res.status(404).json({ message: 'Task not found' })
    }
};

// Eliminar tarea 
export const deleteTask = async (req, res) => {
    try {
      const deletedTask = await Task.findByIdAndDelete(req.params.id);
      if (!deletedTask)
        return res.status(404).json({ message: "Task not found" });
  
      return res.sendStatus(204);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
