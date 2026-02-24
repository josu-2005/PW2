const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const SECRET_KEY = "mi_clave_secreta_super_segura";

app.post("/login", (req, res) => {

    const { email, password } = req.body;

    if(!email || !password){
        return res.status(400).json({ message: "Datos incompletos" });
    }

    // Simulación de validación exitosa //
    const payload = {
        email: email,
        role: "user"
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });

    res.json({ token });
});

app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});