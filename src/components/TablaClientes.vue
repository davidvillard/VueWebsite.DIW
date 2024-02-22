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
        <table class='table table-striped table-bordered '>
            <thead class="table-info">
                <tr class='table table-primary text-center'>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>DNI</th>
                    <th>Correo Electrónico</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for='cliente in clientes' :key="cliente.id" class="table table-secondary">
                    <td>{{ cliente.nombre }}</td>
                    <td>{{ cliente.apellido }}</td>
                    <td class="text-center">{{ cliente.dni }}</td>
                    <td>{{ cliente.email }}</td>
                    <td class="text-center">
                        <div class="text-center">
                            <button class='btn btn-warning m-2' type="button" @click="modificarCliente(cliente.id)">
                                <i class="bi bi-pencil-fill"></i>
                            </button>
                            <button class='btn btn-danger m-2' type="button" @click="eliminarCliente(cliente.id)">
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
            clientes: [],
            clienteSeleccionado: null,
        }
    },
    mounted() {
        this.obtenerCliente();
    },
    methods: {
        async obtenerCliente() {
            try {
                const response = await fetch('http://localhost:3000/clientes');

                if (!response.ok) {
                    throw new Error('No se pudieron obtener los datos del servidor.')
                }
                const data = await response.json();

                this.clientes = data;
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudieron obtener datos del servidor.',
                });
            }

        },

        guardar() {
            if (this.dni.trim() === '' || this.nombre.trim() === '' || this.apellido.trim() === "" || this.email.trim() === "") {
                this.mostrarAlerta("Debe completar los campos", "warning");
            } else {
                const nuevoCliente = {
                    id: this.clientes.length + 1,
                    nombre: this.nombre.trim().toUpperCase(),
                    apellido: this.apellido.trim().toUpperCase(),
                    dni: this.dni.trim().toUpperCase(),
                    email: this.email.trim(),
                };

                this.clientes.push(nuevoCliente);

                this.nombre = nuevoCliente.nombre;
                this.apellido = nuevoCliente.apellido;
                this.dni = nuevoCliente.dni;
                this.email = nuevoCliente.email;

                this.mostrarAlerta("Cliente guardado correctamente", "success")
            }
        },
        limpiar() {
            this.nombre = "";
            this.apellido = "";
            this.dni = "";
            this.email = "";

            this.mostrarAlerta("Campos limpìados", "info")
            return
        },
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
        async eliminarCliente(clienteId) {
            const confirmacion = await this.mostrarConfirmacionEliminar();

            if (confirmacion) {
                const index = this.clientes.findIndex(cliente => cliente.id === clienteId);

                if (index !== -1) {
                    await fetch(`http://localhost:3000/clientes/${clienteId}`, {
                        method: `DELETE`,
                    });
                    this.mostrarAlerta("Cliente eliminado correctamente", "success")
                } else {
                    this.mostrarAlerta("Cliente no encontrado", "error")
                }
            }
        },
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
        modificarCliente(clienteId) {
            const cliente = this.clientes.find(cliente => cliente.id === clienteId);

            if (cliente) {
                this.nombre = cliente.nombre;
                this.apellido = cliente.apellido;
                this.dni = cliente.dni;
                this.email = cliente.email;

                this.mostrarAlerta("Datos del cliente listos para modificar", "info");
            } else {
                this.mostrarAlerta("Cliente no encontrado", "error");
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