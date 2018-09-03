const descripcion = {
    alias: 'd',
    demand: true,
    desc: "La descrpcion de la tarea por hacer"
};

const completado = {
    alias: 'c',
    default: true,
    desc: "Marca como completado o como pendiente la tarea"
}


const argv = require('yargs')
    .command('listar', 'lista los elementos por hacer', {
        completado
    })
    .command('crear', 'Crea un elemento por hacer', {
        descripcion
    })
    .command('actualizar', 'Actualiza el estado completado de una tarea', {
        descripcion,
        completado
    })
    .command('borrar', 'Elimina un elemento por hacer', {
        descripcion
    })
    .help()
    .argv;


module.exports = {
    argv
}