const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const conectarBDMongo = require('./src/Configuracion/baseDatos'); // MongoDB
const pool = require('./src/Configuracion/baseDatosPostgres'); // Importamos el pool directamente
const middlewareAutenticacion = require('./src/middleware/middlewareAutenticacion');

// Configuración del entorno
dotenv.config();

const app = express();

// Middleware para parsear JSON
app.use(express.json());

//Configuracion especifica de CORS
app.use(cors({
    origin: 'http://localhost:3000', //Permitir solicitudes solo desde el frontend
    methods: ["GET", "POST", "PUT", "DELETE"], //Permitir solicitudes solo desde el frontend
    credentials: true              //Habilitar cookies o encabezados personalizados
}));

// Conexión a MongoDB
conectarBDMongo();

// Verificar conexión a PostgreSQL
pool.connect()

    .catch(err => console.error('Error al conectar a PostgreSQL:', err.message));

// Rutas
app.use('/api/productos', require('./src/Rutas/rutasProducto'));
app.use('/api/usuarios', require('./src/Rutas/rutaUsuario'));
app.use('/api/ordenes', require('./src/Rutas/rutasOrden'));
app.use('/api/carrito', require('./src/Rutas/rutaCarrito'));
app.use('/api/categorias', require('./src/Rutas/rutaCategoria'));

// Ruta protegida (perfil del usuario)
app.get('/api/usuarios/perfil', middlewareAutenticacion, (req, res) => {
    res.status(200).json({ mensaje: 'Perfil de usuario', usuario: req.user });
});

// Middleware para rutas no encontradas
app.use((req, res, next) => {
    res.status(404).json({ mensaje: 'Ruta no encontrada' });
});

// Middleware para manejo de errores
app.use((error, req, res, next) => {
    console.error(error.stack);
    res.status(500).json({ mensaje: 'Error en el servidor', error: error.message });
});

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});