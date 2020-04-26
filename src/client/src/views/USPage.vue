<template>
  <div class="USPage fadeIn">
    <Body firstInputName="County" secondInputName="State" apiEndPoint="/USData" />
  </div>
  
</template>

<script>
import Body from "../components/US_World/Body";

export default {
  name: "USPage",
  //methods: {},
  components: {
    Body
  },
  data() {
    return {
      USOptions: [
        { value: "1", text: "Confirmeeeeed"},
        { value: "2", text: "Deeeeaaddd"}
      ]
    };
  },
};
</script>

<style></style>
