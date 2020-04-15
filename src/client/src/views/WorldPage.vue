<template>
  <div class="WorldPge">
    <InputForm
      class="m-5 text-center"
      firstInputName= "State"
      secondInputName= "Country"
      apiEndPoint= "/WorldData"
    />
    <Table v-bind:data="tableData"/>
  </div>
</template>

<script>
import InputForm from '../components/US_World_Input_Form'
import Table from  '../components/GlobalTable'

export default {
  name:'WorldPage',
  data() {
    return {
      tableData: null
    }
  },
  methods:{

  },
  components: {
    InputForm,
    Table
  }
}

</script>

<style>

</style>