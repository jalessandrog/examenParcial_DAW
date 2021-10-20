const db = require('../util/database');

module.exports = class zombie {

    constructor(NombreCompleto, Estado, idFases) {
        this.NombreCompleto = NombreCompleto;
        this.Estado = Estado;
        this.idFases = idFases;
    }

    //* Este método servirá para guardar de manera persistente el nuevo objeto. 
    // save(NombreCompleto, Estado, idFases) {
    //     return db.execute('INSERT INTO zombie (NombreCompleto, Estado, idFases) VALUES (?, ?, ?)',[NombreCompleto, Estado, idFases]).then(()=>{
    //         return db.execute ('INSERT INTO historialfases (FechaMetamorfosis) VALUES (NOW())')
    //     })
    // }

    static fetchAll() {
        return db.execute('SELECT zombie.NombreCompleto, zombie.Estado, historialfases.FechaMetamorfosis  FROM zombie, historialfases WHERE zombie.idFases = historialfases.idFases')
    }

    // static update(id, nombre, profesion, pais, resenia){
    //     return db.execute('UPDATE heroes SET nombre = ?, profesion = ?, pais = ?, resenia = ? WHERE id = ? ',
    //         [id, nombre, profesion, pais, resenia]);
    // }


    // static fetchOne(id){
    //     return db.execute('SELECT * FROM data_base WHERE id = ?', [id]);
    // }

    // static buscar(query){
    //     return db.execute('SELECT * FROM data_base WHERE atributo1 LIKE ? OR atributo2 LIKE ? OR atributo3 LIKE ? ', ['%'+query+'%', '%'+query+'%', '%'+query+'%']);
    // }
}