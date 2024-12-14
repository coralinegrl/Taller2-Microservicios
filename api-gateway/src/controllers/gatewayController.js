const axios = require('axios');
const userClient = require('../grpc/userClient');

// 🔥 Redireccionar solicitudes a User Service (usando gRPC)
exports.routeToUserService = (req, res) => {
  const { method, path, body } = req;

  const grpcMethodName = path.split('/')[1]; // Obtiene el nombre del método a llamar (por ejemplo, "CreateUser")

  console.log(`📡 Enviando solicitud a UserService: ${grpcMethodName}`);

  userClient.makeRequest(grpcMethodName, body, (error, response) => {
    if (error) {
      console.error('❌ Error en UserService:', error.message);
      res.status(500).json({ error: error.message });
    } else {
      res.json(response);
    }
  });
};

// 🔥 Redireccionar solicitudes al Monolito (usando HTTP)
exports.routeToMonolith = async (req, res) => {
  const { method, path, body } = req;

  try {
    const response = await axios({
      method,
      url: `http://localhost:80${path}`, // URL del monolito
      data: body
    });
    res.json(response.data);
  } catch (error) {
    console.error('❌ Error al conectar con el Monolito:', error.message);
    res.status(500).json({ error: error.message });
  }
};
