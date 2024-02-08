<template>
    <div>
      <nav class="navbar navbar-dark bg-primary container">
        <div class="container-fluid">
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <router-link to="/" class="navbar-brand">Inicio</router-link>
          <router-link  to="/clientes" class="navbar-brand">Clientes</router-link>    
          <!-- Mostrar enlaces solo si las rutas están definidas -->
          <router-link v-if="articulosExists" to="/articulos" class="navbar-brand">Artículos</router-link>
          <router-link v-if="ventasExists" to="/ventas" class="navbar-brand">Ventas</router-link>
          <router-link v-if="tareasExists" to="/tareas" class="navbar-brand">Tareas</router-link>
          <router-link v-if="contactoExists" to="/contacto" class="navbar-brand">Contacto</router-link>
          <form class="d-flex">
            <input class="form-control me-2" type="search" placeholder="Búsqueda" aria-label="Search">
            <button class="btn btn-outline-success btn-light btn-no-hover" type="submit"><i class="bi bi-search"></i></button>
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
      <router-view/>
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
      }
    }
  };
  </script>
  
  <style>
  /* Estilos aquí */
  </style>
  