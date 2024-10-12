const Server = require('./models/server');

const server = new Server();
server.listen();





//200: Éxito. La solicitud se completó con éxito y se obtuvo una respuesta válida del servidor.
  
//400: Error de solicitud. Indica que la solicitud del cliente no pudo ser entendida por el servidor debido a problemas como datos faltantes o incorrectos.

//410: Recurso eliminado. Significa que el recurso solicitado ha sido eliminado permanentemente del servidor y ya no está disponible.

