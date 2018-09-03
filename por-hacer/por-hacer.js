const fs = require('fs');

let listadoPorHacer = [];


const guardarDb = () => {
    let data = JSON.stringify(listadoPorHacer);

    let rpta = fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('No se pudo grabar', err);

    });
}

const crear = (descripcion) => {

    cargarDb();

    let porHacer = {
        descripcion,
        completado: false
    };
    listadoPorHacer.push(porHacer);
    guardarDb();
    return porHacer;

}

const cargarDb = () => {

    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }


    //console.log(listadoPorHacer);
}

const getListado = (completado) => {

    cargarDb();
    //console.log(completado);
    let nuevoListado = listadoPorHacer.filter(tarea => tarea.completado === completado);
    listadoPorHacer = nuevoListado
    return listadoPorHacer;

}

const actualizar = (descripcion, completado = true) => {
    cargarDb();
    let index = listadoPorHacer.findIndex(tarea => {
        return tarea.descripcion === descripcion;
    });
    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDb();
        return true;
    } else {
        return false;
    }
}

const borrar = (descripcion) => {
    cargarDb();

    let nuevoListado = listadoPorHacer.filter(tarea => tarea.descripcion !== descripcion);

    if (listadoPorHacer.length === nuevoListado.length) {
        return false;
    } else {
        listadoPorHacer = nuevoListado;
        guardarDb();
        return true;
    }


    /*TAMBIEN FUNCIONA
    let index = listadoPorHacer.findIndex(tarea => {
        return tarea.descripcion === descripcion;
    });
    if (index >= 0) {
        listadoPorHacer.splice(index, 1);
        guardarDb();
        return true;
    } else {
        return false;
    }
    */
}



module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}