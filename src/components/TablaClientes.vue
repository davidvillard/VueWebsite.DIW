<template>
    <div>
        <NavBar />
    </div>

    <div class="container mt-5">
        <h2 class="text-center mb-4">Mi Formulario</h2>
        <div class="form-inline">
            <div class="input-group mb-3 container">
                <span class="input-group-text col-sm-1" id="basic-addon1">Nombre:</span>
                <input v-model="nombre" type="text" class="form-control" name="nombre" id="nombre">
            </div>
            <div class="input-group mb-3 container">
                <span class="input-group-text col-sm-1" id="basic-addon1">Apellido:</span>
                <input v-model="apellido" type="text" class="form-control" name="apellido" id="apellido">
            </div>
            <div class="input-group mb-3 container">
                <span class="input-group-text col-sm-1" id="basic-addon1">DNI:</span>
                <input v-model="dni" type="text" class="form-control" name="dni" id="dni" @blur="validarDniNie">
            </div>
            <div class="input-group mb-3 container">
                <span class="input-group-text col-sm-1" id="basic-addon1">Email:</span>
                <input v-model="email" type="email" class="form-control" name="email" id="email">
            </div>
            <div class="text-center">
                <button type="submit" class="btn btn-primary mx-2" @click.prevent="guardar">Guardar</button>
                <button type="submit" class="btn btn-secondary" @click="limpiar">Limpiar</button>
            </div>
        </div>
    </div>
    <hr>
    <div id="tabla-clientes" class="container my-5">
        <div class="row mb-5">
            <h2 class="text-center">Tabla de clientes</h2>
        </div>
        <table class="table table-info table-hover table-striped table-bordered">
            <thead class="text-center">
                <tr>
                    <th>Nombre</th>
                    <th>Apellidos</th>
                    <th>DNI</th>
                    <th>Email</th>
                    <th></th>
                </tr>
            </thead>
            <tbody class="table">
                <tr v-for="cliente in clientes" :key="cliente.id">
                    <td>{{ cliente.nombre }}</td>
                    <td>{{ cliente.apellido }}</td>
                    <td class="text-center">{{ cliente.dni }}</td>
                    <td>{{ cliente.email }}</td>
                    <td class="text-center">
                        <div class="text-center">
                            <button class="btn btn-warning mx-2" @click="modificarCliente(cliente.id)"><i
                                    class="bi bi-pencil"></i></button>
                            <button class="btn btn-danger" @click="eliminarCliente(cliente.id)"><i
                                    class="bi bi-trash3"></i></button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>

import Swal from 'sweetalert2';
import NavBar from './NavBar.vue';
export default {
    name: 'TablaClientes',
    components: {
        NavBar
    },
    data() {
        return {
            clientes: [],
            clienteSeleccionado: null,
            nombre: "",
            apellido: "",
            dni: "",
            email: "",
        };
    },
    methods: {

        async obtenerCliente() {
            try {
                const response = await fetch('https://localhost:3000/clientes');
                if (!response.ok) {
                    throw new Error('No se pudieron obtener los datos');
                }

                const data = await response.json();

                this.clientes = data;
            } catch (error) {
                console.error('Error al obtener los clientes', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudieron obtener los datos del servidor',
                });
            }
        },

        guardar() {
            //Controlar que los campos no esten vacios
            if (this.nombre.trim() === '' || this.apellido.trim() === '' || this.dni.trim() === '' || this.email.trim() === '') {
                this.mostrarAlerta('Debe completar los campos', 'warning');
            } else {
                // Logica para guardar los datos del formulario
                // Crear un nuevo cliente con los datos del formulario
                const nuevoCliente = {
                    id: this.clientes.length + 1, // Asiganr un nuevo ID
                    nombre: this.nombre.trim().toUpperCase(),
                    apellido: this.apellido.trim().toUpperCase(),
                    dni: this.dni.trim().toUpperCase(), // Convertir a mayusculas
                    email: this.email.trim(),
                };

                // Agregar el nuevo cliente al array de clientes
                this.clientes.push(nuevoCliente);

                // Limpiar los campos del formulario

                this.nombre = '';
                this.apellido = '';
                this.dni = '';
                this.email = '';

                // Mostrar alerta de exito

                this.mostrarAlerta('Cliente guardado correctamente', 'success');
            }
        },

        // Limpiar campos del formulario
        limpiar() {
            // Logica para limpiar los campos del formulario
            this.nombre = '';
            this.apellido = '';
            this.dni = '';
            this.email = '';

            this.mostrarAlerta('Campos limpiados', 'info');
            return
        },
        // Validar DNI o NIE

        validarDniNie() {
            const dniNie = this.dni.trim().toUpperCase(); // Convierte a mayusculas para simplificar la validacion
            this.dni = dniNie; // Actualiza el valor del campo
            // Expresion regular para validar dni y nie
            const regexDniNie = /^[0-9XYZ][0-9]{7}[TRWAGYFPDXBNJZSQVHLCKE]$/;

            if (!regexDniNie.test(dniNie)) {
                this.mostrarAlerta('DNI o NIE no valido', 'error');
                this.dni = '';
                return;
            }
            let letraCalculada = 'TRWAGYFPDXBNJZSQVHLCKE'.charAt(numero % 23);
            // validar el digito de control
            const valor = dniNie.replace(/[XYZ]/, (letra) => {
                return letra === 'X' ? '0' : (letra === 'Y' ? '1' : (letra === 'Z' ? '2' : letra))
            });

            const numero = parseInt(valor.slice(0, 9), 10);


            // Verificar si es un NIE (XYZ)


            if (letraCalculada !== dniNie.charAt(8)) {
                this.mostrarAlerta('DNI o NIE no valido', 'error');
                this.dni = ''; // Limpiar el campo si dni no es valido

            }
        },
        // MOstrar venatan alerta
        mostrarAlerta(mensaje, tipo) {
            Swal.fire({
                title: mensaje,
                icon: tipo,
                customClass: {
                    container: 'custom-alert-container',
                    popup: 'custom-alert',
                    confirmButton: 'custom-alert-button',
                },
            });
        },
        //Eliminar cliente
        eliminarCliente(clienteId) {
            // Encontrar el codigo
            const index = this.clientes.findIndex(cliente => cliente.id === clienteId);

            // Comprobar si el cliente existe
            if (index !== -1) {
                //borrado del cliente
                this.clientes.splice(index, 1);

                // mostrando alerta de exito
                this.mostrarAlerta('Cliente eliminado correctamente', 'success');
            } else {
                this.mostrarAlerta('Cliente no encontrado', 'error');
            }
        },

        // mosificar cliente
        modificarCliente(clienteId) {
            // buscar el cliente con el ID dado
            const cliente = this.clientes.find(cliente => cliente.id === clienteId);

            // comprobar si el cliente existe
            if (cliente) {
                // actualizar los campos del formulario con los datos del cliente
                this.nombre = cliente.nombre;
                this.apellido = cliente.apellido;
                this.dni = cliente.dni;
                this.email = cliente.email;

                // mostrar alerta de exito
                this.mostrarAlerta('Datos del cliente listo para modificar', 'info');
            } else {
                this.mostrarAlerta('Cliente no encontrado', 'error');
            }
        }
    }
}
</script>
<style>
.navbar {
    width: 70%;
}

.input-group {
    width: 80%;
}
</style>