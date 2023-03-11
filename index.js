const express = require('express');
require('dotenv').config();
const { dbCollection } = require('./database/config');
const cors = require('cors');


// Crear el servidor de express
const app = express();

// Base de datos
dbCollection();

// Cors
app.use(cors());

// Directorio publico
app.use( express.static('public') );

// Lectura y parseo del body
app.use( express.json() ); 

// Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));
// app.get('/', (req, res) => {
//   res.json({
//     ok: true
//   })
// })

// Escuchar peticiones
app.listen( process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
});