/*
  Events routes
  host + /api/events/
*/
const { Router } = require('express');
const router = Router();
const { validarJWT } = require("../middlewares/validar-jwt");
const { getEventos, crearEvento, actualizarEvento, borrarEvento } = require('../controllers/events');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { isDate } = require('../helpers/isDate');

// Aplica el middleware en todas las rutas
router.use(validarJWT);

// Obtener eventos
router.get('/', getEventos );

// Crear evento
router.post('/', [
  check('title', 'El título es obligatorio').not().isEmpty(),
  check('start', 'La fecha de inicio es obligatoria').custom(isDate),
  check('start', 'La fecha de finalización es obligatoria').custom(isDate),
  validarCampos
], crearEvento);

// Actualizar evento
router.put('/:id', [
  check('title', 'El título es obligatorio').not().isEmpty(),
  check('start', 'La fecha de inicio es obligatoria').custom(isDate),
  check('start', 'La fecha de finalización es obligatoria').custom(isDate),
  validarCampos
], actualizarEvento );

// Borrar evento
router.delete('/:id', borrarEvento );

module.exports = router;
