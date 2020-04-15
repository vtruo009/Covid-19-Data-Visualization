<template>
  <div class="USPage">
    <InputForm
    class="m-5 text-center"
      firstInputName= "County"
      secondInputName= "State"
      apiEndPoint= "/USData"
    />
    <Table></Table>
  </div>
</template>

<script>
import InputForm from '../components/US_World_Input_Form'
import Table from '../components/US_World_Table'

export default {
  name:'USPage',
  data() {
    return {

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