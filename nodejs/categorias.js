const express = require ('express');
const app = express();
const PORT = 3002;
const mongoose = require('mongoose');
const router = express.Router();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/Tienda-online-FarmamigoIV', 
    )
    .then(() => console.log('Database connected'))
    .catch(err => console.log('Database connection error: ', err));

const CategoriasSchema = new mongoose.Schema({
    nombre: String,
    descripcion: String,
    fecha_creacion: Date,
    fecha_actualizacion: Date,
    fecha_borrado: Date,
    Eliminado: Boolean,
});

const Categorias = mongoose.model('Categorias', CategoriasSchema);

app.get('/', (req, res) => {
    res.send('Hello World! view categorias')
});

app.post('/categorias', async (req, res) => {
    const categorias = new Categorias(req.body);
    await categorias.save();
    res.json({status: 'Categorias guardada'});
});

app.get('/categorias', async (req, res) => {
    const categorias = await Categorias.find();
    res.json(categorias);
});

app.get('/categorias/:id', async (req, res) => {
    const { id } = req.params;
    const categorias = await Categorias.findById(id);
    res.json(categorias);
});

app.delete('/categorias/:id', async (req, res) => {
    const { id } = req.params;
    const categorias = await Categorias.findByIdAndDelete(id);
    res.json(categorias);
});

app.patch('/categorias/:id', async (req, res) => {
    const { id } = req.params;
    const categorias = await Categorias.findByIdAndUpdate(id, req.body);
    res.json(categorias);   
}); 

app.listen(PORT, () => {
    console.log(`Server running on http://localhost ${PORT}`);
})