const request = require('supertest');
const Server = require('../models/server');

const server = new Server();

// Pruebas para obtener información de la tienda
describe('GET /api/store', () => {
    test('respuesta código 200', async () => {
        const response = await request(server.app).get('/api/store').send();
        expect(response.statusCode).toBe(200);
    });

    test('respuesta contiene información de la tienda', async () => {
        const response = await request(server.app).get('/api/store').send();
        expect(response.body).toHaveProperty('msg', 'Información de la tienda');
        expect(response.body).toHaveProperty('nombre');
        expect(response.body).toHaveProperty('lugar');
    });

    test('tipo de contenido es JSON', async () => {
        const response = await request(server.app).get('/api/store').send();
        expect(response.headers['content-type']).toMatch('application/json');
    });
});

// Pruebas para crear una nueva tienda
describe("POST /api/store", () => {
    test("Crear tienda", async () => {
        const storeData = {
            nombre: "Nueva tienda",
            lugar: "Ciudad Nueva"
        };

        const response = await request(server.app)
            .post('/api/store')
            .send(storeData);
        
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('msg', 'Tienda creada exitosamente');
        expect(response.body).toHaveProperty('nombre', storeData.nombre);
        expect(response.body).toHaveProperty('lugar', storeData.lugar);
    });

    test('Intentar crear tienda sin nombre y lugar', async () => {
        const response = await request(server.app)
            .post('/api/store')
            .send({});
        expect(response.statusCode).toBe(400);
    });
});

// Pruebas para actualizar una tienda existente
describe("PUT /api/store/:id", () => {
    test("Actualizar tienda existente", async () => {
        const storeId = 1;
        const updatedStore = {
            nombre: "Tienda actualizada",
            lugar: "Ciudad Actualizada"
        };

        const response = await request(server.app)
            .put(`/api/store/${storeId}`)
            .send(updatedStore);
        
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('nombre', updatedStore.nombre);
        expect(response.body).toHaveProperty('lugar', updatedStore.lugar);
    });

    test("Intentar actualizar tienda con datos incorrectos", async () => {
        const storeId = 1;
        const updatedStore = {
            descripcion: "Tienda actualizada" 
        };

        const response = await request(server.app)
            .put(`/api/store/${storeId}`)
            .send(updatedStore);
        
        expect(response.statusCode).toBe(400);
    });

    test("Intentar actualizar tienda con ID no existente", async () => {
        const nonExistentStoreId = 9999;
        const updatedStore = {
            nombre: "Tienda actualizada",
            lugar: "Ciudad Actualizada"
        };

        const response = await request(server.app)
            .put(`/api/store/${nonExistentStoreId}`)
            .send(updatedStore);
        
        expect(response.statusCode).toBe(200);
    });
});

// Pruebas para eliminar una tienda existente
describe("DELETE /api/store/:id", () => {
    test("Eliminar tienda existente", async () => {
        const storeId = 1;

        const response = await request(server.app)
            .delete(`/api/store/${storeId}`);
        
        expect(response.statusCode).toBe(410);
    });

    test("Intentar eliminar tienda con ID inválido", async () => {
        const invalidStoreId = 'abc';

        const response = await request(server.app)
            .delete(`/api/store/${invalidStoreId}`);
        
        expect(response.statusCode).toBe(410);
    });

    test("Intentar eliminar tienda con ID no existente", async () => {
        const nonExistentStoreId = 9999;

        const response = await request(server.app)
            .delete(`/api/store/${nonExistentStoreId}`);
        
        expect(response.statusCode).toBe(410);
    });
});

// Prueba para verificar si se devuelve un error 404 al intentar acceder a una ruta no válida
describe('GET /api/nonexistent', () => {
    test('respuesta código 404', async () => {
        const response = await request(server.app).get('/api/nonexistent').send();
        expect(response.statusCode).toBe(404);
    });
});
