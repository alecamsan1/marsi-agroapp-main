<script>
    import Router from "svelte-spa-router";
    import Home from "./Home.svelte"; // El home común del grupo
    import MarsiAgroTable from "./MarsiAgroTable.svelte"; // Tu nueva vista

    // Mapeo de rutas de la aplicación
    const routes = {
        "/": Home,
        "/marsi-agroapp": MarsiAgroTable
    };
</script>

<nav>
    <a href="#/">🏠 Inicio</a> | 
    <a href="#/marsi-agroapp">🌾 Gestión Agrícola</a>
</nav>

<hr />

<!-- El componente Router renderizará dinámicamente el componente según el hash de la URL -->
<Router {routes} />