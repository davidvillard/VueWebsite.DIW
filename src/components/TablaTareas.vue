<template>
    <div>
        <NavBar />
    </div>
    <br>
    <div class="container text-center my-3">
        <h2>Clientes</h2>
    </div>
    <hr class="container">
    <div class="container-fluid ">
        <div class="row" id="map-section">
            <div class="col-12 col-m-6 col-lg-8 mx-auto">
                <div class="input-group mb-3">
                    <div class="input-group mb-3">
                        <span class="input-group-text custom-span">Nombre:</span>
                        <input v-model="nombre" type="text" class="form-control form-control-sm" id="nombre" name="nombre">
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text custom-span">Descripción:</span>
                        <input ref="descripcion" v-model="descripcion" type="text" class="form-control form-control-sm"
                            id="descripcion" name="descripcion">
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text custom-span">Fecha:</span>
                        <input ref="fechaAlta" v-model="fecha" type="text" class="form-control" placeholder="Seleccionar fecha">
                        <button @click="abrirCalendario" class="btn btn-outline-secondary" type="button">
                            <i class="bi bi-calendar"></i>
                        </button>
                    </div>
                    <div class="input-group mb-3 w-25">
                        <label class="input-group-text custom-span" for="salaSelect">Sala:</label>
                        <select class="form-select" v-model="sala" id="salaSelect">
                            <option value="Sala 1"> Sala 1</option>
                            <option value="Sala 2"> Sala 2</option>
                            <option value="Sala 3"> Sala 3</option>
                        </select>
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text custom-span" style="margin-right: 20px;"> Equipamiento</span>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" id="equipoVideoconferencia" v-model="equipos" value="Equipo Videoconferencia">
                            <label class="form-check-label" for="equipoVideoconferencia">Equipo Videoconferencia</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" id="televisor" v-model="equipos" value="Televisor">
                            <label class="form-check-label" for="televisor">Televisor</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" id="pizarraDigital" v-model="equipos" value="Pizarra Digital">
                            <label class="form-check-label" for="pizarraDigital">Pizarra Digital</label>
                        </div>
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text custom-span" style="margin-right: 10px;">Prioridad:</span>
                        <div class="form-check form-check-inline">
                            <input v-model="prioridad" type="radio" class="form-check-input" id="prioridadAlta"
                                value="alta">
                            <label class="form-check-label" for="prioridadAlta">Alta</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input v-model="prioridad" type="radio" class="form-check-input" id="prioridadMedia"
                                value="media">
                            <label class="form-check-label" for="prioridadMedia">Media</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input v-model="prioridad" type="radio" class="form-check-input" id="prioridadBaja"
                                value="baja">
                            <label class="form-check-label" for="prioridadBaja">Baja</label>
                        </div>
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text custom-span">Obsevaciones: </span>
                        <textarea v-model="observaciones" class="form-control" name="observaciones" id="observaciones" placeholder="Descripcion Tarea(max 256 caracteres)"></textarea>
                    </div>
                    <div class="input-group mb-3 w-250 ">
                        <div class="custom-file">
                            <input type="file" placeholder="Selecciona un archivo" class="custom-file-input form-control" id="archivo" name="archivo" 
                            accept=".pdf, .pdf, .jpeg" @change="handleFileChange" ref="fileInput">
                        </div>
                    </div>
                    <div class="text-center">
                        <button type="button" class="btn btn-primary m-2" @click="guardarTarea">Guardar</button>
                        <button type="button" class="btn btn-danger m-2" @click="limpiarTarea">Limpiar</button>
                        <button type="button" class="btn btn-secondary m-2 " @click="modificarTarea">Modificar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <hr>
    <div id="TablaTareas" class="container my-3">
  <div class="row">
    <h5 class="text-center font-weight-bold">Listado Tareas</h5>
  </div>
  <table class="table table-striped table-bordered table-hover">
    <thead class="table-info">
      <tr class="text-center">
        <th>ID</th>
        <th>Nombre</th>
        <th>Descripción</th>
        <th>Fecha Alta</th>
        <th>Sala Reunión</th>
        <th>Equipamiento</th>
        <th>Prioridad</th>
        <th>Gestión</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="tarea in tareas" :key="tarea.id" class="text-center">
        <td>{{ tarea._id }}</td>
        <td>{{ tarea.nombre }}</td>
        <td>{{ tarea.descripcion }}</td>
        <td>{{ tarea.fecha }}</td>
        <td>{{ tarea.sala }}</td>
        <td>{{ tarea.equipos.join(', ') }}</td>
        <td>{{ tarea.prioridad }}</td>
        <td>
          <div class="btn-group" role="group">
            <button class="btn btn-warning" type="button" @click="cargarTarea(tarea)">
              <i class="bi bi-pencil-fill"></i>
            </button>
            <button class="btn btn-danger" type="button" @click="eliminarTarea(tarea._id)">
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</div>

</template>

