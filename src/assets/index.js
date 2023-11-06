import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';

const app = express();
const port = 3002;

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'lista_tareas',
};

app.use(cors());
app.use(express.json()); 

app.get('/tarea', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute('SELECT * FROM tareas');
    await connection.end();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener tareas' });
  }
});

app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});



app.post('/agregar-tarea', async (req, res) => {
  const { nombre, descripcion, estado } = req.body;


  if (!nombre || !descripcion || !estado) {
    return res.status(400).json({ error: 'Por favor, proporcione nombre, descripción y estado.' });
  }

  try {
    const connection = await mysql.createConnection(dbConfig);
    await connection.execute('INSERT INTO tareas (nombre, descripcion, estado) VALUES (?, ?, ?)', [
      nombre,
      descripcion,
      estado,
    ]);
    await connection.end();
    res.status(200).json({ message: 'Tarea agregada correctamente.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al agregar la tarea.' });
  }
});



app.delete('/eliminar-tarea/:id', async (req, res) => {
  const taskId = req.params.id;

  try {
    const connection = await mysql.createConnection(dbConfig);
    await connection.execute('DELETE FROM tareas WHERE id = ?', [taskId]);
    await connection.end();
    res.status(200).json({ message: 'Tarea eliminada correctamente.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar la tarea.' });
  }
});
