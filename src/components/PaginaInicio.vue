<template>
    <div>
        <NavBar/>
    </div>
    <div>
        <h1 class="text-center"> Pagina Proyecto de {{ alumno_a }}</h1>
    </div>
    <div class="cont text-center">
        <div class="container my-5">
            <button type="button" class="btn btn-primary btn-lg mx-2 boton"> <a href="/clientes" class="link-light link-offset-2 link-underline link-underline-opacity-0">Gestion clientes</a> </button>
            <button type="button" class="btn btn-primary btn-lg mx-2 boton"><a href="#" class="link-light link-offset-2 link-underline link-underline-opacity-0">Gestion articulos</a> </button>
        </div>
        <div class="container my-5">
            <button type="button" class="btn btn-primary btn-lg mx-2 boton"><a href="#" class="link-light link-offset-2 link-underline link-underline-opacity-0">Gestion ventas</a> </button>
            <button type="button" class="btn btn-primary btn-lg mx-2 boton"><a href="#" class="link-light link-offset-2 link-underline link-underline-opacity-0">Contacto</a> </button>
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
.boton {
    width: 250px; /* Ajusta el ancho según tus necesidades */
    height: 200px; /* Ajusta la altura según tus necesidades */
    margin-right: 30px; /* Ajusta el margen derecho según tus necesidades */
    margin-left: 30px; 
    margin: -15px;/* Ajusta el margen izquierdo según tus necesidades */
}

.cont {
    margin-top: 10%;
}
</style>