<script>
import Swal from 'sweetalert2';
import flatpickr from 'flatpickr'
import 'flatpickr/dist/flatpickr.min.css'
export default {
    name: "TablaTareas",
    components: {

    },
    data() {
        return {
            nombre: "",
            descripcion: "",
            fecha: "",
            sala: "",
            equipos:[],
            prioridad: "alta",
            tareas: [],
            observaciones: "",
            show: false
        };
    },
    created() {
        this.obtenerTareas();
    },
    mounted(){
        const fechaAlta = this.$refs.fechaAlta;
        flatpickr(fechaAlta,{});
    },
    methods: {
        async obtenerTareas() {
            try {
                const res = await fetch('http://localhost:500/tareas');
                if (!res.ok) {
                    const message = `Ha ocurrido un error:  ${res.status}`;
                    throw new Error(message);
                }
                this.tareas = await res.json();
                console.log(this.tareas);
            } catch (error) {
                console.error(error)
            }
        },
        abrirCalendario(){
            const fechaAlta = this.$refs.fechaAlta;
            if(fechaAlta._flatpickr){
                fechaAlta._flatpickr.open();
            }
        },
        limpiarTarea(){
            this.nombre = "";
            this.descripcion = "";
            this.fecha = "";
            this.sala = null;
            this.equipos = [];
            this.prioridad = "alta";
            this.observaciones = "";
            this.$refs.fileInput.value = null;

        },
        limpiarCampos() {
            this.nombre = "";
            this.descripcion = "";
            this.fecha = "";
            this.sala = null;
            this.equipos = [];
            this.prioridad = "alta";
            this.observaciones = "";
            this.archivo = null;
            this.$refs.fileInput.value = null;
            

            Swal.fire({
                icon:'info',
                title: 'Campos limpiados',
                text: 'Los campos del formulario se han limpiado correctamente',
            })
        },
        async guardarTarea() {
            try {
                console.log(this.nombre, this.descripcion, this.fecha, this.sala, this.prioridad);
                // const nuevaTarea = {
                //     nombre: this.nombre,
                //     descripcion: this.descripcion,
                //     fecha: format(new Date(this.fecha), 'dd-MM-yyyy'),
                //     sala: this.sala,
                //     equipos: this.equipos,
                //     prioridad: this.prioridad,
                //     observaciones: this.observaciones,

                const formData = new FormData();
                formData.append('nombre',this.nombre);
                formData.append('descripcion',this.descripcion);
                formData.append('fecha', this.fecha);
                formData.append('sala',  this.sala);
                this.equipos.forEach(equipo =>{
                    formData.append('equipos', equipo);
                })
                formData.append('prioridad',this.prioridad);
                formData.append('observaciones',this.observaciones);
                formData.append('archivo',this.archivo);
                
                if (['alta', 'baja', 'media'].includes(this.prioridad)) {
                    const res = await fetch('http://localhost:500/tareas', {
                         method: 'POST',
                        // headers: {
                        //     'Content-Type': 'application/json'
                        // },
                        // body: JSON.stringify(nuevaTarea) 
                        body: formData
                    });

                    await Swal.fire({
                        icon: 'success',
                        title: '¡Tarea guardada!',
                        text: 'La nueva tarea se ha guardado correctamente'
                    });

                    if (!res.ok) {
                        const message = `Ha ocurrido un error: ${res.status}`;
                        throw new Error(message)
                    }

                    await this.obtenerTareas();
                }
                this.limpiarTarea();
            } catch (error) {
                console.error(error);
                await Swal.fire({
                    icon: 'error',
                    title: 'Error al guardar la tarea',
                    text: 'Ha ocurrido un error al intentar guardar la tarea. Por favor, inténtalo de nuevo'
                })
            }
        },
        cargarTarea(tarea) {
            this.nombre = tarea.nombre;
            this.descripcion = tarea.descripcion;
            this.fecha = tarea.fecha;
            this.sala = tarea.sala;
            this.equipos = tarea.equipos;
            this.prioridad = tarea.prioridad;
            this.observaciones = tarea.observaciones;
            this.tareaSeleccionada = tarea;
        },
        async eliminarTarea(id) {
            try {
                const res = await fetch(`http://localhost:500/tareas/${id}`, {
                    method: 'DELETE'
                });
                if (!res.ok) {
                    const message = `Ha ocurrido un error: $ ${res.status}`;
                    throw new Error(message);
                }

                await Swal.fire({
                    icon: 'Success',
                    title: '¡Tarea eliminada!',
                    text: 'La tarea se ha eliminado correctamente'
                });

                await this.obtenerTareas();
            } catch (error) {
                console.error(error);
                await Swal.fire({
                    icon: 'error',
                    title: 'Error al eliminar la tarea',
                    text: 'Ha ocurrido un error al intentar eliminar la tarea. Por favor, inténtalo de nuevo'
                })
            }
        },
        async modificarTarea() {
            try {
                const tarea = this.tareaSeleccionada;

                tarea.nombre = this.nombre;
                tarea.descripcion = this.descripcion;
                tarea.fecha = this.fecha;
                tarea.sala = this.sala;
                tarea.equipos = this.equipos;
                tarea.prioridad = this.prioridad;
                tarea.observaciones = this.observaciones;

                const res = await fetch(`http://localhost:500/tareas/${tarea._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(tarea)
                });

                if (!res.ok) {
                    const message = `Ha ocurrido un error: ${res.status}`;
                    throw new Error(message)
                }

                await this.obtenerTareas();

                this.limpiarCampos();

                await Swal.fire({
                    icon: 'success',
                    title: '¡Tarea guardada!',
                    text: 'La tarea se ha modificado correctamente'
                });

                this.tareaSeleccionada = null;

            } catch (error) {
                console.error(error);
                await Swal.fire({
                    icon: 'error',
                    title: 'Error al modificar la tarea',
                    text: 'Ha ocurrido un error al intentar modificar la tarea. Por favor, inténtalo de nuevo'
                })
            }
        },
            handleFileChange(evento){
                this.archivo = evento.target.files[0];
                console.log(this.archivo);
        }

    }
}
</script>

<style>
.btn-no-hover:hover {
    background-color: white;
    border-color: white;
}

.btn-no-hover i {
    color: #000000
}

.custom-span {
    width: 120px;
    display: inline-block;
    text-align: left;
}
</style>