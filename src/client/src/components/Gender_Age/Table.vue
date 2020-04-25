<template>
  <div id="Table">
    <b-table dark striped hover :items="this.data"></b-table>
  </div>
</template>

<script>
export default {
  name: "Table",
  props: {
    data: Array
  }
};
</script>

<style></style>