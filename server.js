import express from 'express';
import cors from 'cors';
import { Datastore } from 'nedb-promises'; // Versión moderna para módulos ES

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// Base de datos persistente en la raíz
const db = Datastore.create({ filename: './marsi-agroapp.db', autoload: true });

const BASE_API_URL = "/api/v1/marsi-agroapp";

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

app.listen(port, () => {
    console.log(`Backend de MARSI corriendo en http://localhost:${port}`);
});