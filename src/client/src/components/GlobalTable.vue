<template>
  <b-table
      dark
      striped
      hover
      :items="this.data"/>
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