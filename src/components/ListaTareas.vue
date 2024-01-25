<template>
   <div>
    <h1>Lista Tareas</h1>
        <input type="text" v-model="tarea">
        <button @click="agregarTarea">Agregar Tarea</button>
        <p>Estadisticas: {{ tareas.length }}</p>
        <ul>
            <li v-for="(tarea,id) in tareas" :key="id">
                {{ id + 1 }} . {{ tarea }} <button @click="eliminarTarea">Eliminar Tarea</button>
            </li>
        </ul>
   </div>
</template> 


<script>
export default {
    name: 'ListaTareas',
    methods: {
        agregarTarea(){
            this.tareas.push(this.tarea);
            console.log("Tareas Realizadas:", this.tareas);
        },
        eliminarTarea(){
            this.tareas.splice(this.tarea,1);
        }
        },
    data() {
        return {
            tareas:[]
        };
    }
}
</script>

<style>

</style>