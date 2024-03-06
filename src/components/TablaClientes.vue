<template>
    <div>
        <NavBar />
    </div>
    <br>
    <div class="container text-center my-3">
        <h2>Gestión Clientes</h2>
    </div>
    <hr class="container">
    <div class="container-fluid ">
        <div class="row" id="map-section">
            <div class="col-12 col-m-6 col-lg-8 mx-auto">
                <div class="input-group mb-3">
                    <div class="input-group mb-3">
                        <span class="input-group-text custom-span">DNI/NIE:</span>
                        <input v-model="dni" type="text" class="form-control form-control-sm" id="dni" name="dni"
                            @blur="validarDniNie">
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text custom-span">Nombre:</span>
                        <input v-model="nombre" type="text" class="form-control form-control-sm" id="nombre" name="nombre">
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text custom-span">Apellidos:</span>
                        <input v-model="apellido" type="text" class="form-control form-control-sm" id="apellido"
                            name="apellido">
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text custom-span">Email:</span>
                        <input v-model="email" type="text" class="form-control form-control-sm" id="email" name="email">
                    </div>
                    <div class="text-center">
                        <button type="button" class="btn btn-primary m-2" @click="guardar">Guardar</button>
                        <button type="button" class="btn btn-secondary" @click="limpiar">Limpiar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <hr class="container">
    <div id="TablaClientes" class="container my-3">
  <div class="row">
    <h5 class="text-center font-weight-bold">Listado Clientes</h5>
  </div>
  <table class="table table-striped table-bordered table-hover">
    <thead class="table-info">
      <tr class="text-center">
        <th>Nombre</th>
        <th>Apellido</th>
        <th>DNI</th>
        <th>Correo Electrónico</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="cliente in clientes" :key="cliente.id" class="text-center">
        <td>{{ cliente.nombre }}</td>
        <td>{{ cliente.apellido }}</td>
        <td>{{ cliente.dni }}</td>
        <td>{{ cliente.email }}</td>
        <td>
          <div class="btn-group" role="group">
            <button class="btn btn-warning" type="button" @click="modificarCliente(cliente.id)">
              <i class="bi bi-pencil-fill"></i>
            </button>
            <button class="btn btn-danger" type="button" @click="eliminarCliente(cliente.id)">
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
export default {
    name: 'TablaClientes',
    data() {
        return {
            nombre: '',
            apellido: '',
            dni: '',
            email: '',
            clientes: [], // Array que almacena los clientes
            clienteSeleccionado: null,
        }
    },
    mounted() { // Se llama automaticamente al metodo obtenerCliente para cargar los datos de la tabla
        this.obtenerCliente();
    },
    methods: {
        /**
         * Obtiene los clientes del servidor y los almacena en el array clientes
         */
        async obtenerCliente() {
            try { // Intenta hacer la peticion
                const response = await fetch('http://localhost:3000/clientes'); // Hazemos una peticion a la API

                if (!response.ok) { // Si la peticion no es correcta
                    throw new Error('No se pudieron obtener los datos del servidor.') // Lanza un error
                }
                const data = await response.json(); // Si la peticion es correcta, almacena los datos en la variable data

                this.clientes = data; // Almacena los datos en el array clientes
            } catch (error) { // Si hay un error en la peticion muestra un mensaje de error con Swal
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudieron obtener datos del servidor.',
                });
            }

        },

        /**
         * Guarda un cliente en el servidor (falta el validarDNI pero iba mal)
         */
        async guardar() {
            if (this.nombre.trim() === '' || this.apellido.trim() === '' || this.dni.trim() === '' || this.email.trim() === '') {
                this.mostrarAlerta("Debe completar todos los campos", "Warning") // Si algun campo esta vacio muestra un mensaje de alerta
                return
            }
                // Creamos un objeto con los datos del cliente
                const nuevoCliente = {
                    id: this.clientes.length + 1,
                    nombre: this.nombre.trim().toUpperCase(),
                    apellido: this.apellido.trim().toUpperCase(),
                    dni: this.dni.trim().toUpperCase(),
                    email: this.email.trim()
                }
                // Hacemos una petición POST al servidor para guardar el cliente
                await fetch('http://localhost:3000/clientes', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(nuevoCliente)
                })
                // Limpiamos los campos del formulario despues de hacer la petición llamando al metodo limpiar
                this.limpiar()
                // Mostramos una alerta de que el cliente se ha guardado correctamente
                this.mostrarAlerta("Cliente guardado con exito", "success")
            },
            /**
             * Limpia los campos del formulario y muestra un mensaje de informacion
             */
        limpiar() {
            this.nombre = "";
            this.apellido = "";
            this.dni = "";
            this.email = "";

            this.mostrarAlerta("Campos limpìados", "info")
            return
        },
        /**
         * Valida el DNI o NIE introducido
         * Aun no esta bien hecho
         */
        validarDniNie() {
            const dniNie = this.dni.trim().toUpperCase();
            this.dni = dniNie;
            const regexDniNie = /^[0-9XYZ][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKE]$/

            if (!regexDniNie.test(dniNie)) {
                this.mostrarAlerta("DNI o NIE no válido", "error");
                this.dni = "";
                return;
            }
            const valor = dniNie.replace(/^[XZY]/, (letra) => {
                return letra === "X" ? '0' : (letra === "Y" ? '1' : letra === "Z" ? '2' : letra)
            })
            const numero = parseInt(valor.slice(0, 9), 10);

            let letraCalculada = 'TRWAGMYFPDXBNJZSQVHLCKE'.charAt(numero % 23);



            if (letraCalculada !== dniNie.charAt(8) && this.dni.length !=0) {
                this.mostrarAlerta("DNI o NIE no válido", "error");
                this.dni = "";
            }
        },
        /**
         * Metodo padre que muestra una alerta en la que tu eliges el tipo (Swal)
         */
        mostrarAlerta(mensaje, tipo) {
            Swal.fire({
                title: mensaje,
                icon: tipo,
                customClass: {
                    container: "custom-alert-container",
                    popup: "custom-alert",
                    confirmButton: "custom-alert-button"
                }
            })
        },

        /**
         * Metodo que elimina a un cliente del servidor
         */
        async eliminarCliente(clienteId) {
            const confirmacion = await this.mostrarConfirmacionEliminar(); // Muestra una ventana de confirmacion para eliminar el cliente

            if (confirmacion) { // Si el usuario confirma la eliminacion
                // Buscamos el cliente en la array de cliente igualando sus id
                const index = this.clientes.findIndex(cliente => cliente.id === clienteId);
                // Si el cliente esta en la array hacemos un delete del cliente en el servidor
                if (index !== -1) {
                    await fetch(`http://localhost:3000/clientes/${clienteId}`, {
                        method: `DELETE`,
                    });
                    this.mostrarAlerta("Cliente eliminado correctamente", "success") // Mostramos la alerta de eliminacion del cliente
                } else {
                    this.mostrarAlerta("Cliente no encontrado", "error") // Si el cliente no esta en la array mostramos un mensaje de error
                }
            }
        },

        /**
         * Muestra una ventana de confirmacion para eliminar un cliente
         */
        async mostrarConfirmacionEliminar() {
            // Mostrar ventana de confirmación
            const confirmacion = await Swal.fire({
                title: '¿Estás seguro de que deseas eliminar este cliente?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar',
                customClass: {
                    container: 'custom-alert-container',
                    popup: 'custom-alert',
                    confirmButton: 'custom-alert-button',
                    cancelButton: 'custom-alert-button',
                },
            });

            return confirmacion.isConfirmed;
        },

        /**
         * Metodo que modifica a un cliente del servidor
         */
        modificarCliente(clienteId) {
            // Buscamos el cliente en la array de cliente igualando sus id
            const cliente = this.clientes.find(cliente => cliente.id === clienteId);

            // Si el cliente esta en la array mostramos los datos del cliente en el formulario
            if (cliente) {
                this.nombre = cliente.nombre;
                this.apellido = cliente.apellido;
                this.dni = cliente.dni;
                this.email = cliente.email;

                this.mostrarAlerta("Datos del cliente listos para modificar", "info"); // Mostramos un mensaje de informacion
            } else {
                this.mostrarAlerta("Cliente no encontrado", "error"); // Si el cliente no esta en la array mostramos un mensaje de error
            }
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