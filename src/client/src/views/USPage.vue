<template>
  <div class="USPage fadeIn">
    <Body firstInputName="County" secondInputName="State" apiEndPoint="/USData" />
  </div>
  
</template>

<script>
import Body from "../components/US_World/Body";

export default {
  name: "USPage",
  data() {
    return {};
  },
  methods: {},
  components: {
    Body
  }
};
</script>

<style></style>
