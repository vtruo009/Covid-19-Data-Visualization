<template>
  <div class="WorldPge">
    <InputForm
    class="m-5 text-center"
      firstInputName= "State"
      secondInputName= "Country"
      apiEndPoint= "/WorldData"
    />
    <b-table
      dark
      striped
      hover
      :items="tableData"/>
  </div>
</template>

<script>
import InputForm from '../components/US_World_Input_Form'

export default {
  name:'WorldPage',
  data() {
    return {
      tableData: [
          { date: '01/02/2020', number: 40},
          { date: '01/03/2020', number: 50},
          { date: '01/04/2020', number: 60},              
      ],

    }
  },
  methods:{

  },
  components: {
    InputForm
  }
}

</script>

<style>

</style>