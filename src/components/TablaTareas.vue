<template>
  <div>
    <NavBar />
  </div>

  <div class="container mt-5">
    <h2 class="text-center mb-4">Mi Formulario</h2>
    <div class="form-inline">
      <div class="input-group mb-3 container">
        <span class="input-group-text col-sm-1" id="basic-addon1">Nombre:</span>
        <input
          v-model="nombre"
          type="text"
          class="form-control"
          name="nombre"
          id="nombre"
        />
      </div>
      <div class="input-group mb-3 container">
        <span class="input-group-text col-sm-1" id="basic-addon1"
          >Descripcion:</span
        >
        <input
          v-model="descripcion"
          type="text"
          class="form-control"
          name="descripcion"
          id="descripcion"
        />
      </div>
      <div class="input-group mb-3 container">
        <span class="input-group-text col-sm-1" id="basic-addon1">Fecha:</span>
        <input
          v-model="fecha"
          type="text"
          class="form-control"
          name="fecha"
          id="fecha"
          @blur="validarDniNie"
        />
      </div>
      <div class="input-group mb-3 container">
        <span class="input-group-text col-sm-1" id="basic-addon1"
          >Prioridad:</span
        >
        <input
          v-model="prioridad"
          type="prioridad"
          class="form-control"
          name="prioridad"
          id="prioridad"
        />
      </div>
      <div class="text-center">
        <button
          type="submit"
          class="btn btn-primary mx-2"
          @click.prevent="guardarTarea"
        >
          Guardar
        </button>
        <button type="submit" class="btn btn-secondary" @click="limpiarTarea">
          Limpiar
        </button>
      </div>
    </div>
  </div>
  <hr />
  <div id="tabla-tareas" class="container my-5">
    <div class="row mb-5">
      <h2 class="text-center">Listado Tareas</h2>
    </div>
    <table class="table table-info table-hover table-striped table-bordered">
      <thead class="text-center">
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>descripcions</th>
          <th>Fecha</th>
          <th>prioridad</th>
          <th>Gestion</th>
        </tr>
      </thead>
      <tbody class="table">
        <tr v-for="tarea in tareas" :key="tarea.id">
          <td class="text-center">{{ tarea.id }}</td>
          <td>{{ tarea.nombre }}</td>
          <td>{{ tarea.descripcion }}</td>
          <td class="text-center">{{ tarea.fecha }}</td>
          <td class="text-center">{{ tarea.prioridad }}</td>
          <td class="text-center">
            <div class="text-center">
              <button
                class="btn btn-warning mx-2"
                @click="modificarTarea(tarea.id)"
              >
                <i class="bi bi-pencil"></i>
              </button>
              <button
                class="btn btn-danger"
                @click.prevent="eliminarTarea(tarea.id)"
              >
                <i class="bi bi-trash3"></i>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import NavBar from './NavBar.vue';
export default{
    name: 'TablaTareas',
    components: {
        NavBar
    },
    data(){
        return{
            nombre: '',
            descripcion: '',
            fecha: '',
            prioridad: '',
            tareas: []
        };
    },
    created(){
        this.obtenerTareas();
    },
    methods:{
        async obtenerTareas(){
            try{
                const res = await fetch('http://localhost:500/tareas');
                if(!res.ok){
                    const message = `An error has occured: ${res.status}`;
                    throw new Error(message);
                }
                this.tareas = await res.json();
                console.log(this.tareas);
            }catch(error){
                console.error(error);
            }
        },
    },
};
</script>
<style>
.navbar {
  width: 70%;
}

.input-group {
  width: 80%;
}
</style>
