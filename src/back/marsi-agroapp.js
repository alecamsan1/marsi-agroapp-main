module.exports = function(app, db) {
    const BASE_API_URL = "/api/v1/marsi-agroapp";

    // 1. DATOS INICIALES (Para pruebas rápidas del prototipo)
    const initialAgroData = [
        { province: "sevilla", year: 2024, surface: 15000, production: 45000, category: "frutas", status: "alta" },
        { province: "huelva", year: 2024, surface: 8000, production: 32000, category: "frutas", status: "media" },
        { province: "almeria", year: 2023, surface: 22000, production: 95000, category: "hortalizas", status: "alta" },
        { province: "cordoba", year: 2023, surface: 12000, production: 28000, category: "olivar", status: "baja" }
    ];

    // ==========================================
    // C.R.U.D. Y ENDPOINTS DE LA API
    // ==========================================

    // GET /loadInitialData -> Inicializa el catálogo si está vacío
    app.get(`${BASE_API_URL}/loadInitialData`, (req, res) => {
        db.find({}, (err, docs) => {
            if (err) return res.status(500).send("Error en la base de datos");
            if (docs.length === 0) {
                db.insert(initialAgroData, (errInsert) => {
                    if (errInsert) return res.status(500).send("Error al insertar");
                    return res.status(201).json(initialAgroData);
                });
            } else {
                return res.status(400).send("La base de datos ya contiene registros.");
            }
        });
    });

    // GET global -> Soporta la búsqueda, filtros del catálogo y paginación
    app.get(BASE_API_URL, (req, res) => {
        let query = {};
        
        // Filtros dinámicos basados en los inputs del prototipo (ej: buscador o categorías)
        if (req.query.province) query.province = req.query.province.toLowerCase();
        if (req.query.year) query.year = parseInt(req.query.year);
        if (req.query.category) query.category = req.query.category.toLowerCase();

        // Paginación (Por si el catálogo de tu diseño tiene scroll o páginas)
        let offset = parseInt(req.query.offset) || 0;
        let limit = parseInt(req.query.limit) || 10;

        db.find(query).skip(offset).limit(limit).exec((err, data) => {
            if (err) return res.status(500).send("Error al recuperar datos");
            
            // Limpiamos el identificador interno de NeDB antes de enviar al frontend
            const cleanedData = data.map(d => { delete d._id; return d; });
            res.status(200).json(cleanedData);
        });
    });

    // GET específico -> Al pulsar en una tarjeta del prototipo, carga su "Pantalla de Detalle"
    app.get(`${BASE_API_URL}/:province/:year`, (req, res) => {
        const { province, year } = req.params;
        
        db.findOne({ province: province.toLowerCase(), year: parseInt(year) }, (err, item) => {
            if (err) return res.status(500).send("Error en el servidor");
            if (!item) return res.status(404).send("Registro agrícola no encontrado");
            
            delete item._id;
            res.status(200).json(item);
        });
    });

    // POST -> Para el formulario de "Añadir nuevo registro" del panel de gestión
    app.post(BASE_API_URL, (req, res) => {
        const newItem = req.body;

        // Validación básica de campos requeridos (evita que rompa la app)
        if (!newItem.province || !newItem.year || !newItem.surface || !newItem.production) {
            return res.status(400).send("Faltan campos obligatorios en el formulario");
        }

        // Comprobar si ya existe para evitar duplicados conflicto (Llave primaria compuesta)
        db.findOne({ province: newItem.province.toLowerCase(), year: parseInt(newItem.year) }, (err, item) => {
            if (item) return res.status(409).send("Este registro ya existe para esa provincia y año");

            // Normalizamos datos antes de guardar
            newItem.province = newItem.province.toLowerCase();
            newItem.year = parseInt(newItem.year);

            db.insert(newItem, (errInsert) => {
                if (errInsert) return res.status(500).send("Error al guardar");
                res.sendStatus(201); // Creado con éxito
            });
        });
    });

    // PUT -> Para la pantalla de "Editar registro"
    app.put(`${BASE_API_URL}/:province/:year`, (req, res) => {
        const { province, year } = req.params;
        const updatedItem = req.body;

        if (province.toLowerCase() !== updatedItem.province.toLowerCase() || parseInt(year) !== parseInt(updatedItem.year)) {
            return res.status(400).send("Los datos del identificador no coinciden con el cuerpo de la petición");
        }

        db.update(
            { province: province.toLowerCase(), year: parseInt(year) },
            { $set: updatedItem },
            {},
            (err, numReplaced) => {
                if (err) return res.status(500).send("Error al actualizar");
                if (numReplaced === 0) return res.status(404).send("No se encontró el registro para actualizar");
                res.sendStatus(200);
            }
        );
    });

    // DELETE individual -> Botón "Eliminar" dentro de una tarjeta o detalle
    app.delete(`${BASE_API_URL}/:province/:year`, (req, res) => {
        const { province, year } = req.params;

        db.remove({ province: province.toLowerCase(), year: parseInt(year) }, {}, (err, numRemoved) => {
            if (err) return res.status(500).send("Error al borrar");
            if (numRemoved === 0) return res.status(404).send("Registro no encontrado");
            res.sendStatus(200);
        });
    });

    // DELETE global -> Botón "Borrar todo" del panel de administración
    app.delete(BASE_API_URL, (req, res) => {
        db.remove({}, { multi: true }, (err, numRemoved) => {
            if (err) return res.status(500).send("Error al vaciar el catálogo");
            res.status(200).send(`Se han eliminado todos los registros (${numRemoved})`);
        });
    });
};