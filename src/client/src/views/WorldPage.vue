<template>
  <div class="WorldPge">
    <InputForm
    class="m-5 text-center"
      firstInputName= "State"
      secondInputName= "Country"
      apiEndPoint= "/WorldData"
    />
  </div>
</template>

<script>
import InputForm from '../components/US_World_Input_Form'

export default {
  name:'WorldPage',
  data() {
    return {

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