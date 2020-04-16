<template>
    <div>
        <b-table
            dark
            striped
            hover
            :items="this.data">
        </b-table>
    </div>
   
</template>

<script>
export default {
    name:'GlobalTable',
    props: {
        data : Array
    }
}
</script>

<style>
   
</style>