const mongoose = require('mongoose');


const productoSchema = new mongoose.Schema({
    nombre:{type: String, required:true},
    descripcion:{type: String, required:true},
    precio:{type: Number, required:true},
    imageUrl:{type:String, required:true},
    stock:{type: Number, default:0},
    categoria: {type: mongoose.Schema.Types.ObjectId, ref: 'Categoria', required:true}
});

module.exports = mongoose.model('Producto', productoSchema)