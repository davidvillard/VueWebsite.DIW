<template>
    <div class="hello">
        <h3>{{ mensaje }}</h3>
        <h4>El resultado de la suma es {{ resultadoSuma }}</h4>
        <h5>Listado de Items</h5>
        <ul>
            <li v-for="item in listaItems" :key="item.id">
                <!--{{ item.nombre + ' ' + item.apellido}}-->
                {{ item.id }}. {{ item.nombre }} {{ item.apellido }}
            </li>
        </ul>
        <h4>Nombre del cliente es {{ nombreCliente }}</h4>
        <button @click='incrementar'>Incrementar</button>
        <h5>Contador: {{ contador }}</h5>
        <hr>
        <div>
            <input v-model="number1" type="text" placeholder="Número 1">
            <input v-model="number2" type="text" placeholder="Número 2">
            <button @click='sumar'>Sumar</button>
            <h5>Resultado de la suma {{ suma }}</h5>
            <p v-if="suma >= 0">La suma es mayor que 0</p>
            <p v-else-if="suma < 0">La suma es menor que 0</p>
        </div>

        <div>
            <input v-model="number3" type="text" placeholder="Número 1">
            <input v-model="number4" type="text" placeholder="Número 2">
            <button @click='restar'>Restar</button>
            <h5>Resultado de la resta {{ resta }}</h5>
            <p v-if="resta >= 0">La resta es mayor que 0</p>
            <p v-else-if="resta < 0">La resta es menor que 0</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PrimerasPruebas',
    props: {
        mensaje: String,
        numero1: {
            type: Number,
            default: 2
        },
        numero2: {
            type: Number,
            default: 2
        }, 
        nombre: {
            type: String,
            default: 'Pepe'
        }, 
        apellidos: {
            type: String,
            default: 'Tena Fernández'
        }, 
        viejoMensaje: {
            type: String,
            default: 'antiguo mesaje'
        },
        nuevoMensaje: {
            type: String,
            default: 'nuevo mensaje'
        }

    },
    computed: {
        nombreCliente(){
            return this.nombre + ' ' + this.apellidos;
        }

    },
    watch: {
        contador(nuevoMensaje, viejoMensaje) {
            alert(`Hemos pasado de "${viejoMensaje} " a "${nuevoMensaje}"`)
        }
    },
    methods: {
        incrementar(){
            this.contador++;
        },
        sumar(){
            //convierte a número
            const num1 = parseFloat(this.number1);
            const num2 = parseFloat(this.number2);

            //comprueba si son números
            if(isNaN(num1) || isNaN(num2)) {
                alert('No son números')
            } else {
                this.suma = num1 + num2
            }
        },
        restar(){
            //convierte a número
            const num3 = parseFloat(this.number3);
            const num4 = parseFloat(this.number4);

            //comprueba si son números
            if(isNaN(num3) || isNaN(num4)) {
                alert('No son números')
            } else {
                this.resta = num3 - num4
            }
        }
    },
    data() {
        return {
            resultadoSuma: this.numero1 + this.numero2,
            listaItems: [
                { id: 1, nombre: 'Manuel', apellido: 'Chaves' },
                { id: 2, nombre: 'Raquel', apellido: 'Vazquez' },
                { id: 3, nombre: 'LuisMi', apellido: 'Sempere' },
                { id: 4, nombre: 'Andrea', apellido: 'Tena' },
                { id: 5, nombre: 'David', apellido: 'Villar' }
            ], 
            contador: 0,
            number1: 0,
            number2: 0,
            suma: 0,
            number3: 0,
            number4: 0,
            resta: 0,
        };
    }
}
</script>

<style>

</style>