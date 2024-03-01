    <template>
        <div class="container-fluid text-center py-5">
        <div class="row justify-content-center align-items-center">
            <div class="col-md-8">
            <h2 class="display-4 mb-4">ERROR 404!!</h2>
            <img src="https://http.cat/images/404.jpg" alt="Error 404" class="rounded">
            <p class="lead">La página que estás buscando no se encuentra.</p>
            <router-link to="/" class="btn btn-primary">Volver al Inicio</router-link>
            </div>
        </div>
        </div>
    </template>
    
    <script>
    export default {
        name: 'NotFound',
    };
    </script>
    
    <style scoped>
    /* Estilos adicionales si es necesario */
    </style>
    