<template>
    <div>
        <NavBar/>
    </div>
    <div>
        <h1 class="text-center"> Pagina Proyecto de {{ alumno_a }}</h1>
    </div>
    <div class="cont text-center">
    <div class="container my-5">
        <button type="button" class="btn btn-primary btn-lg mx-2 square-btn">Gestion clientes</button>
        <button type="button" class="btn btn-primary btn-lg mx-2 square-btn">Gestion articulos</button>
    </div>
    <div class="container my-5">
        <button type="button" class="btn btn-primary btn-lg mx-2 square-btn">Large button</button>
        <button type="button" class="btn btn-primary btn-lg mx-2 square-btn">Large button</button>
    </div>
</div>


</template>
<script>

import NavBar from '@/components/NavBar.vue'

export default{
    name: 'PaginaInicio',
    components: {
        NavBar
    },
    data(){
        return{
            alumno_a: 'David'
        }
    },
    mounted(){
        console.log('Componente PaginaInicio.vue cargado')
    }
}
</script>

<style>
.square-btn {
    width: 150px; /* Ajusta el ancho según tus necesidades */
    height: 150px; /* Ajusta la altura según tus necesidades */
    border-radius: 0 !important; /* Hace que los botones sean cuadrados */
}

.cont{
    margin-top: 10%;
}
</style>