import mongoose from "mongoose";


const { Schema } = mongoose;

const tarea = new Schema({
    nombre: String,
    descripcion: String,
    fecha: String,
    sala: String,
    equipos: [String],
    prioridad: String
});

export default mongoose.model('tarea', tarea);