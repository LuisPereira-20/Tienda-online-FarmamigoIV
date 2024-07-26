const express = require ('express');
const app = express();
const PORT = 3003;
const mongoose = require('mongoose');
const router = express.Router();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/Tienda-online-FarmamigoIV', 
    )
    .then(() => console.log('Database connected'))
    .catch(err => console.log('Database connection error: ', err));

const RolesSchema = new mongoose.Schema({
    nombre: String,
    permisos: String, 
    fecha_creacion: Date,
    fecha_actualizacion: Date,
    fecha_borrado: Date,
    Eliminado: Boolean,
});

const Roles = mongoose.model('Roles', RolesSchema);

app.get('/', (req, res) => {
    res.send('Hello World! view roles')
});

app.post('/roles', async (req, res) => {
    const roles = new Roles(req.body); 
    await roles.save();
    res.json({status: 'Roles guardado'});
}); 

app.get('/roles', async (req, res) => {
    const roles = await Roles.find();
    res.json(roles);
});

app.get('/roles/:id', async (req, res) => {
    const { id } = req.params;
    const roles = await Roles.findById(id);
    res.json(roles);
});  

app.delete('/roles/:id', async (req, res) => {
    const { id } = req.params;
    const roles = await Roles.findByIdAndDelete(id);
    res.json(roles);
});

app.patch('/roles/:id', async (req, res) => {
    const { id } = req.params;
    const roles = await Roles.findByIdAndUpdate(id, req.body);
    res.json(roles);   
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost ${PORT}`);
})
