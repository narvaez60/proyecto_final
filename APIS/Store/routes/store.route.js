const { Router } = require('express');
const { viewStore, createStore, updateStore, deleteStore } = require('../controllers/store.controller');

const routerStore = Router();

routerStore.get('', viewStore);
routerStore.post('', createStore);
routerStore.put('/:id', updateStore);
routerStore.delete('/:id', deleteStore);

module.exports = routerStore;
