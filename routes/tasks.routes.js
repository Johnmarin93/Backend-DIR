import { Router } from "express";
import {authRequired} from '../middlewares/validateToken.js';
import { 
    getTask, 
    getTasks, 
    createTask, 
    updateTasks, 
    deleteTask 
} from "../controllers/tasks.controller.js";
import {validateSchema} from '../middlewares/validator.middleware.js'
import {createTaskSchema} from '../schemas/task.schema.js'

const router = Router()

router.get('/tasks', authRequired, getTasks) //Obtener
router.get('/tasks/:id', authRequired, getTask) // obtener uno solo
router.post(
    '/tasks', 
    authRequired, 
    validateSchema(createTaskSchema), 
    createTask
    ); // Crear
router.delete('/tasks/:id', authRequired, deleteTask) // eliminar uno solo
router.put('/tasks/:id', authRequired, updateTasks) // Actualizar uno solo 

export default router