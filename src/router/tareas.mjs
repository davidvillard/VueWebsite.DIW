import express  from "express";
const rutas = express.Router();
import multer from "multer";

import tarea from "../models/tarea.mjs";

rutas.use(express.json());
const upload = multer({ dest: 'uploads/' });

rutas.get('/', async (req, res) => {
  try {
    const tareas = await tarea.find()
    res.json(tareas);
  } catch (error) {
    res.status(500).json({ error: error.message});
  }
});


rutas.post('/',upload.single('archivo') , async(req, res) => {
    try {
      if(req.file){
        console.log('archivo subido:', req.file);
      }else{
        console.log('no se subio ningun archivo');
      }
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