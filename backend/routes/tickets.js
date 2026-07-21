const express = require("express");
const router = express.Router();
const pool = require("../db/connection");

// Obtener todos los tickets
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM tickets ORDER BY id DESC"
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: error.message });
  }
});

// Obtener un ticket por ID
router.get("/:id", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM tickets WHERE id = $1",
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        mensaje: "Ticket no encontrado",
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: error.message });
  }
});

// Crear ticket
router.post("/", async (req, res) => {
  try {
    const {
      titulo,
      descripcion,
      categoria,
      prioridad,
      estado,
    } = req.body;

    const result = await pool.query(
      `INSERT INTO tickets
      (titulo, descripcion, categoria, prioridad, estado)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *`,
      [titulo, descripcion, categoria, prioridad, estado]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: error.message });
  }
});

// Actualizar ticket
router.put("/:id", async (req, res) => {
  try {
    const {
      titulo,
      descripcion,
      categoria,
      prioridad,
      estado,
    } = req.body;

    const result = await pool.query(
      `UPDATE tickets
       SET titulo = $1,
           descripcion = $2,
           categoria = $3,
           prioridad = $4,
           estado = $5
       WHERE id = $6
       RETURNING *`,
      [
        titulo,
        descripcion,
        categoria,
        prioridad,
        estado,
        req.params.id,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        mensaje: "Ticket no encontrado",
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: error.message });
  }
});

// Eliminar ticket
router.delete("/:id", async (req, res) => {
  try {
    const result = await pool.query(
      "DELETE FROM tickets WHERE id = $1 RETURNING *",
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        mensaje: "Ticket no encontrado",
      });
    }

    res.json({
      mensaje: "Ticket eliminado correctamente",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: error.message });
  }
});

module.exports = router;