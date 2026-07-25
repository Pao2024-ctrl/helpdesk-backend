const express = require("express");
const router = express.Router();

router.post("/login", (req, res) => {
    const { correo, password } = req.body;

    if (!correo || !password) {
        return res.status(400).json({
            mensaje: "Debe ingresar correo y contraseña"
        });
    }

    res.status(200).json({
        mensaje: "Inicio de sesión exitoso"
    });
});

module.exports = router;