<template>
    <h1>{{ data.msg }}</h1>
</template>

<script>
import axios from 'axios';
export default {
    methods: {
        mounted () {
            axios.get("http://localhost:9876/config".then((result) => {
                result.data;
            }))
        }
    }
}
</script>

<style>

</style>