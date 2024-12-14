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


exports.routeToMonolith = async (req, res) => {
  const { method, path, body } = req;

  console.log(`Routing request to monolith: ${method} http://localhost:80${path}`);

  try {
    const response = await axios({
      method,
      url: `http://localhost:80${path}`, // URL del monolito
      data: body
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error routing to monolith:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
      res.status(error.response.status).json(error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.request);
      res.status(500).json({ message: 'No response received from monolith' });
    } else {
      console.error('Error setting up request:', error.message);
      res.status(500).json({ message: 'Error setting up request to monolith' });
    }
  }
};