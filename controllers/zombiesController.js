const Zombie = require('../models/Zombie');

const controller = {
    index:(req, res, next) => {
        Zombie.fetchAll()
        .then(([rows, fieldData]) => {
            res.render('index', {
                lista_zombies: rows,
            });
        })
        .catch(err => {
            console.log(err);
            res.status(302).redirect('/error');
        });
    },

    // search:(req, res, next) => {
    //     // console.log(req.body.query)
    //     Model.buscar(req.body.query)
    //         .then(([rows, fieldData]) => {
    //             res.status(200).json({rows});
    //         }).catch(err => {
    //             console.log(err);
    //             res.status(302).json({error: err});
    //         });
    // },

    // detalle:(req, res, next) => {
    //     Model.fetchOne(req.params.id)
    //     .then(([rows, fieldData]) => {
    //         // console.log(rows);
    //         res.render('vista', {
    //             // isLoggedIn: req.session.isLoggedIn,
    //             // email: req.session.email, 
    //             lista: rows[0],
    //         });
    //     })
    //     .catch(err => {
    //         console.log(err);
    //         res.status(302).redirect('/error');
    //     });
    // },

    // add:(req, res, next) => {
    //     res.render('vista',{ 
    //     // isLoggedIn: req.session.isLoggedIn,
    //     // email: req.session.email, 
    //     })
    // },

    // processAdd:(req, res, next) => {
    //     res.setHeader('Set-Cookie', 'nombreCookie='+req.body.ATRIBUTO+'; HttpOnly');
    //     const objeto = new Model(req.body.ATRIBUTO, req.body.ATRIBUTO, req.body.ATRIBUTO, "avatar.jpg");
    //     objeto.save()
    //         .then( () => {
    //             res.status(302).redirect('/');
    //         })
    //         .catch(err => {
    //             console.log(err);
    //             res.status(302).redirect('/error');
    //         });
    // },

    // update:(req, res, next) => {
    //     Model.fetchOne(req.params.id)
    //     .then(([rows, fieldData]) => {
    //         // console.log(rows);
    //         res.render('vista', {
    //             // isLoggedIn: req.session.isLoggedIn,
    //             // email: req.session.email, 
    //             lista: rows[0],
    //         });
    //     })
    //     .catch(err => {
    //         res.status(302).redirect('/error');
    //     });
    // },

    // processUpdate: (req, res, next) => {
    //     console.log('actualizando...')
    //     console.log('ID: '+req.params.id+' Correspondiente a: '+req.body.ATRIBUTO)
    //     Model.update(req.body.ATRIBUTO, req.body.ATRIBUTO, req.body.ATRIBUTO, "avatar.jpg", req.params.id)
    //         .then( () => {
    //             console.log('Actualización con exito!!')
    //             res.status(302).redirect('/');
    //         })
    //         .catch(err => {
    //             res.status(302).redirect('/error');
    //         });
    // },

    error:(req, res, next) => {
        res.render('error')
    }
}
module.exports = controller;
