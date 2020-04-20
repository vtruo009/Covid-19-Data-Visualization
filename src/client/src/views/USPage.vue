<template>
  <div class="USPage fadeIn">
    <USBody firstInputName="County" secondInputName="State" apiEndPoint="/USData" />
  </div>
</template>

<script>
import USBody from "../components/US_World_Body";

export default {
  name: "USPage",
  data() {
    return {};
  },
  methods: {},
  components: {
    USBody
  }
};
</script>

<style></style>
