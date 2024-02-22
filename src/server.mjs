import  express  from "express";
import  http  from "http";
import morgan from "morgan";
import mongoose from "mongoose";
import cors from "cors";
import tareasRouter from './router/tareas.mjs';
import multer from "multer";


// crea el servidor
const app = express();
const server = http.createServer(app);
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use('/tareas', tareasRouter);

const upload = multer({ dest: 'uploads/' });
app.use(upload.single('archivo'));

app.set('port', process.env.PORT || 500);

app.get('/', (req, res) => {
    res.send('Hola soy tu servidor nuevo');
});

server.listen(app.get('port'), () => {
    console.log('Servidor corriendo en el puerto', app.get('port'));
});

mongoose.connect('mongodb://127.0.0.1/viajes')
  .then(db => console.log('Base de datos conectada'))
  .catch(err => console.log(err));
