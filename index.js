const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

// CREAR SERVIDOR
const app = express();

// CONECTAMOS A LA BASE DE DATOS
conectarDB();

app.use(bodyParser.json());

app.use(cors())

app.use('/images', express.static(path.join('images')));

app.use(express.json());

app.use('/api/mercados-mediavales', require('./routes/eventos'))

app.listen(5038, () => {
  console.log('Conectado');
})