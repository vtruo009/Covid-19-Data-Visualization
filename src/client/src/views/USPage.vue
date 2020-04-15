<template>
  <div class="USPage">
    <InputForm
      class="m-5 text-center"
      firstInputName= "County"
      secondInputName= "State"
      apiEndPoint= "/USData"
    />
    <Table v-bind:data="tableData"/>
  </div>
</template>

<script>
import InputForm from '../components/US_World_Input_Form'
import Table from '../components/GlobalTable'

export default {
  name:'USPage',
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