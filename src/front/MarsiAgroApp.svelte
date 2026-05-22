<script>
    import { onMount } from "svelte";

    let agroData = [];
    let newProvince = "";
    let newYear = "";
    let newSurface = "";
    let newProduction = "";
    let searchProvince = "";

    // Mensajes de feedback para el usuario
    let errorMsg = "";
    let successMsg = "";

    // Función para obtener los datos del backend
    async function getAgroData() {
        errorMsg = "";
        let url = "/api/v1/marsi-agroapp";
        if (searchProvince) {
            url += `?province=${searchProvince}`;
        }
        
        const res = await fetch(url);
        if (res.ok) {
            agroData = await res.json();
        } else {
            errorMsg = "Error al recuperar los datos del catálogo.";
        }
    }

    // Cargar datos iniciales de prueba si la base de datos está vacía
    async function loadInitialData() {
        const res = await fetch("/api/v1/marsi-agroapp/loadInitialData");
        if (res.ok) {
            successMsg = "¡Datos iniciales cargados con éxito!";
            getAgroData();
        } else {
            errorMsg = "La base de datos ya contiene registros o hubo un error.";
        }
    }

    // Insertar un nuevo registro desde el formulario
    async function insertData() {
        errorMsg = "";
        successMsg = "";
        
        const res = await fetch("/api/v1/marsi-agroapp", {
            method: "POST",
            body: JSON.stringify({
                province: newProvince,
                year: parseInt(newYear),
                surface: parseFloat(newSurface),
                production: parseFloat(newProduction)
            }),
            headers: { "Content-Type": "application/json" }
        });

        if (res.ok) {
            successMsg = `Registro de ${newProvince} añadido correctamente.`;
            // Limpiamos el formulario
            newProvince = ""; newYear = ""; newSurface = ""; newProduction = "";
            getAgroData(); // Refrescamos el catálogo
        } else if (res.status === 409) {
            errorMsg = "Ese registro (Provincia y Año) ya existe.";
        } else {
            errorMsg = "Por favor, rellena todos los campos correctamente.";
        }
    }

    // Eliminar un registro específico
    async function deleteItem(province, year) {
        const res = await fetch(`/api/v1/marsi-agroapp/${province}/${year}`, {
            method: "DELETE"
        });
        if (res.ok) {
            successMsg = "Registro eliminado.";
            getAgroData();
        } else {
            errorMsg = "No se pudo eliminar el recurso.";
        }
    }

    // Al cargar el componente por primera vez
    onMount(getAgroData);
</script>

<main class="container">
    <h2>🌾 Panel Agropecuario (marsi-agroapp)</h2>

    <!-- Alertas de estado -->
    {#if errorMsg}
        <p class="alert error">{errorMsg}</p>
    {/if}
    {#if successMsg}
        <p class="alert success">{successMsg}</p>
    {/if}

    <!-- Buscador del prototipo -->
    <section class="search-box">
        <input type="text" placeholder="Buscar por provincia..." bind:value={searchProvince} />
        <button on:click={getAgroData}>🔍 Buscar</button>
        <button on:click={loadInitialData} class="btn-secondary">⚙️ Cargar Iniciales</button>
    </section>

    <!-- Tabla interactiva / Catálogo -->
    <table>
        <thead>
            <tr>
                <th>Provincia</th>
                <th>Año</th>
                <th>Superficie (ha)</th>
                <th>Producción (t)</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><input type="text" placeholder="Ej: Almería" bind:value={newProvince} /></td>
                <td><input type="number" placeholder="Ej: 2024" bind:value={newYear} /></td>
                <td><input type="number" placeholder="Ej: 5000" bind:value={newSurface} /></td>
                <td><input type="number" placeholder="Ej: 12000" bind:value={newProduction} /></td>
                <td><button on:click={insertData} class="btn-add">➕ Añadir</button></td>
            </tr>

            {#each agroData as item}
                <tr>
                    <td class="capitalize">{item.province}</td>
                    <td>{item.year}</td>
                    <td>{item.surface}</td>
                    <td>{item.production}</td>
                    <td>
                        <button on:click={() => deleteItem(item.province, item.year)} class="btn-delete">🗑️ Borrar</button>
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
</main>

<style>
    .container { font-family: sans-serif; padding: 20px; max-width: 900px; margin: 0 auto; }
    .search-box { margin-bottom: 20px; display: flex; gap: 10px; }
    input { padding: 8px; border: 1px solid #ccc; border-radius: 4px; }
    table { width: 100%; border-collapse: collapse; margin-top: 10px; }
    th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
    th { background-color: #4CAF50; color: white; }
    .capitalize { text-transform: capitalize; }
    button { padding: 8px 12px; border: none; border-radius: 4px; cursor: pointer; }
    .btn-add { background-color: #2eb82e; color: white; }
    .btn-delete { background-color: #ff3333; color: white; }
    .btn-secondary { background-color: #008CBA; color: white; }
    .alert { padding: 10px; border-radius: 4px; font-weight: bold; }
    .error { background-color: #ffcccc; color: #cc0000; }
    .success { background-color: #d4edda; color: #155724; }
</style>