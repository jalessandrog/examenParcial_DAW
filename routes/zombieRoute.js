const express = require('express');
const router = express.Router();

// const isAuth = require('../middlewares/is-Auth');
const zombiesController = require('../controllers/zombiesController')

router.get('/historial/:id', zombiesController.historial);
router.get('/add', zombiesController.add);
router.post('/add', zombiesController.processAdd);

router.get('/editar/:id', zombiesController.update);
router.post('/editar/:id', zombiesController.processUpdate);

router.post('/search', zombiesController.search);


router.get('/', zombiesController.index);
router.get('/registros', zombiesController.registrosZombies);

router.get('/error', zombiesController.error);


module.exports = router;