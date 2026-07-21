const express = require('express');
const router = express.Router();
const pool = require('../db/connection');

// GET /tickets - Obtener todos los tickets
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tickets ORDER BY fecha_creacion DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /tickets/:id - Obtener un ticket
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM tickets WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ msg: 'Ticket no encontrado' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /tickets - Crear ticket
router.post('/', async (req, res) => {
  try {
    const { titulo, descripcion, categoria, prioridad } = req.body;
    const result = await pool.query(
      'INSERT INTO tickets (titulo, descripcion, categoria, prioridad) VALUES ($1, $2, $3, $4) RETURNING *',
      [titulo, descripcion, categoria, prioridad]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /tickets/:id - Actualizar ticket
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, descripcion, categoria, prioridad, estado } = req.body;
    const result = await pool.query(
      'UPDATE tickets SET titulo=$1, descripcion=$2, categoria=$3, prioridad=$4, estado=$5 WHERE id=$6 RETURNING *',
      [titulo, descripcion, categoria, prioridad, estado, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /tickets/:id - Eliminar ticket
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM tickets WHERE id = $1', [id]);
    res.json({ msg: 'Ticket eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;