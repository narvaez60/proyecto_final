
const { response, request } = require('express');

// Función para ver la información de la tienda
const viewStore = async (req = request, res = response) => {
    const responseData = {
        'msg': 'Información de la tienda',
        'nombre': 'Tienda Narvaez',
        'lugar': 'Ciudad de Pasto'
    };
    
    // Enviar la respuesta JSON formateada con 4 espacios de sangría
    res.send(`<pre>${JSON.stringify(responseData, null, 4)}</pre>`);
};


// Función para crear una nueva tienda
const createStore = (req, res = response) => {
    const { nombre, lugar } = req.body;

    if (!nombre || !lugar) {
        return res.status(400).json({
            msg: 'Nombre y lugar de la tienda requeridos' // _Mensaje de error si no se proporcionan el nombre y el lugar de la tienda_
        });
    }

    res.status(201).json({
        msg: 'Tienda creada exitosamente', // _Mensaje indicando que la tienda se creó correctamente_
        nombre,
        lugar
    });
};

// Función para actualizar una tienda existente
const updateStore = (req, res = response) => {
    const { id } = req.params;
    const { nombre, lugar } = req.body;

    if (!nombre || !lugar) {
        return res.status(400).json({
            msg: 'Nombre y lugar de la tienda requeridos' // _Mensaje de error si no se proporcionan el nombre y el lugar de la tienda_
        });
    }

    res.status(200).json({
        msg: 'Tienda actualizada exitosamente', // _Mensaje indicando que la tienda se actualizó correctamente_
        id,
        nombre,
        lugar
    });
};

// Función para eliminar una tienda existente
const deleteStore = (req, res = response) => {
    const { id } = req.params;
    res.status(410).json({
        msg: 'Tienda eliminada exitosamente', // _Mensaje indicando que la tienda se eliminó correctamente_
        id
    });
};

module.exports = {
    viewStore,
    createStore,
    updateStore,
    deleteStore,
};
