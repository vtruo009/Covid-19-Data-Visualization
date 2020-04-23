<template>
  <div class="GenderPage fadeIn">
    <Body InputName="Gender" v-bind:dynamicOptions="genderOptions" apiEndPoint="/GenderData" />
  </div>
</template>

<script>
import Body from "../components/Gender_Age/Body";
export default {
  name: "GenderPage",
  components: {
    Body
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
