
import express  from "express";
const rutas = express.Router();

import tarea from "../models/tarea.mjs";

rutas.use(express.json());

rutas.get('/', async (req, res) => {
    const tareas = await tarea.find()
    res.json(tareas);
});


rutas.post('/', async(req, res) => {
    try {
      const nuevatarea = new tarea(req.body);
      
      await nuevatarea.save();
          console.log(nuevatarea);
          res.json({
          status: 'Tarea guardada'
        
        });
    } catch (error) {
    console.error('Error al guardar la tarea:', error);
    res.status(500).json({
        error: 'Error al guardar la tarea'
    });
  } 
  });
    

  rutas.delete('/:id', async(req, res) => {
    try {
      
      await tarea.findByIdAndDelete(req.params.id);
          res.json({
          status: 'Tarea Eliminada'
        
        });
    } catch (error) {
    console.error('Error al eliminar la tarea:', error);
    res.status(500).json({
        error: 'Error al eliminar la tarea'
    });
  } 
  });


  rutas.put('/:id', async(req, res) => {
    try {
      
      await tarea.findByIdAndUpdate(req.params.id, req.body);
          res.json({
          status: 'Tarea Act'
        
        });
    } catch (error) {
    console.error('Error al act la tarea:', error);
    res.status(500).json({
        error: 'Error al act la tarea'
    });
  } 
  });

export default rutas;