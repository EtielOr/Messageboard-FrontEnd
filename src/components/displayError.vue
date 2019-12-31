<template>
    <ul class="error">
        <li v-bind:key="index" v-for="(err,index) in errors">
            {{ err.defaultMessage}}
        </li>
    </ul>
</template>



<script>
export default {
    name : "displayError" ,
    props  : ["errors"]
}
</script>


<style scoped>
.error {
    margin-left: 15%;
    margin-right: 15%;
    color: red;
}
</style>