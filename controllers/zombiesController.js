const Zombie = require('../models/Zombie');

const controller = {
    index:(req, res, next) => {
        Zombie.fetchAll()
            .then(([rows, fieldData]) => {
                console.log(rows)
                res.render('index', {
                    lista_zombies: rows,
                });
            })
            .catch(err => {
                console.log(err);
                res.status(302).redirect('/error');
            });
    },

    registrosZombies:(req, res, next) => {
        Zombie.fetchAll()
            .then(([rows, fieldData]) => {
                console.log(rows)
                res.render('registrosZombies', {
                    lista_zombies: rows,
                });
            })
            .catch(err => {
                console.log(err);
                res.status(302).redirect('/error');
            });
    },

    add:(req, res, next) => {
        res.render('RegistrarZombie')
    },

    processAdd:(req, res, next) => {
        res.setHeader('Set-Cookie', 'ultimaPersonaInfectadaRegistrada='+req.body.NombreCompleto+'; HttpOnly');
        console.log('Registrando...'+req.body.NombreCompleto)
        console.log(req.body)
        Zombie.registrarZombie(req.body.NombreCompleto, req.body.Estado)
            .then( () => {
                console.log('Registro con exito')
                res.status(302).redirect('/');
            })
            .catch(err => {
                console.log(err);
                res.status(302).redirect('/error');
            });
    },

    update:(req, res, next) => {
        console.log("Ruta Editar Fase de zombie con ID ")
        Zombie.fetchOne(req.params.id)
            .then(([rows, fieldData]) => {
                res.render('ActualizarRegistro', {
                    zombie: rows[0],
                });
            })
            .catch(err => {
                res.status(302).redirect('/error');
            });
    },

    processUpdate: (req, res, next) => {
        
        console.log("Ruta Procesando Actualización de Fase")
        console.log('actualizando Fase...')
        console.log('ID: '+ +' Correspondiente a: '+req.body.NombreCompleto)
        
        console.log(req.body)
        Zombie.updateFase(req.params.id, req.body.Estado)
            .then( () => {
                console.log('Actualización con exito')
                res.status(302).redirect('/');
            })
            .catch(err => {
                console.log(err);
                console.log('Error al actualizar Fase')
                res.status(302).redirect('/error');
            });
    },

    error:(req, res, next) => {
        res.render('error')
    }
}
module.exports = controller;
