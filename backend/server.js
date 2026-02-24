require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3000;

// Simulación de base de datos
const fakeUser = {
    id: 1,
    email: "admin@gmail.com",
    password: bcrypt.hashSync("Password1!", 10) 
};

// Ruta login
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    //  Verificar si el usuario existe
    if (email !== fakeUser.email) {
        return res.status(400).json({ message: "Usuario no encontrado" });
    }

    // Comparar contraseña encriptada
    const validPassword = await bcrypt.compare(password, fakeUser.password);

    if (!validPassword) {
        return res.status(400).json({ message: "Contraseña incorrecta" });
    }

    // Generar JWT
    const token = jwt.sign(
        { id: fakeUser.id, email: fakeUser.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );

    // Enviar token al frontend
    res.json({ token });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});