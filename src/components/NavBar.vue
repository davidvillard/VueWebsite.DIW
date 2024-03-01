<template>
  <div>
    <nav class="navbar navbar-dark bg-primary container-fluid">
      <div class="container-fluid text-light">
        
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        
        <div class="container">
          <router-link to="/" class="navbar-brand">Inicio</router-link>
          <router-link to="/clientes" class="navbar-brand" v-if="clientesExists">Clientes</router-link>
            <router-link to="/articulos" class="navbar-brand" v-if="articulosExists">Artículos</router-link>
            <router-link to="/ventas" class="navbar-brand" v-if="ventasExists">Ventas</router-link>
            <router-link to="/tareas" class="navbar-brand" v-if="tareasExists">Tareas</router-link>
            <router-link to="/contacto" class="navbar-brand" v-if="contactoExists">Contacto</router-link>
        </div>

        <form class="d-flex">
          <input class="form-control me-2" type="search" placeholder="Búsqueda" aria-label="Search">
          <button class="btn btn-outline-success btn-light" type="submit">
            <i class="bi bi-search"></i>
          </button>
        </form>
        <!-- acordeón -->
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link to="/" class="nav-link">Inicio</router-link>
            </li>
            <li class="nav-item" v-if="clientesExists">
              <router-link to="/clientes" class="nav-link">Clientes</router-link>
            </li>
            <li class="nav-item" v-if="articulosExists">
              <router-link to="/articulos" class="nav-link">Artículos</router-link>
            </li>
            <li class="nav-item" v-if="ventasExists">
              <router-link to="/ventas" class="nav-link">Ventas</router-link>
            </li>
            <li class="nav-item" v-if="tareasExists">
              <router-link to="/tareas" class="nav-link">Tareas</router-link>
            </li>
            <li class="nav-item" v-if="contactoExists">
              <router-link to="/contacto" class="nav-link">Contacto</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <router-view />
  </div>
</template>
  
<script>
export default {
  computed: {
    clientesExists() {
      return this.$router.hasRoute('clientes');
    },
    ventasExists() {
      return this.$router.hasRoute('ventas');
    },
    contactoExists() {
      return this.$router.hasRoute('contacto');
    },
    articulosExists() {
      return this.$router.hasRoute('articulos');
    },
    tareasExists() {
      return this.$router.hasRoute('tareas');
    }
  }
};
</script>
  
<style>
/* Estilos aquí */
</style>