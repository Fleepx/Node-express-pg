const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const PORT = 3000;

// Configuración de middlewares
app.use(cors());
app.use(bodyParser.json());

// Configuración de PostgreSQL
const pool = new Pool({
    user: 'tu_usuario',  // Cambia a tu usuario de PostgreSQL
    host: 'localhost',
    database: 'likeme',
    password: 'tu_contraseña',  // Cambia a tu contraseña de PostgreSQL
    port: 5432,
});

// Rutas del servidor
app.get('/', (req, res) => {
    res.send('Servidor corriendo...');
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
