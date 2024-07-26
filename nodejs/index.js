const express = require ('express');
const app = express();
const PORT = 3001;
const mongoose = require('mongoose');
const router = express.Router();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/Tienda-online-FarmamigoIV', 
    )
    .then(() => console.log('Database connected'))
    .catch(err => console.log('Database connection error: ', err));

const UsuarioSchema = new mongoose.Schema({
    nombre: String,
    apellidos: String,
    email: String,
    contraseña: String,
    telefono: String,
    rol: String,
    fecha_creacion: Date,
    fecha_actualizacion: Date,
    fecha_borrado: Date,
    activo: Boolean,
    compras: Number,
    carrito_compras: Array,
    historial_compras: Array,
});

const Usuario = mongoose.model('Usuario', UsuarioSchema);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/usuarios', async (req, res) => {
    const usuario = new Usuario(req.body);
    await usuario.save();
    res.json({status: 'Usuario guardado'});
});

app.get('/usuarios', async (req, res) => {
    const usuarios = await Usuario.find();
    res.json(usuarios);
});

app.get('/usuarios/:id', async (req, res) => {
    const { id } = req.params;
    const usuario = await Usuario.findById(id);
    res.json(usuario);
});

app.delete('/usuarios/:id', async (req, res) => {
    const { id } = req.params;
    const usuario = await Usuario.findByIdAndDelete(id);
    res.json(usuario);
});

app.patch('/usuarios/:id', async (req, res) => {
    const { id } = req.params;
    const usuario = await Usuario.findByIdAndUpdate(id, req.body);
    res.json(usuario);   
});

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`)});