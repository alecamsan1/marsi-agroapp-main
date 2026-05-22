import express from 'express';
import cors from 'cors';
import Datastore from 'nedb-promises';

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// Base de datos persistente en la raíz
//  ASÍ ES LO CORRECTO

const BASE_API_URL = "/api/v1/marsi-agroapp";
const db = Datastore.create({ filename: './marsi-agroapp.db', autoload: true });
// Endpoint de prueba / Datos iniciales
app.get(`${BASE_API_URL}/loadInitialData`, async (req, res) => {
    const docs = await db.find({});
    if (docs.length === 0) {
        await db.insert([
            { province: "sevilla", year: 2026, surface: 15000, production: 45000 },
            { province: "huelva", year: 2026, surface: 8000, production: 32000 }
        ]);
        return res.status(201).send("Datos iniciales cargados.");
    }
    res.status(400).send("Ya hay datos.");
});

// GET global
app.get(BASE_API_URL, async (req, res) => {
    const data = await db.find({});
    res.json(data);
});
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Hace que Express sirva los archivos de la app compilada por Vite
app.use(express.static(path.join(__dirname, './dist')));

// Cualquier ruta que no sea de la API, cargará el frontend de React
app.get('(.*)', (req, res) => {
  res.sendFile(path.join(__dirname, './dist/index.html'));
});
app.listen(port, () => {
    console.log(`Backend de MARSI corriendo en http://localhost:${port}`);
});