const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

const pool = new Pool({
    user: 'felipe',  
    host: 'localhost',
    database: 'likeme',
    password: 'admin123',  
    port: 5432,
});

app.get('/posts', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM posts');
        res.json(result.rows);
    } catch (error) {
        console.error('Error obteniendo los posts:', error);
        res.status(500).send('Error en el servidor');
    }
});

app.post('/posts', async (req, res) => {
    const { titulo, img, descripcion, likes } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4) RETURNING *',
            [titulo, img, descripcion, likes]
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error creando un nuevo post:', error);
        res.status(500).send('Error en el servidor');
    }
});

app.delete('/posts/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM posts WHERE id = $1 RETURNING *', [id]);
        if (result.rowCount === 0) {
            return res.status(404).send('Post no encontrado');
        }
        res.json({ message: 'Post eliminado', post: result.rows[0] });
    } catch (error) {
        console.error('Error eliminando el post:', error);
        res.status(500).send('Error en el servidor');
    }
});

app.put('/posts/:id', async (req, res) => {
    const { id } = req.params;
    const { titulo, img, descripcion, likes } = req.body;
    try {
        const result = await pool.query(
            'UPDATE posts SET titulo = $1, img = $2, descripcion = $3, likes = $4 WHERE id = $5 RETURNING *',
            [titulo, img, descripcion, likes, id]
        );
        if (result.rowCount === 0) {
            return res.status(404).send('Post no encontrado');
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error actualizando el post:', error);
        res.status(500).send('Error en el servidor');
    }
});


app.get('/', (req, res) => {
    res.send('Servidor corriendo...');
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});