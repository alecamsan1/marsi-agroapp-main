const express = require("express");
const cors = require("cors");
const path = require("path");
const DataStore = require("nedb"); // Asegúrate de tener nedb en tu package.json

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// --- CONFIGURACIÓN DE TU BASE DE DATOS ---
const dbPath = path.join(__dirname, "src/back/marsi-agroapp.db");
const db = new DataStore({ filename: dbPath, autoload: true });

// --- CONEXIÓN DE TU API ---
// Requerimos tu archivo del back y le pasamos la app de Express y la BD
require("./src/back/marsi-agroapp.js")(app, db);

// Sirve los archivos estáticos del frontend que compilaremos luego con Svelte
app.use("/", express.static("./public"));

app.listen(port, () => {
    console.log(`Servidor de SOS escuchando en el puerto ${port}`);
});