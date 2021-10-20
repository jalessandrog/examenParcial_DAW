const express = require('express');
const router = express.Router();

// const isAuth = require('../middlewares/is-Auth');
const zombiesController = require('../controllers/zombiesController')

router.get('/add', zombiesController.add);
router.post('/add', zombiesController.processAdd);

router.get('/editar/:id', zombiesController.update);
router.post('/editar/:id', zombiesController.processUpdate);

// router.post('/search', nameController.search);

// router.get('/detalle/:id', nameController.detalle);
router.get('/', zombiesController.index);
router.get('/registros', zombiesController.registrosZombies);

router.get('/error', zombiesController.error);


module.exports = router;