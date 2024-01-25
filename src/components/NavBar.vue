<template>
    <nav class="navbar navbar-expand-lg bg-primary container">
        <div class="container-fluid">
            
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link text-white" href="/">Inicio</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-white" href="/clientes">Clientes</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-white" href="#">Artículos</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-white" href="#"> Ventas</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-white" href="#"> Contacto</a>
                    </li>
                </ul>
                <form class="d-flex" role="search">
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                    <button class="btn btn-light" type="submit"><i class="bi bi-search"></i></button>
                </form>
            </div>
        </div>
    </nav>
</template>

<script>
export default{
computed: {
    clientesExists(){
        return this.$router.hasRoute('clientes');
    },
    ventasExists(){
        return this.$router.hasRoute('ventas');
    },
    contactoExists(){
        return this.$router.hasRoute('contacto');
    },
    articulosExists(){
        return this.$router.hasRoute('articulos');
    }
}
}
</script>
<style>
</style>