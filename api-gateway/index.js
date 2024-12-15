const app = require('./src/app'); // Importa la aplicación desde src/app.js
require('dotenv').config();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`API Gateway corriendo en el puerto ${PORT}`);
});
