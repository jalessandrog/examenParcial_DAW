const express = require('express');
const router = express.Router();

// const isAuth = require('../middlewares/is-Auth');
const zombiesController = require('../controllers/zombiesController')

// router.get('/add', isAuth, nameController.add);
// router.post('/add', isAuth, nameController.processAdd);

// router.get('/editar/:id', isAuth, nameController.update);
// router.post('/editar/:id', isAuth, nameController.processUpdate);

// router.post('/search', nameController.search);

// router.get('/detalle/:id', nameController.detalle);
router.get('/', zombiesController.index);

router.get('/error', zombiesController.error);


module.exports = router;