<template>
  <div>
    <NavBar />
    <div>
      <h1 class="text-center mt-5">Proyecto de {{ alumno_a }}</h1>
    </div>
    <div class="container cont mt-5 text-center">
      <div class="row">
        <div class="col-md-6 mb-4">
          <button type="button" class="btn btn-primary btn-lg boton py-5">
            <router-link to="/clientes" class="link-light link-offset-2 link-underline link-underline-opacity-0">
              Gestion clientes
            </router-link>
          </button>
        </div>
        <div class="col-md-6 mb-4">
          <button type="button" class="btn btn-primary btn-lg boton py-5">
            <router-link to="/articulos" class="link-light link-offset-2 link-underline link-underline-opacity-0">
              Gestion articulos
            </router-link>
          </button>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 mb-4">
          <button type="button" class="btn btn-primary btn-lg boton py-5">
            <router-link to="/ventas" class="link-light link-offset-2 link-underline link-underline-opacity-0">
              Gestion ventas
            </router-link>
          </button>
        </div>
        <div class="col-md-6 mb-4">
          <button type="button" class="btn btn-primary btn-lg boton py-5">
            <router-link to="/contacto" class="link-light link-offset-2 link-underline link-underline-opacity-0">
              Contacto
            </router-link>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';

export default {
  name: 'PaginaInicio',
  components: {
    NavBar,
  },
  data() {
    return {
      alumno_a: 'David',
    };
  },
  mounted() {
    console.log('Componente PaginaInicio.vue cargado');
  },
};
</script>

<style>
.boton {
  width: 100%;
  height: 100%;
}

.cont {
  margin-top: 10%;
}
</style>
