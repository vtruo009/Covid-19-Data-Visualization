<template>
  <div class="GenderPage">
    <InputForm
      InputName="Gender"
      v-bind:dynamicOptions="genderOptions"
      apiEndPoint="/GenderData"
    />
    <Table v-bind:data="tableData"/>
  </div>
</template>

<script>
import InputForm from '../components/Gender_Age_Input_Form';
import Table from '../components/GlobalTable';
export default {
  name: 'GenderPage',
  components: {
    InputForm,
    Table
  },
  data (){
    return {
      tableData: null,
      genderOptions: [
        { value: null, text: 'Please select a gender', disabled: true},
        { value: '1', text: 'Male' },
        { value: '2', text: 'Female' },
      ]
    }
  }
}
</script>

<style>

</style>