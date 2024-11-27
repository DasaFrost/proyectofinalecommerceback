const express = require('express');
const router = express.Router();
const controladorOrden = require('../Controladores/controladorOrden');


router.post('/:usuarioId/crear', controladorOrden.crearOrdenDesdeCarrito); 
router.get('/:usuarioId/orden/:ordenId', controladorOrden.obtenerOrden); 


module.exports = router;
