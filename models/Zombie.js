const db = require('../util/database');

module.exports = class zombie {


    //* Este método servirá para guardar de manera persistente el nuevo objeto. 
    static registrarZombie(NombreCompleto, idEstado) {
        return db.execute('INSERT INTO zombie (NombreCompleto) VALUES (?)',[NombreCompleto]).then(()=>{
            return db.execute('INSERT INTO historial (idZombie, idEstado, FechaMetamorfosis) VALUES (last_insert_id(), ?, NOW())',[idEstado])
        })
    }

    // static asignarEstado(idZombie, idEstado) {
    //     return db.execute('INSERT INTO historial (idZombie, idEstado) VALUES (?,?, NOW())',[idZombie, idEstado])
    // }

    static fetchAll() {
        return db.execute('SELECT zombie.idZombie, zombie.NombreCompleto, estados.Estado, historial.FechaMetamorfosis FROM zombie, estados, historial WHERE zombie.idZombie = historial.idZombie AND estados.idEstado = historial.idEstado GROUP BY zombie.NombreCompleto')
    }

    static fetchOne(idZombie){ 
        return db.execute('SELECT zombie.NombreCompleto, estados.Estado, historial.FechaMetamorfosis FROM zombie, estados, historial WHERE zombie.idZombie = historial.idZombie AND estados.idEstado = historial.idEstado AND zombie.idZombie = ?', [idZombie])
    }

    static historialEstados(idZombie){
        return db.execute('SELECT historial.idZombie, historial.idEstado, historial.FechaMetamorfosis, estados.Estado FROM historial, zombie, estados WHERE historial.idZombie = zombie.idZombie AND estados.idEstado = historial.idEstado AND  historial.idZombie = ?',[idZombie])
    }


    static estadisticas(){
        return db.execute ('SELECT COUNT(historial.idEstado) as "Numero Infectados" FROM historial, zombie, estados WHERE zombie.idZombie = historial.idZombie AND estados.idEstado = historial.idEstado GROUP BY historial.idEstado HAVING COUNT(historial.idEstado) AND historial.idEstado = 1')
    }


    // UPDATE
    static updateFase(idZombie, idEstado){
        return db.execute('CALL updateFase (?, ?, NOW())',  [idZombie, idEstado])
    }
}