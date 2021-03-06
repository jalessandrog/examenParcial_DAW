const Zombie = require('../models/Zombie');

const controller = {
    index:(req, res, next) => {
        Zombie.totalZombie()
        .then(([total, fieldData]) => {
            console.log(total)
            Zombie.fetchAll()
            .then(([rows, fieldData]) => {
                console.log(rows)
                Zombie.estadisticas(1)
                .then(([infeccion, fieldData])=>{
                    Zombie.estadisticas(2)
                    .then(([desorientado, fieldData])=>{
                        Zombie.estadisticas(3)
                        .then(([violencia, fieldData])=>{
                            Zombie.estadisticas(4)
                            .then(([desmayo, fieldData])=>{
                                Zombie.estadisticas(5)
                                .then(([transformacion, fieldData])=>{
                                    res.render('index', {
                                        total: total[0],
                                        lista_zombies: rows,
                                        infeccion: infeccion[0],
                                        desorientado: desorientado[0],
                                        violencia:violencia[0],
                                        desmayo:desmayo[0],
                                        transformacion:transformacion[0]
                                    });
                                })
                            })
                        })
                    })
                })
            })
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
                res.status(302).redirect('/registros');
            })
            .catch(err => {
                console.log(err);
                res.status(302).redirect('/error');
            });
    },

    historial:(req, res, next) => {
        console.log('Ruta Historial Clinico')
        Zombie.fetchOne(req.params.id)
        .then(([rows, fieldData]) => {
            console.log(rows);
            Zombie.historialEstados(req.params.id)
            .then(([estados, fieldData])=>{
                console.log(estados)
                res.render('historialClinico', {
                    zombie: rows[0],
                    lista_Estados: estados,
                });
            })
            .catch(err => {
                console.log(err);
                res.status(302).redirect('/error');
            });
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
        console.log("Ruta Procesando Actualizaci??n de Fase")
        console.log('actualizando Fase...')
        console.log('ID: '+ +' Correspondiente a: '+req.body.NombreCompleto)
        
        console.log(req.body)
        Zombie.updateFase(req.params.id, req.body.Estado)
            .then( () => {
                console.log('Actualizaci??n con exito')
                res.status(302).redirect('/');
            })
            .catch(err => {
                console.log(err);
                console.log('Error al actualizar Fase')
                res.status(302).redirect('/error');
            });
    },

    search:(req, res, next) => {
        console.log(req.body.query)
        Zombie.buscar(req.body.query)
            .then(([rows, fieldData]) => {
                res.status(200).json({rows});
            }).catch(err => {
                console.log(err);
                res.status(302).json({error: err});
            });
    },

    error:(req, res, next) => {
        res.render('error')
    }
}
module.exports = controller;
