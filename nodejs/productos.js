const express = require ('express');
const app = express();
const PORT = 3004;
const mongoose = require('mongoose');
const router = express.Router();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/Tienda-online-FarmamigoIV', 
    )
    .then(() => console.log('Database connected'))
    .catch(err => console.log('Database connection error: ', err));

const ProductosSchema = new mongoose.Schema({
    nombre: String,
    precio: Number,
    imagen: String,
    fecha_creacion: Date,
    fecha_actualizacion: Date,
    fecha_borrado: Date,
    Eliminado: Boolean,
    Descripcion: String,
});

const Productos = mongoose.model('Productos', ProductosSchema);

app.get('/', (req, res) => {
    res.send('Hello World! view productos')
});

app.post('/productos', async (req, res) => {
    const productos = new Productos(req.body);
    await productos.save();
    res.json({status: 'Productos guardado'});
});

app.get('/productos', async (req, res) => {
    const productos = await Productos.find();
    res.json(productos);
});

app.get('/productos/:id', async (req, res) => {
    const { id } = req.params;
    const productos = await Productos.findById(id);
    res.json(productos);
});

app.delete('/productos/:id', async (req, res) => {
    const { id } = req.params;
    const productos = await Productos.findByIdAndDelete(id);
    res.json(productos);
});

app.patch('/productos/:id', async (req, res) => {
    const { id } = req.params;
    const productos = await Productos.findByIdAndUpdate(id, req.body);
    res.json(productos);   
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost ${PORT}`);
})
