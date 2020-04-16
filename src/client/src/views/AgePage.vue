<template>
  <div class="AgePage">
    <b-overlay v-bind:show="show" rounded="sm">
      <InputForm
        InputName="AgeRange"
        v-bind:dynamicOptions="ageOptions"
        apiEndPoint="/AgeData"
      />
      <Table v-bind:data="tableData"/>
    </b-overlay>
  </div>
</template>

<script>
import InputForm from '../components/Gender_Age_Input_Form';
import Table from '../components/GlobalTable';
export default {
  name: 'AgePage',
  components: {
    InputForm,
    Table
  },
  data (){
    return {
      tableData: null,
      ageOptions: [
        { value: null, text: 'Please select an age range', disabled: true},
        { value: '1', text: '80+' },
        { value: '2', text: '60 - 80' },
        { value: '3', text: '40 - 60' },
        { value: '4', text: '20 - 40' },
        { value: '5', text: '0 - 20' },
      ],
      show: false
    }
  }
}
</script>

<style>

</style>