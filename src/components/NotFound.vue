<template>
    <div class="row">
        <div class="col-md-22">
            Perdon
            <img src="https://http.dog/404.jpg" alt="">
            <hr>
            <router-link class="btn btn-light-green" :to="{name: 'home'}">Volver al inicio</router-link>
        </div>
    </div>
</template>
<script>
export default{
    name: 'NotFound'
};
</script>