

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
