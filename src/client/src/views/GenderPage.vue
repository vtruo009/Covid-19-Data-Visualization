<template>
  <div class="GenderPage fadeIn">
    <GenderBody InputName="Gender" v-bind:dynamicOptions="genderOptions" apiEndPoint="/GenderData" />
  </div>
</template>

<script>
import GenderBody from "../components/Gender_Age_Body";
export default {
  name: "GenderPage",
  components: {
    GenderBody
  },
  data() {
    return {
      genderOptions: [
        { value: null, text: "Please select a gender", disabled: true },
        { value: "1", text: "Male" },
        { value: "2", text: "Female" }
      ]
    };
  }
};
</script>

<style></style>
