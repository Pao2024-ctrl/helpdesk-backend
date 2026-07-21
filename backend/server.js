const express = require("express");
const cors = require("cors");
require("dotenv").config();

const pool = require("./db/connection");
const ticketRoutes = require("./routes/tickets");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API HelpDesk funcionando correctamente");
});

// Rutas de tickets
app.use("/tickets", ticketRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});