const express = require("express");
const cors = require("cors");
require("dotenv").config();

const pool = require("./db/connection");

// Importar las rutas
const ticketRoutes = require("./routes/tickets");
const authRoutes = require("./routes/auth");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta principal
app.get("/", (req, res) => {
    res.send("API HelpDesk funcionando correctamente");
});

// Rutas de la API
app.use("/tickets", ticketRoutes);
app.use("/auth", authRoutes);

// Puerto
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});